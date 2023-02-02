import { Org } from '~/core/interfaces';

import { Button } from '../unstyled-ui/base/button';
import { FundingTagIcon } from '../unstyled-ui/icons/funding-tag-icon';
import { LogoTitle } from '../unstyled-ui/logo-title';

interface Props {
  org: Org;
}

/** UI for rendering org-info in listing card */
export const ListingOrg = ({ org }: Props) => (
  <div className="flex items-center space-x-4">
    <LogoTitle name={org.name} avatar={org.avatar} size="lg" avatarSize="sm" />
    <Button
      kind="subtle"
      left={<FundingTagIcon />}
      textProps={{ fw: 'regular' }}
    >
      Funding: {org.fundingDate}
    </Button>
  </div>
);
