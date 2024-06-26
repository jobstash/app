import { useRouter } from 'next/router';

import { MW_URL } from '@jobstash/shared/core';

import { Button, Text } from '@jobstash/shared/ui';

const ConnectGithubAccount = () => {
  const { push } = useRouter();

  const onClick = () => push(`${MW_URL}/github/trigger-dev-github-oauth`);

  return (
    <>
      <hr className="border-t border-white/10" />
      <div className="flex flex-col gap-4 py-4">
        <div className="text-center text-sm">
          <Text size="sm" color="dimmed">
            We verify your Github account to ensure you're a developer.
          </Text>
        </div>

        <Button
          isFullWidth
          variant="outline"
          className="justify-center py-3"
          onClick={onClick}
        >
          Connect Github Account
        </Button>
      </div>
    </>
  );
};

export default ConnectGithubAccount;
