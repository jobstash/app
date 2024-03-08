/* eslint-disable jsx-a11y/accessible-emoji */
import Head from 'next/head';

import { FoxSVG, Heading } from '@jobstash/shared/ui';

const ConnectEmailDone = () => (
  <>
    <Head>
      <title>Please close this tab</title>
    </Head>
    <div className="flex h-screen items-center justify-center pt-16">
      <div className="flex flex-col items-center gap-6 max-w-xl text-center">
        <FoxSVG isMobile={false} />
        <Heading>Welcome to JobStash! ❤️</Heading>
        <p>{MESSAGE}</p>
      </div>
    </div>
  </>
);

export default ConnectEmailDone;

const MESSAGE =
  "Your email signup is complete, and you're all set. To keep things tidy, please close this window and focus on the new page we've opened for you.";
