import { memo, useCallback, useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';
import {
  EVENT_CARD_CLICK,
  NEXT_PUBLIC_FRONTEND_URL,
} from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { createJobKey } from '@jobstash/jobs/utils';

import { activeJobAtom } from '@jobstash/jobs/state';

import JobCardHeader from './job-card-header';
import JobCardOrg from './job-card-org';
import JobCardProjects from './job-card-projects';
import JobCardTags from './job-card-tags';
import JobCardTechs from './job-card-techs';
import JobCardWrapper from './job-card-wrapper';

interface Props {
  jobPost: JobPost;
  isActive: boolean;
  filterParamsObj: Record<string, string>;
}

const JobCard = ({ jobPost, isActive, filterParamsObj }: Props) => {
  const { organization, technologies } = jobPost;
  const { jobTitle, jobCreatedTimestamp } = jobPost;
  const { projects } = organization;

  const setActiveJob = useSetAtom(activeJobAtom);

  const onClick = useCallback(() => {
    setActiveJob(jobPost);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  }, [jobPost, setActiveJob]);

  const href = useMemo(() => {
    const url = getUrlWithParams(
      NEXT_PUBLIC_FRONTEND_URL,
      `/jobs/${createJobKey(jobPost)}/details`,
      filterParamsObj,
    );

    return url.toString();
  }, [filterParamsObj, jobPost]);

  return (
    <JobCardWrapper href={href} isActive={isActive} onClick={onClick}>
      <JobCardHeader title={jobTitle} ts={jobCreatedTimestamp} />
      <JobCardTags jobPost={jobPost} />
      <JobCardOrg org={organization} />
      <JobCardTechs techs={technologies} />
      <JobCardProjects projects={projects} />
    </JobCardWrapper>
  );
};

export default memo(JobCard);
