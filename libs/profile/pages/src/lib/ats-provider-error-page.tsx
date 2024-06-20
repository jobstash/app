import { useRouter } from 'next/router';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { ERR_INTERNAL } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { Button, FoxSVG, Heading, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

const ATS_SETTINGS_PATH = '/profile/org/ats-settings';
const DEFAULT_MESSAGE =
  'We failed to integrate with your ATS provider. Please try again.';

export const ATSProviderErrorPage = () => {
  const router = useRouter();
  const { isLoading, role } = useAuthContext();
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (!canRender || isLoading) return <LoadingPage />;
  if (role !== CHECK_WALLET_ROLES.ORG) return <NotFoundPage />;

  const { title = ERR_INTERNAL, message = DEFAULT_MESSAGE } = router.query;

  const onClick = () => {
    router.push(ATS_SETTINGS_PATH);
  };

  return (
    <div className="w-full lg:pl-52">
      <SideBar />

      <div className="flex h-screen items-center justify-center lg:pl-4">
        <div className="flex flex-col items-center gap-6 max-w-xl text-center">
          <FoxSVG isMobile={false} />

          <div className="flex flex-col gap-2">
            <Heading size="xl" fw="semibold">
              {title}
            </Heading>
            {message && <Text color="dimmed">{message}</Text>}
          </div>

          <Button
            variant="primary"
            textProps={{ fw: 'semibold' }}
            size="md"
            onClick={onClick}
          >
            Back to Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
