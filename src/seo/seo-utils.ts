import { APP_DESCRIPTION, APP_ENV, APP_TITLE } from '@/common/common-utils';
import type { Metadata } from 'next';

export function getMetadata({
  title,
  description,
  pathname,
  images,
}: {
  title?: string;
  description?: string;
  pathname?: string;
  images?: Array<{ url: string; alt: string }>;
}): Metadata {
  const metaTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  const metaDescription = description || APP_DESCRIPTION;
  const isDev = (APP_ENV === 'dev');

  return {
    title: metaTitle,
    description: metaDescription,
    creator: 'acme.im',
    metadataBase: new URL("https://yag.im"),
    openGraph: {
      description: metaDescription,
      images,
      locale: 'en_US',
      title: metaTitle,
      siteName: APP_TITLE,
      type: 'website',
      url: pathname,
    },
    alternates: {
      canonical: pathname,
    },
    robots: {
      index: !isDev,
      follow: !isDev,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@yag_im1307',
      description: metaDescription,
      images,
      title: metaTitle,
    },
    icons: [
      "images/favicon.ico"
    ]
  };
}
