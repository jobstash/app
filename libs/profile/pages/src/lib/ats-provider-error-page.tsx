import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';
import { ERR_INTERNAL } from '@jobstash/shared/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';

import { Button, FoxSVG, Heading, Text } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const ATS_SETTINGS_PATH = '/profile/org/ats-settings';
const DEFAULT_MESSAGE =
  'We failed to integrate with your ATS provider. Please try again.';

export const ATSProviderErrorPage = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthContext();
  const hasPermission = useHasPermission(PERMISSIONS.ORG_MANAGER);

  if (!isAuthenticated || isLoading) return <LoadingPage />;
  if (!hasPermission) return <NotFoundPage />;

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
