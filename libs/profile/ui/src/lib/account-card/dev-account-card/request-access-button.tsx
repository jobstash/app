import { Button } from '@heroui/button';

import { UserSignupPayload } from '@jobstash/profile/core';

import { useProfileVerifiedOrgs, useUserSignup } from '@jobstash/profile/state';

interface Props {
  orgId: string;
}

export const RequestAccessButton = ({ orgId }: Props) => {
  const { data } = useProfileVerifiedOrgs();
  const { mutate, isPending } = useUserSignup();

  const org = data?.find((org) => org.id === orgId);
  const { hasOwner = false, isOwner = false, credential } = org ?? {};
  const isEmailCredential = credential === 'email';

  if (isOwner || (!isEmailCredential && !hasOwner)) return null;

  const handleRequestAccess = () => {
    // TODO: Implement pricing plan selection + payload
    const bundle: Omit<UserSignupPayload, 'orgId'> = {
      jobstash: 'starter' as const,
    };
    mutate({ orgId, ...bundle });
  };

  return (
    <div className="inline-block">
      <Button
        size="sm"
        variant="flat"
        className="text-white font-bold"
        isLoading={isPending}
        onPress={handleRequestAccess}
      >
        {isPending ? 'Requesting...' : 'Request Access'}
      </Button>
    </div>
  );
};
