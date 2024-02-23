import { useRouter } from 'next/router';

import { LoadingPage } from '@jobstash/shared/pages';

import { useSendMagicLinkToken } from '@jobstash/auth/state';

import { InternalErrorResult, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

const MagicLoginCallbackPage = () => {
  const router = useRouter();

  const tokenParam = new URLSearchParams(window.location.search).get('token');

  const userType = router.query.userType?.toString() as
    | 'dev'
    | 'org'
    | undefined;
  const isUserType = USER_TYPES.has(userType ?? '');

  const { isLoading, isError } = useSendMagicLinkToken(tokenParam, userType);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-full lg:pl-52">
      <SideBar />

      {isUserType ? (
        <div className="flex h-screen items-center justify-center pl-4">
          <div className="flex flex-col items-center space-y-2">
            <Text size="lg" fw="bold">
              {isError
                ? 'Something went wrong :('
                : 'You have connected your email!'}
            </Text>
            <Text color="dimmed">
              {isError || userType === 'org'
                ? 'Please reload this page.'
                : 'Please close this tab now.'}
            </Text>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <InternalErrorResult />
        </div>
      )}
    </div>
  );
};

export default MagicLoginCallbackPage;

const USER_TYPES = new Set(['dev', 'org']);
