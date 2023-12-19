import { FRONTEND_URL } from '@jobstash/shared/core';
import { createOrgReviewPath } from '@jobstash/organizations/utils';
import { notifSuccess } from '@jobstash/shared/utils';

import { Button } from '@jobstash/shared/ui';

interface Props {
  org: {
    name: string;
    orgId: string;
  };
}

const OrgReviewShareButton = ({ org }: Props) => {
  const onClick = () => {
    if (typeof navigator !== 'undefined') {
      const path = `${FRONTEND_URL}/${createOrgReviewPath(org)}`;
      navigator.clipboard.writeText(path);
      notifSuccess({
        title: 'Copied to Clipboard',
        message: 'You can now share the link and leave a review!',
      });
    }
  };

  return (
    <Button variant="translucent" onClick={onClick}>
      Share with an Employee
    </Button>
  );
};

export default OrgReviewShareButton;
