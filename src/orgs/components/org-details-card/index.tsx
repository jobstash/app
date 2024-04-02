import { FundingRound, Investor } from '~/shared/core/schemas';
import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { Text } from '~/shared/components/text';

import { Actions } from './actions';
import { FundingRounds } from './funding-rounds';
import { Investors } from './investors';

interface Props {
  org: {
    name: string;
    description: string;
    fundingRounds: FundingRound[];
    investors: Investor[];
  };
  withActions?: boolean;
}

export const OrgDetailsCard = ({
  org: { name, description, fundingRounds, investors },
  withActions,
}: Props) => {
  return (
    <DetailsPanelCardWrapper>
      <Heading text={name} />
      <Divider />
      <Text text={description} />
      <FundingRounds fundingRounds={fundingRounds} />
      <Investors investors={investors} />
      {withActions && <Actions />}
    </DetailsPanelCardWrapper>
  );
};
