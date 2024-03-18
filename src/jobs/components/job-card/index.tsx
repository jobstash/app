import Link from 'next/link';

import { CardWrapper } from '~/shared/components/card-wrapper';
import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';

import { JOB_TEST_IDS } from '~/jobs/core/constants';
import { JobDetails } from '~/jobs/core/schemas';
import { createJobCardInfoTags } from '~/jobs/utils/create-job-card-info-tags';
import { activeJobIdAtom } from '~/jobs/atoms/active-job-id-atom';
import { JobSkills } from '~/jobs/components/job-skills';

import { JobCardInfoTags } from './info-tags';
import { JobCardOrg } from './org';
import { JobCardProjects } from './projects';
import { JobCardTsBookmark } from './ts-bookmark';

interface Props {
  job: JobDetails;
  isInit?: boolean;
  filterParamsString?: string;
}

export const JobCard = ({ job, isInit, filterParamsString = '' }: Props) => {
  const { title, shortUUID, timestamp, organization, tags } = job;
  const jobTags = createJobCardInfoTags(job);

  return (
    <CardWrapper id={shortUUID} idAtom={activeJobIdAtom}>
      <Link
        className="flex flex-col gap-3 p-6"
        href={`/jobs/${shortUUID}/details${filterParamsString}`}
        scroll={false}
        data-testid={JOB_TEST_IDS.JOB_CARD}
        data-uuid={shortUUID}
        data-is-init={isInit ?? undefined}
        prefetch={true}
      >
        <div className="flex w-full items-center justify-between py-1">
          <Heading text={title} />
          <div className="hidden lg:block">
            <JobCardTsBookmark timestamp={timestamp} />
          </div>
        </div>

        {jobTags.length > 0 && <Divider className="block md:hidden" />}

        <JobCardInfoTags job={job} />

        <Divider />

        <JobSkills skills={tags} />

        <Divider />

        <JobCardOrg org={organization} />

        <JobCardProjects projects={organization.projects} />

        <div className="flex flex-col gap-3 md:hidden">
          <Divider />
          <JobCardTsBookmark timestamp={timestamp} />
        </div>
      </Link>
    </CardWrapper>
  );
};
