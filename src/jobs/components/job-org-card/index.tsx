import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { Text } from '~/shared/components/text';

import { JobDetails } from '~/jobs/core/schemas';

import { JobOrgCardActions } from './actions';
import { JobOrgCardFundingRounds } from './funding-rounds';
import { JobOrgCardInvestors } from './investors';

interface Props {
  job: JobDetails;
}

export const JobOrgCard = ({ job }: Props) => {
  const {
    organization: { name, description, fundingRounds, investors },
  } = job;

  return (
    <DetailsPanelCardWrapper>
      <Heading text={name} />
      <Divider />
      <Text text={description} />
      <JobOrgCardFundingRounds fundingRounds={fundingRounds} />
      <JobOrgCardInvestors investors={investors} />
      <JobOrgCardActions />
    </DetailsPanelCardWrapper>
  );
};
