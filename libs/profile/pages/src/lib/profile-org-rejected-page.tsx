import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { TELEGRAM_URL } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { Button, Heading, PageWrapper, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfileOrgRejectedPage = () => {
  const router = useRouter();
  const { isLoading, role, flow } = useAuthContext();
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (!canRender || isLoading) return <LoadingPage />;

  const isOrg = role === CHECK_WALLET_ROLES.ORG;
  const isRejected = flow === CHECK_WALLET_FLOWS.ORG_REJECTED;
  if (!isOrg || !isRejected) {
    router.push('/');
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onClick = () => {
    if (typeof window !== 'undefined') {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  return (
    <>
      <Head>
        <title>Rejected Approval</title>
      </Head>
      <PageWrapper>
        <SideBar />

        <div className="flex items-center justify-center min-h-screen p-2">
          <div className="flex flex-col gap-8">
            <Image
              priority
              src="/empty-result.png"
              quality={100}
              alt="Empty result"
              width={418}
              height={297}
            />
            <div className="flex flex-col items-center gap-y-2 text-center">
              <Heading size="xl" fw="bold">
                {TITLE}
              </Heading>
              <div className="max-w-sm text-center flex flex-col gap-2">
                <Text color="dimmed">{SUBTITLE}</Text>
              </div>
            </div>

            <div className="flex justify-center w-full">
              <Button variant="primary" onClick={onClick}>
                <Heading size="xs" fw="bold">
                  {BUTTON_TEXT}
                </Heading>
              </Button>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

const TITLE = "Sorry, We're Not There Yet";
const SUBTITLE = 'Rebuild your case with our team. Reach out today.';
const BUTTON_TEXT = 'Start a Conversation';
