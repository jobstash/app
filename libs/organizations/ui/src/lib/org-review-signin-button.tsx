import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';
import { useUserReview } from '@jobstash/profile/state';

import { Button, Spinner } from '@jobstash/shared/ui';

interface Props {
  orgId: string;
}

const OrgReviewSigninButton = ({ orgId }: Props) => {
  const { push } = useRouter();
  const callback = () => {
    push('/profile/reviews');
  };

  const { hasPermission: isAuthd, roleClick } = useRoleClick({
    allowed: PERMISSIONS.USER,
    callback,
  });

  const { hasReviewed, isLoading } = useUserReview(orgId);

  if (!isAuthd)
    return (
      <Wrapper>
        <Button variant="primary" onClick={roleClick}>
          Leave a Review
        </Button>
      </Wrapper>
    );

  if (isLoading)
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );

  const buttonText = hasReviewed ? 'Edit Review' : 'Review Organization';

  return (
    <Wrapper>
      <Button variant="primary" onClick={roleClick}>
        {buttonText}
      </Button>
    </Wrapper>
  );
};

export default OrgReviewSigninButton;

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ minHeight: 40 }} className="flex items-center">
    {children}
  </div>
);
