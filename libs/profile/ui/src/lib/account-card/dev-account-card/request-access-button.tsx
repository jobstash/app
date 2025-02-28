import { Button } from '@heroui/button';

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
    mutate({ orgId });
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
