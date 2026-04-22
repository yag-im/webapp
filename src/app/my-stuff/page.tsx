import { Card, CardContent, CardTitle } from '@/common/card';
import { MyStuff } from '@/my-stuff/my-stuff';
import { getMetadata } from '@/seo/seo-utils';
import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = getMetadata({
    title: 'My Stuff',
    description: 'Your favorite and recently played games',
    pathname: '/my-stuff',
});

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
};

export default function MyStuffPage() {
    return (
        <Card withTitle>
            <CardTitle as="h1">My Stuff</CardTitle>
            <CardContent>
                <Suspense>
                    <MyStuff />
                </Suspense>
            </CardContent>
        </Card>
    );
}
