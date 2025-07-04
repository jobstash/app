/* eslint-disable camelcase */
import { memo, type ReactNode, useMemo } from 'react';

import { PrimitiveAtom, useSetAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  FRONTEND_URL,
  GA_EVENT_ACTION,
  JobPost,
  JobsRouteSection,
  ROUTE_SECTION,
} from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { checkJobIsFeatured, createJobKey } from '@jobstash/jobs/utils';
import {
  dispatchEvent,
  gaEvent,
  prettyTimestamp,
} from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

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
  isActive: boolean;
  filterParamsObj: Record<string, string>;
  bookmarkButton: ReactNode;
  promoteButton: ReactNode;
  routeSection: JobsRouteSection;
  activeJobAtom: PrimitiveAtom<JobPost | null>;
}

const JobCard = ({
  jobPost,
  isActive,
  filterParamsObj,
  bookmarkButton,
  promoteButton,
  routeSection = ROUTE_SECTION.JOBS,
  activeJobAtom,
}: Props) => {
  const {
    organization,
    tags,
    title,
    timestamp,
    shortUUID,
    classification,
    featureStartDate,
    featureEndDate,
    access,
    project,
    onboardIntoWeb3,
    ethSeasonOfInternships,
  } = jobPost;

  const { permissions } = useAuthContext();

  const setActiveJob = useSetAtom(activeJobAtom);

  const onClick = () => {
    setActiveJob(jobPost);

    // Right panel scroll back to top
    dispatchEvent(EVENT_CARD_CLICK);

    gaEvent(GA_EVENT_ACTION.JOB_EXPAND_DETAILS, {
      event_category: 'job',
      job_shortuuid: shortUUID,
      job_classification: classification ?? '',
      organization_name: organization?.name ?? '',
      user_role: JSON.stringify(permissions),
    });
  };

  const href = useMemo(() => {
    const url = getUrlWithParams(
      FRONTEND_URL,
      `${routeSection}/${createJobKey(jobPost)}/details`,
      filterParamsObj,
    );

    return url.toString();
  }, [filterParamsObj, jobPost, routeSection]);

  const isForExperts = access === 'protected';
  const isFeatured = checkJobIsFeatured(featureStartDate, featureEndDate);
  const timestampText =
    (isFeatured || ethSeasonOfInternships) && !onboardIntoWeb3
      ? 'Urgently hiring'
      : prettyTimestamp(timestamp);

  const isEmphasized =
    isFeatured ||
    isForExperts ||
    onboardIntoWeb3 ||
    Boolean(ethSeasonOfInternships);

  return (
    <JobCardWrapper
      href={href}
      isActive={isActive}
      hasGradientBorder={isEmphasized}
      onClick={onClick}
    >
      <JobCardHeader
        title={title}
        timestampText={timestampText}
        isForExperts={isForExperts}
        isFeatured={isFeatured}
        isOnboardIntoWeb3={onboardIntoWeb3}
        isEthSeasonOfInternships={Boolean(ethSeasonOfInternships)}
        topRightAction={bookmarkButton}
      />
      {isEmphasized && (
        <Heading size="md" fw="semibold">
          {title}
        </Heading>
      )}
      <JobCardTags jobPost={jobPost} promoteButton={promoteButton} />
      <JobCardOrg org={organization} />
      <JobCardTechs techs={tags} />
      <JobCardProjects
        projects={
          organization ? organization.projects : project ? [project] : []
        }
      />
      <JobCardFooter
        isFeatured={isFeatured}
        timestampText={timestampText}
        topRightAction={bookmarkButton}
      />
    </JobCardWrapper>
  );
};

export default memo(JobCard);
