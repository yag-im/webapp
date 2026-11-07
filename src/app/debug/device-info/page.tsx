import { DeviceInfoDebug } from '@/analytics/device-info-debug';
import { APP_ENV } from '@/common/common-utils';
import { Container } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Evaluate APP_ENV per request (it's a runtime env var), so the page never exists outside dev.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Device info debug',
  robots: { index: false, follow: false },
};

export default function DeviceInfoDebugPage() {
  if (APP_ENV !== 'dev') notFound();

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
      <DeviceInfoDebug />
    </Container>
  );
}
