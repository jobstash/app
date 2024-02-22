import Head from 'next/head';
import Image from 'next/image';

import { Heading, PageWrapper, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfileOrgPendingPage = () => (
  <>
    <Head>
      <title>Pending Approval</title>
    </Head>
    <PageWrapper>
      <SideBar />

      <div className="flex items-center justify-center min-h-screen p-2">
        <div className="flex flex-col gap-4">
          <Image
            priority
            src="/rocket.png"
            quality={100}
            alt="Pending Approval"
            width={371}
            height={371}
          />
          <div className="flex flex-col items-center gap-y-2 text-center">
            <Heading size="xl" fw="bold">
              {TITLE}
            </Heading>
            <div className="max-w-sm text-center flex flex-col gap-2">
              <Text color="dimmed">{SUBTITLE}</Text>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  </>
);

const TITLE = 'Pending Approval';
const SUBTITLE = "Soon, you'll be handpicking from the finest in web3 space!";
