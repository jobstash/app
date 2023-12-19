import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';

import { Button } from '@jobstash/shared/ui';

const OrgReviewSigninButton = () => {
  const { roleClick } = useRoleClick(CHECK_WALLET_ROLES.DEV, () => {
    // eslint-disable-next-line no-alert
    alert('TODO');
  });

  return (
    <Button variant="primary" onClick={roleClick}>
      Sign in if Eligible
    </Button>
  );
};

export default OrgReviewSigninButton;
