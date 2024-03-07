import { DetailsPanelActionsWrapper } from '~/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { DetailsPanelCTA } from '~/shared/components/details-panel/cta';
import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { Text } from '~/shared/components/text';

import { OrgDetails } from '~/orgs/core/schemas';

import { JobCardInfoTags } from './job-card/info-tags';

interface Props {
  job: OrgDetails['jobs'][number];
}

export const JobOtherJobCard = ({ job }: Props) => {
  const { title, summary } = job;

  return (
    <DetailsPanelCardWrapper>
      <Heading text={title} />
      <JobCardInfoTags job={job} />
      {summary && (
        <>
          <Divider />
          {<Text text={summary} />}
        </>
      )}
      <Divider />
      <DetailsPanelActionsWrapper>
        <DetailsPanelCTA text={CTA_TEXT} />
      </DetailsPanelActionsWrapper>
    </DetailsPanelCardWrapper>
  );
};

const CTA_TEXT = 'Explore Job';
