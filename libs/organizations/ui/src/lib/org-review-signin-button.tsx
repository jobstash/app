import { useRouter } from 'next/router';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';

import { Button } from '@jobstash/shared/ui';

const OrgReviewSigninButton = () => {
  const { push } = useRouter();
  const { isAuthd, roleClick } = useRoleClick(CHECK_WALLET_ROLES.DEV, () => {
    push('/profile/reviews');
  });

  return (
    <Button variant="primary" onClick={roleClick}>
      {isAuthd ? 'Review Organization' : 'Sign in if Eligible'}
    </Button>
  );
};

export default OrgReviewSigninButton;
