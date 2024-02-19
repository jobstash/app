import { useConnectDevEmail } from '@jobstash/auth/state';

import ConnectEmailSection from './connect-email-section';

const ConnectDevEmail = () => {
  const { isSuccess, isLoading, isError, onSubmit } = useConnectDevEmail();

  return (
    <ConnectEmailSection
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
      onSubmit={onSubmit}
    />
  );
};

export default ConnectDevEmail;
