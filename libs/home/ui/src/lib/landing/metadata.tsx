import Head from 'next/head';

const TEXT_SEO_TITLE = 'JobStash';
const TEXT_SEO_DESC = 'The Ultimate Job Aggregator for Crypto Developers';
const TEXT_SEO_WEBSITE_URL = 'https://www.jobstash.xyz';

const LandingMetadata = () => (
  <Head>
    <title>{TEXT_SEO_TITLE}</title>
    <meta name="description" content={TEXT_SEO_DESC} />
    <meta property="og:title" content={TEXT_SEO_TITLE} />
    <meta property="og:description" content={TEXT_SEO_DESC} />
    <meta property="og:url" content={TEXT_SEO_WEBSITE_URL} />
    <link rel="canonical" href={TEXT_SEO_WEBSITE_URL} />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  </Head>
);

export default LandingMetadata;
