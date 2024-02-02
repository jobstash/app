import { type ReactNode } from 'react';

import { type JobPost } from '@jobstash/jobs/core';
import { checkJobIsFeatured } from '@jobstash/jobs/utils';

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
  bookmarkButton: ReactNode;
  isActive: boolean;
  onClick: (jobPost: JobPost) => void;
}

const JobBookmarkCard = ({
  jobPost,
  bookmarkButton,
  isActive,
  onClick,
}: Props) => {
  const {
    organization,
    tags,
    title,
    timestamp,
    shortUUID,
    featureStartDate,
    featureEndDate,
  } = jobPost;
  const { projects } = organization;

  const isFeatured = checkJobIsFeatured(featureStartDate, featureEndDate);

  return (
    <JobCardWrapper
      href={null}
      isActive={isActive}
      isFeatured={isFeatured}
      onClick={() => onClick(jobPost)}
    >
      <JobCardHeader
        title={title}
        ts={timestamp}
        isFeatured={isFeatured}
        bookmarkButton={bookmarkButton}
      />
      {isFeatured && (
        <Heading size="md" fw="semibold">
          {title}
        </Heading>
      )}
      <JobCardTags jobPost={jobPost} />
      <JobCardOrg org={organization} />
      <JobCardTechs techs={tags} />
      <JobCardProjects projects={projects} />
      <JobCardFooter
        shortUUID={shortUUID}
        ts={timestamp}
        bookmarkButton={bookmarkButton}
      />
    </JobCardWrapper>
  );
};

export default JobBookmarkCard;
