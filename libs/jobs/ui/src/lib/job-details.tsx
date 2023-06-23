import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';

import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import { Heading } from '@jobstash/shared/ui';

import JobDetailsApplyButton from './job-details-apply-button';
import JobDetailsDescriptions from './job-details-descriptions';
import JobDetailsTags from './job-details-tags';
import JobDetailsTechnologies from './job-details-technologies';

interface Props {
  jobPost: JobPost;
}

const JobDetails = ({ jobPost }: Props) => {
  const { jobTitle, jobApplyPageUrl, technologies } = jobPost;

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-col items-start gap-y-4">
          <div className="flex h-fit w-full justify-between">
            <Heading size="md" fw="semibold">
              {jobTitle}
            </Heading>
            {/* <div className="hidden items-start space-x-4 lg:flex">
            <ShareButton jobTitle={jobTitle} />
          </div> */}
          </div>

          <JobDetailsTags jobPost={jobPost} />

          <JobDetailsApplyButton applyUrl={jobApplyPageUrl} />
        </div>

        <div className="flex h-8 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <JobDetailsDescriptions jobPost={jobPost} />

        <JobDetailsTechnologies technologies={technologies} />
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(JobDetails);
