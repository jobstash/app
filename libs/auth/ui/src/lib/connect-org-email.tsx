import { useConnectOrgEmail } from '@jobstash/auth/state';

import ConnectEmailSection from './connect-email-section';

const ConnectOrgEmail = () => {
  const { isSuccess, isLoading, isError, onSubmit } = useConnectOrgEmail();

  return (
    <ConnectEmailSection
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
      onSubmit={onSubmit}
    />
  );
};

export default ConnectOrgEmail;
