'use client'

import { Box, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import * as React from 'react';

interface RegionStatus {
    region: string;
    usage: number; // 0–1
}

function getUsageColor(usage: number): string {
    if (usage <= 0.5) return '#4caf50';
    if (usage <= 0.75) return '#ff9800';
    return '#f44336';
}

const UsageBar = styled(LinearProgress)<{ usage: number }>(({ usage }) => ({
    height: 16,
    borderRadius: 8,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 8,
        backgroundColor: getUsageColor(usage),
    },
}));

export default function StatusPage() {
    const [regions, setRegions] = React.useState<RegionStatus[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchStatus() {
            try {
                const res = await fetch('/api/status');
                if (!res.ok) throw new Error('Failed to fetch status');
                const data: { regions: RegionStatus[] } = await res.json();
                setRegions(data.regions);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
        fetchStatus();
    }, []);

    return (
        <Box sx={{ maxWidth: 720, mx: 'auto', py: 4 }}>
            <Typography variant="h4" gutterBottom>Clusters usage</Typography>

            {loading && <Typography color="text.secondary">Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            {!loading && !error && (
                <Stack spacing={2}>
                    {regions.map((r) => (
                        <Paper key={r.region} sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle1" fontWeight={600}>{r.region}</Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    sx={{ color: getUsageColor(r.usage) }}
                                >
                                    {Math.round(r.usage * 100)}%
                                </Typography>
                            </Box>
                            <UsageBar variant="determinate" value={r.usage * 100} usage={r.usage} />
                        </Paper>
                    ))}
                </Stack>
            )}
        </Box>
    );
}
