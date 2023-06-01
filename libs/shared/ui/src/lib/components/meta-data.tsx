import Head from 'next/head';
import { memo } from 'react';

interface Props {
  title: string;
  description: string;
  url: string;
  image: string;
  og?: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
  };
  twitter: {
    site: string;
    title?: string;
    card?: 'summary' | 'summary_large_image';
    url?: string;
    description?: string;
    image?: string;
  };
  ldJson: {
    __html: string;
  };
}

const MetaData = ({
  title,
  description,
  url,
  image,
  og,
  twitter,
  ldJson,
}: Props) => (
  <Head>
    {/* Primary Meta Tags */}
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={og?.url ?? url} />
    <meta property="og:title" content={og?.title ?? title} />
    <meta property="og:description" content={og?.description ?? description} />
    <meta property="og:image" content={og?.image ?? image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {/* Twitter */}
    <meta name="twitter:card" content={twitter.card ?? 'summary_large_image'} />
    <meta name="twitter:url" content={twitter.url ?? url} />
    <meta name="twitter:title" content={twitter.title ?? title} />
    <meta
      name="twitter:description"
      content={twitter.description ?? description}
    />
    <meta property="twitter:image" content={twitter.image ?? image} />
    <meta name="twitter:site" content={twitter.site} />

    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={ldJson}
      key="jobpost-jsonld"
      type="application/ld+json"
    />
  </Head>
);

export default memo(MetaData);
