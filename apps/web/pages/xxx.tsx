import { usePrivy } from '@privy-io/react-auth';

import { PrivyButton } from '@jobstash/auth/feature';

const TestPage = () => {
  const { user } = usePrivy();

  return (
    <div className="flex flex-col gap-8 p-12">
      <PrivyButton />
      {user && <pre>{JSON.stringify({ user }, undefined, '\t')}</pre>}
    </div>
  );
};

export default TestPage;
