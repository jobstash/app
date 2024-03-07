import { JobInfoTags } from '~/shared/core/schemas';
import { InfoTags } from '~/shared/components/info-tags';

import { createJobCardInfoTags } from '~/jobs/utils/create-job-card-info-tags';

interface Props {
  job: JobInfoTags;
}

export const JobCardInfoTags = ({ job }: Props) => {
  const tags = createJobCardInfoTags(job);

  return <InfoTags compact tags={tags} />;
};
