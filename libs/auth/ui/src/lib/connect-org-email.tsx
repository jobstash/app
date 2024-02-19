import ConnectEmailSection from './connect-email-section';

const ConnectOrgEmail = () => {
  const isSuccess = false;
  const isLoading = false;
  const isError = false;

  return (
    <ConnectEmailSection
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
      onSubmit={() => null}
    />
  );
};

export default ConnectOrgEmail;
