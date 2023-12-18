/* eslint-disable camelcase */
import { memo, type ReactNode, useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';
import {
  EVENT_CARD_CLICK,
  FRONTEND_URL,
  GA_EVENT_ACTION,
} from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { createJobKey } from '@jobstash/jobs/utils';
import { dispatchEvent, gaEvent } from '@jobstash/shared/utils';

import { activeJobAtom } from '@jobstash/jobs/state';
import { mobileRightPanelOpenAtom, useIsMobile } from '@jobstash/shared/state';

import JobCardFooter from './job-card-footer';
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
  bookmarkButton: ReactNode;
}

const JobCard = ({
  jobPost,
  isActive,
  filterParamsObj,
  bookmarkButton,
}: Props) => {
  const { organization, tags, title, timestamp, shortUUID, classification } =
    jobPost;
  const { projects, name: orgName } = organization;

  const setActiveJob = useSetAtom(activeJobAtom);

  const isMobile = useIsMobile();
  const setMobileRightPanelOpen = useSetAtom(mobileRightPanelOpenAtom);

  const onClick = () => {
    setActiveJob(jobPost);

    // Right panel scroll back to top
    dispatchEvent(EVENT_CARD_CLICK);

    // If on mobile, set mobileRightPanelOpen (used for disabling scroll in main window)
    if (isMobile) {
      setMobileRightPanelOpen(true);
    }

    gaEvent(GA_EVENT_ACTION.JOB_EXPAND_DETAILS, {
      event_category: 'job',
      job_shortuuid: shortUUID,
      job_classification: classification ?? '',
      organization_name: orgName,
    });
  };

  const href = useMemo(() => {
    const url = getUrlWithParams(
      FRONTEND_URL,
      `/jobs/${createJobKey(jobPost)}/details`,
      filterParamsObj,
    );

    return url.toString();
  }, [filterParamsObj, jobPost]);

  return (
    <JobCardWrapper href={href} isActive={isActive} onClick={onClick}>
      <JobCardHeader
        shortUUID={shortUUID}
        title={title}
        ts={timestamp}
        bookmarkButton={bookmarkButton}
      />
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

export default memo(JobCard);
