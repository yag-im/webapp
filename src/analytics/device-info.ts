'use client';

type GpuType = 'integrated' | 'discrete' | 'software' | 'unknown';

type GpuInfo = {
    gpu_vendor: string;
    gpu_renderer: string;
    gpu_type: GpuType;
    webgpu_low_power?: string;
    webgpu_high_performance?: string;
    gpu_hybrid?: boolean;
};

// GA4 caps event parameter values at 100 chars.
const MAX_PARAM_LENGTH = 100;

// Minimal WebGPU typings; the DOM lib bundled with this TS version doesn't ship them.
type GPUAdapterInfoLike = { vendor?: string; architecture?: string; description?: string; device?: string };
type GPUAdapterLike = {
    info?: GPUAdapterInfoLike;
    requestAdapterInfo?: () => Promise<GPUAdapterInfoLike>;
    isFallbackAdapter?: boolean;
};
type GPULike = {
    requestAdapter: (opts?: { powerPreference?: 'low-power' | 'high-performance' }) => Promise<GPUAdapterLike | null>;
};

function readWebGLRenderer(): { vendor: string; renderer: string } | undefined {
    try {
        const canvas = document.createElement('canvas');
        const gl = (canvas.getContext('webgl2') ?? canvas.getContext('webgl')) as WebGLRenderingContext | null;
        if (!gl) return undefined;

        let vendor = String(gl.getParameter(gl.VENDOR) ?? '');
        let renderer = String(gl.getParameter(gl.RENDERER) ?? '');
        // Chromium and WebKit mask RENDERER as "WebKit WebGL"; Firefox already returns the
        // (sanitized) real renderer and warns when the deprecated debug extension is requested.
        if (!renderer || /^(webkit webgl|mozilla)$/i.test(renderer)) {
            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            if (ext) {
                vendor = String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) ?? vendor);
                renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? renderer);
            }
        }
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return { vendor, renderer };
    } catch {
        return undefined;
    }
}

function normalizeRenderer(raw: string): string {
    let s = raw.trim();
    // "ANGLE (Intel, Intel(R) UHD Graphics 620 (0x00005917) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    const angle = /^angle \((.*)\)$/i.exec(s);
    if (angle) {
        const parts = angle[1].split(', ');
        s = parts.length >= 3 ? parts.slice(1, -1).join(', ') : parts.at(-1) ?? s;
    }
    s = s
        .replace(/^angle metal renderer:\s*/i, '')
        .replace(/^mesa\s+/i, '')
        .replace(/\s+direct3d\d*.*$/i, '')
        .replace(/\s+opengl engine$/i, '')
        // NVIDIA's Linux driver appends bus/ISA tags: "GeForce GTX 1060 6GB/PCIe/SSE2"
        .replace(/(\/(pcie|pci|agp|sse2))+$/i, '')
        .replace(/,?\s*or similar$/i, '')
        .replaceAll(/\s*\(0x[\da-f]+\)/gi, '')
        .replaceAll(/\((r|tm|c)\)/gi, '')
        .replaceAll(/\s+/g, ' ')
        .trim();
    return s.slice(0, MAX_PARAM_LENGTH);
}

function detectVendor(vendor: string, renderer: string): string {
    const s = `${vendor} ${renderer}`.toLowerCase();
    if (/swiftshader|llvmpipe|softpipe|lavapipe|microsoft basic render/.test(s)) return 'Software';
    if (/nvidia|geforce|quadro|tesla|rtx|gtx/.test(s)) return 'NVIDIA';
    if (/\bamd\b|radeon|\bati\b|firepro/.test(s)) return 'AMD';
    if (s.includes('intel')) return 'Intel';
    if (s.includes('apple')) return 'Apple';
    if (/qualcomm|adreno/.test(s)) return 'Qualcomm';
    if (/mali|\barm\b/.test(s)) return 'ARM';
    if (/powervr|imagination/.test(s)) return 'Imagination';
    if (s.includes('microsoft')) return 'Microsoft';
    return 'Unknown';
}

function classifyGpu(vendor: string, renderer: string): GpuType {
    const r = renderer.toLowerCase();
    switch (vendor) {
        case 'Software': {
            return 'software';
        }
        case 'Intel': {
            // Arc A/B-series and Iris Xe MAX are discrete; everything else (UHD, HD, Iris, Iris Xe,
            // Meteor Lake "Arc Graphics") is integrated.
            return /arc.*\b[ab]\d{3}|iris.*xe max|\bdg[12]\b/.test(r) ? 'discrete' : 'integrated';
        }
        case 'AMD': {
            // APUs report "Radeon Graphics", "Radeon Vega 8 Graphics", "Radeon 780M", ...
            return /graphics$|\b\d{3}m\b/.test(r) ? 'integrated' : 'discrete';
        }
        case 'NVIDIA': {
            return r.includes('tegra') ? 'integrated' : 'discrete';
        }
        case 'Apple': {
            // Intel Macs with Radeon GPUs are caught by the AMD branch above.
            return 'integrated';
        }
        case 'Qualcomm':
        case 'ARM':
        case 'Imagination': {
            return 'integrated';
        }
        default: {
            return 'unknown';
        }
    }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | undefined> {
    const timeout = new Promise<T | undefined>((resolve) => {
        setTimeout(resolve, ms);
    });
    return Promise.race([promise, timeout]);
}

async function readAdapterInfo(adapter: GPUAdapterLike): Promise<GPUAdapterInfoLike | undefined> {
    if (adapter.info) return adapter.info;
    // Pre-Chrome 127 exposed adapter info only through this (now removed) method.
    if (adapter.requestAdapterInfo) return withTimeout(adapter.requestAdapterInfo(), 3000);
    return undefined;
}

type WebGPUReading = {
    vendor?: string;
    architecture?: string;
    device?: string;
    description?: string;
    isFallbackAdapter?: boolean;
};

async function readWebGPUAdapter(powerPreference: 'low-power' | 'high-performance'): Promise<WebGPUReading | undefined> {
    try {
        const { gpu } = navigator as Navigator & { gpu?: GPULike };
        if (!gpu) return undefined;
        const adapter = await withTimeout(gpu.requestAdapter({ powerPreference }), 3000);
        if (!adapter) return undefined;
        const info = await readAdapterInfo(adapter);
        if (!info) return undefined;
        // GPUAdapterInfo exposes prototype getters, so copy fields into a plain object.
        return {
            vendor: info.vendor,
            architecture: info.architecture,
            device: info.device,
            description: info.description,
            isFallbackAdapter: adapter.isFallbackAdapter,
        };
    } catch {
        return undefined;
    }
}

function webGPULabel(reading: WebGPUReading | undefined): string | undefined {
    if (!reading) return undefined;
    const label = [reading.vendor, reading.architecture, reading.description]
        .filter(Boolean)
        .join(' ')
        .trim();
    if (!label) return undefined;
    return (reading.isFallbackAdapter ? `${label} (fallback)` : label).slice(0, MAX_PARAM_LENGTH);
}

// Raw browser readings alongside the exact payload sent to GA; used by the dev debug page.
export async function collectGpuDiagnostics() {
    const webgl = readWebGLRenderer();
    // Requesting both preferences lets hybrid laptops report the integrated (e.g. Intel UHD)
    // and the discrete GPU, even when the browser renders on only one of them.
    const [lowPowerRaw, highPerformanceRaw] = await Promise.all([
        readWebGPUAdapter('low-power'),
        readWebGPUAdapter('high-performance'),
    ]);
    const raw = {
        webgl,
        webgpuAvailable: 'gpu' in navigator,
        webgpuLowPower: lowPowerRaw,
        webgpuHighPerformance: highPerformanceRaw,
    };

    const lowPower = webGPULabel(lowPowerRaw);
    const highPerformance = webGPULabel(highPerformanceRaw);
    if (!webgl && !lowPower && !highPerformance) return { raw, info: undefined };

    const renderer = webgl ? normalizeRenderer(webgl.renderer) : '';
    const vendor = detectVendor(webgl?.vendor ?? '', renderer || lowPower || '');
    const info: GpuInfo = {
        gpu_vendor: vendor,
        gpu_renderer: renderer || 'unknown',
        gpu_type: classifyGpu(vendor, renderer),
        webgpu_low_power: lowPower,
        webgpu_high_performance: highPerformance,
        gpu_hybrid: lowPower && highPerformance ? lowPower !== highPerformance : undefined,
    };
    return { raw, info };
}

export async function collectGpuInfo(): Promise<GpuInfo | undefined> {
    const { info } = await collectGpuDiagnostics();
    return info;
}
