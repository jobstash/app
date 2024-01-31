import { LoadingPage } from '@jobstash/shared/pages';

import { useSendMagicLinkToken } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

const MagicLoginCallbackPage = () => {
  const tokenParam = new URLSearchParams(window.location.search).get('token');

  const { isLoading, isError } = useSendMagicLinkToken(tokenParam);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-full lg:pl-52">
      <SideBar />

      <div className="flex h-screen items-center justify-center pl-4">
        <div className="flex flex-col items-center space-y-2">
          <Text size="lg" fw="bold">
            {isError
              ? 'Something went wrong :('
              : 'You have connected your email!'}
          </Text>
          <Text color="dimmed">
            {isError
              ? 'Please reload this page.'
              : 'Please close this tab now.'}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MagicLoginCallbackPage;
