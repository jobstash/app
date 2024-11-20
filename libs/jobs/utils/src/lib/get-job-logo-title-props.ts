import { JobPost } from '@jobstash/shared/core';

export const getJobLogoTitleProps = (job: JobPost) => {
  const { organization, project } = job;

  const name = organization?.name || project?.name || null;
  const website = organization?.website || project?.website || null;
  const logo = organization?.logoUrl || project?.logo || null;

  return {
    name,
    website,
    logo,
  };
};
