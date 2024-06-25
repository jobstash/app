/* eslint-disable @next/next/no-script-component-in-head */
import Head from 'next/head';
import Script from 'next/script';

const NAME = 'JobStash';
const DESCRIPTION = 'The Ultimate Job Aggregator for Crypto Developers';
const WEBSITE_URL = 'https://www.jobstash.xyz';
const IMAGE_URL =
  'https://whi3td4y5t552pnenllviunljg23ggqza2dr7bwhciwlne7rphta.arweave.net/sdG5j5js-909pGrXVFGrSbWzGhkGhx-GxxIstpPxeeY';

const LandingMetadata = () => (
  <Head>
    <title>{NAME}</title>
    <meta name="description" content={DESCRIPTION} />

    <meta property="og:title" content={NAME} />
    <meta property="og:description" content={DESCRIPTION} />
    <meta property="og:image" content={IMAGE_URL} />
    <meta property="og:url" content={WEBSITE_URL} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={NAME} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={NAME} />
    <meta name="twitter:description" content={DESCRIPTION} />
    <meta name="twitter:image" content={IMAGE_URL} />
    <meta name="twitter:site" content="@jobstash_xyz" />

    <link rel="canonical" href={WEBSITE_URL} />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />

    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: WEBSITE_URL,
          name: NAME,
          description: DESCRIPTION,
          publisher: {
            '@type': 'Organization',
            name: NAME,
            logo: {
              '@type': 'ImageObject',
              url: 'https://jobstash.xyz/logo.png',
            },
          },
          sameAs: [
            'https://twitter.com/jobstash_xyz',
            'https://telegram.me/jobstash',
          ],
        }),
      }}
    />
  </Head>
);

export default LandingMetadata;
