import Head from 'next/head';
import Image from 'next/image';

import { lato } from '@jobstash/shared/core';

import { ExploreJobsButton, SubscribeTelegram } from '@jobstash/home/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const EthlondonHomePage = () => {
  console.log('TODO');

  return (
    <>
      <Head>
        <title>Ethlondon | JobStash</title>
      </Head>

      <PageWrapper>
        <SideBar />

        <div className="lg:h-[calc(100vh-80px)] w-full flex items-center justify-center">
          <div className="flex flex-col gap-16 items-center">
            <div className="flex items-center gap-20">
              <Image
                width={360}
                height={132}
                alt="Ethlondon"
                src="/ethlondon-community.png"
              />
              <span className="text-4xl font-bold">X</span>
              <Image
                width={384}
                height={106}
                alt="JobStash"
                src="/jobstash-community.png"
              />
            </div>
            <div
              className={`${lato.className} font-semibold text-3xl text-white text-center`}
            >
              <p>
                <span className="text-white/50 mr-2">tl;dr:</span>
                All available Jobs at ETHGlobal
              </p>
              <p>LONDON</p>
            </div>
            <div className="flex items-center gap-8">
              <ExploreJobsButton />
              <SubscribeTelegram />
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
