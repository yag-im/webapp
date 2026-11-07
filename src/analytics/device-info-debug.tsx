'use client';

import { collectGpuDiagnostics } from '@/analytics/device-info';
import { DEVICE_INFO_SESSION_KEY } from '@/analytics/device-info-tracker';
import { analytics, gaReady } from '@/analytics/track';
import { Alert, Box, Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

type Diagnostics = Awaited<ReturnType<typeof collectGpuDiagnostics>>;

type GaHit = {
    time: string;
    transport: 'fetch' | 'sendBeacon';
    eventName: string;
    params: [string, string][];
};

const GA_COLLECT_RE = /\/g\/collect\b/;
// GA4 Measurement Protocol prefixes: ep/epn = event params, up/upn = user properties.
const PARAM_PREFIX_RE = /^(ep|epn|up|upn)\./;

const capturedHits: GaHit[] = [];

function parseGaRequest(url: string, body: unknown, transport: GaHit['transport']): GaHit[] {
    const shared = new URL(url, location.href).searchParams;
    const lines = typeof body === 'string' && body.trim() ? body.trim().split('\n') : [''];
    const time = new Date().toLocaleTimeString();
    return lines.map((line) => {
        const merged = new URLSearchParams(shared);
        new URLSearchParams(line).forEach((v, k) => {
            merged.set(k, v);
        });
        const params: [string, string][] = [];
        merged.forEach((v, k) => {
            if (PARAM_PREFIX_RE.test(k) || k === 'tid' || k === '_dbg') params.push([k, v]);
        });
        return { time, transport, eventName: merged.get('en') ?? '(none)', params };
    });
}

// Wraps fetch/sendBeacon on this page only so GA hits (including batched POST bodies) can be inspected.
function useGaHitCapture(onHit: () => void) {
    useEffect(() => {
        const originalFetch = window.fetch;
        const originalBeacon = navigator.sendBeacon.bind(navigator);

        window.fetch = (input, init) => {
            const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
            if (GA_COLLECT_RE.test(url)) {
                capturedHits.push(...parseGaRequest(url, init?.body, 'fetch'));
                onHit();
            }
            return originalFetch(input, init);
        };
        navigator.sendBeacon = (url, data) => {
            const href = String(url);
            if (GA_COLLECT_RE.test(href)) {
                capturedHits.push(...parseGaRequest(href, data, 'sendBeacon'));
                onHit();
            }
            return originalBeacon(url, data);
        };

        return () => {
            window.fetch = originalFetch;
            navigator.sendBeacon = originalBeacon;
        };
    }, [onHit]);
}

function readDataLayer(): unknown[][] {
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    // gtag pushes `arguments` objects; gtag.js itself also pushes plain objects, which are skipped.
    return dl
        .filter((entry): entry is ArrayLike<unknown> => typeof (entry as { length?: unknown } | null)?.length === 'number')
        .map((entry) => Array.from(entry, (v) => v))
        .filter((a) => a[1] === 'device_info' || a[1] === 'user_properties');
}

function resetAndReload() {
    try {
        sessionStorage.removeItem(DEVICE_INFO_SESSION_KEY);
    } catch {
        // ignore
    }
    location.reload();
}

function KeyValueTable({ rows }: { rows: [string, unknown][] }) {
    return (
        <Table size="small">
            <TableBody>
                {rows.map(([k, v]) => (
                    <TableRow key={k}>
                        <TableCell sx={{ fontFamily: 'monospace', width: '35%' }}>{k}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', wordBreak: 'break-word' }}>
                            {v === undefined ? <em>not sent (empty)</em> : String(v)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
    return (
        <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            {children}
        </Paper>
    );
}

export function DeviceInfoDebug() {
    const [diag, setDiag] = useState<Diagnostics>();
    const [dataLayer, setDataLayer] = useState<unknown[][]>([]);
    const [hits, setHits] = useState<GaHit[]>([]);
    const [ga, setGa] = useState(false);
    const [gtagLoaded, setGtagLoaded] = useState(false);
    const [userAgent, setUserAgent] = useState('');
    const [sentThisSession, setSentThisSession] = useState(false);

    const refresh = useCallback(() => {
        setGa(gaReady());
        setGtagLoaded('google_tag_manager' in window);
        setDataLayer(readDataLayer());
        setHits([...capturedHits]);
        try {
            setSentThisSession(Boolean(sessionStorage.getItem(DEVICE_INFO_SESSION_KEY)));
        } catch {
            setSentThisSession(false);
        }
    }, []);

    useGaHitCapture(refresh);

    useEffect(() => {
        setUserAgent(navigator.userAgent);
        void collectGpuDiagnostics().then(setDiag);
        refresh();
        const id = setInterval(refresh, 1000);
        return () => {
            clearInterval(id);
        };
    }, [refresh]);

    const sendNow = () => {
        if (diag?.info) analytics.deviceInfo({ ...diag.info, debug_mode: true });
        refresh();
    };

    const gpuHits = hits.filter((h) => h.eventName === 'device_info' || h.params.some(([k]) => k.startsWith('up.')));

    return (
        <Stack spacing={2}>
            <Typography variant="h4">Device info → Google Analytics (debug)</Typography>

            <Section title="Status">
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip color={ga ? 'success' : 'error'} label={ga ? 'GA configured (dataLayer present)' : 'GA not configured'} />
                    <Chip
                        color={gtagLoaded ? 'success' : 'warning'}
                        label={gtagLoaded ? 'gtag.js loaded' : 'gtag.js not loaded (blocked?)'}
                    />
                    <Chip
                        color={sentThisSession ? 'success' : 'default'}
                        label={sentThisSession ? 'Auto-sent this session' : 'Not auto-sent yet this session'}
                    />
                    <Chip label={diag?.raw.webgpuAvailable ? 'WebGPU available' : 'WebGPU unavailable'} />
                </Stack>
                <Typography variant="body2" sx={{ mt: 1, wordBreak: 'break-word' }}>
                    User agent: <code>{userAgent}</code>
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={sendNow} disabled={!diag?.info || !ga}>
                        Send device_info now (debug_mode)
                    </Button>
                    <Button variant="outlined" onClick={resetAndReload}>
                        Reset session flag &amp; reload
                    </Button>
                </Stack>
                {ga && !gtagLoaded && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        gtag.js from googletagmanager.com hasn&apos;t loaded, so events stay queued in dataLayer and
                        nothing reaches Google Analytics. Likely causes: GA_ID is not an active GA4 measurement ID
                        (Google answers 404), an ad blocker, or no network.
                    </Alert>
                )}
                {!ga && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        GA_ID is not configured or gtag hasn&apos;t initialized; nothing will be sent.
                    </Alert>
                )}
            </Section>

            <Section title="Payload sent to GA (device_info event)">
                {diag ? (
                    diag.info ? (
                        <KeyValueTable rows={Object.entries(diag.info)} />
                    ) : (
                        <Alert severity="info">No GPU could be detected; the event is not sent.</Alert>
                    )
                ) : (
                    <Typography>Detecting…</Typography>
                )}
                <Typography variant="body2" sx={{ mt: 1 }}>
                    User properties: <code>gpu_vendor</code>, <code>gpu_type</code>
                </Typography>
            </Section>

            <Section title="Raw browser readings">
                {diag && (
                    <KeyValueTable
                        rows={[
                            ['WebGL vendor', diag.raw.webgl?.vendor],
                            ['WebGL renderer', diag.raw.webgl?.renderer],
                            ['WebGPU low-power adapter', diag.raw.webgpuLowPower && JSON.stringify(diag.raw.webgpuLowPower)],
                            [
                                'WebGPU high-performance adapter',
                                diag.raw.webgpuHighPerformance && JSON.stringify(diag.raw.webgpuHighPerformance),
                            ],
                        ]}
                    />
                )}
            </Section>

            <Section title="dataLayer pushes (what the app handed to gtag)">
                {dataLayer.length > 0 ? (
                    <Box component="pre" sx={{ m: 0, fontSize: 12, overflowX: 'auto' }}>
                        {dataLayer.map((a) => JSON.stringify(a)).join('\n')}
                    </Box>
                ) : (
                    <Typography>None yet.</Typography>
                )}
            </Section>

            <Section title="Network hits to google-analytics.com (what gtag actually sent)">
                {gpuHits.length > 0 ? (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>Event</TableCell>
                                <TableCell>Params</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gpuHits.map((h, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {h.time}
                                        <br />
                                        <small>{h.transport}</small>
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'monospace' }}>{h.eventName}</TableCell>
                                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-word' }}>
                                        {h.params.map(([k, v]) => (
                                            <div key={k}>
                                                {k}={v}
                                            </div>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Alert severity="info">
                        No device_info hit captured yet. gtag batches events and may send them a few seconds later. If
                        nothing appears, an ad blocker may be blocking google-analytics.com, or the event was already
                        sent this session (use &quot;Reset session flag &amp; reload&quot;).
                    </Alert>
                )}
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Total GA hits captured on this page: {hits.length}. Hits sent with debug_mode appear in GA4 Admin →
                    DebugView.
                </Typography>
            </Section>
        </Stack>
    );
}
