import { type ReactNode } from 'react';

import { JobPost } from '@jobstash/shared/core';
import { checkJobIsFeatured } from '@jobstash/jobs/utils';
import { prettyTimestamp } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

import JobCardFooter from './job-card-footer';
import JobCardHeader from './job-card-header';
import JobCardOrg from './job-card-org';
import JobCardProjects from './job-card-projects';
import JobCardTags from './job-card-tags';
import JobCardTechs from './job-card-techs';
import JobCardWrapper from './job-card-wrapper';

interface Props {
  jobPost: JobPost;
  topRightAction: ReactNode;
  isActive: boolean;
  onClick: (jobPost: JobPost) => void;
}

const JobCardNonLink = ({
  jobPost,
  topRightAction,
  isActive,
  onClick,
}: Props) => {
  const {
    organization,
    tags,
    title,
    timestamp,
    featureStartDate,
    featureEndDate,
    access,
  } = jobPost;
  const { projects } = organization;

  const isForExperts = access === 'protected';
  const isFeatured = checkJobIsFeatured(featureStartDate, featureEndDate);
  const timestampText = isFeatured
    ? 'Urgently hiring'
    : prettyTimestamp(timestamp);

  return (
    <JobCardWrapper
      href={null}
      isActive={isActive}
      isForExperts={isForExperts}
      isFeatured={isFeatured}
      onClick={() => onClick(jobPost)}
    >
      <JobCardHeader
        title={title}
        timestampText={timestampText}
        isForExperts={isForExperts}
        isFeatured={isFeatured}
        topRightAction={topRightAction}
      />
      {(isFeatured || isForExperts) && (
        <Heading size="md" fw="semibold">
          {title}
        </Heading>
      )}
      <JobCardTags jobPost={jobPost} promoteButton={null} />
      <JobCardOrg org={organization} />
      <JobCardTechs techs={tags} />
      <JobCardProjects projects={projects} />
      <JobCardFooter
        isFeatured={isFeatured}
        timestampText={timestampText}
        topRightAction={topRightAction}
      />
    </JobCardWrapper>
  );
};

export default JobCardNonLink;
