import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { Text } from '~/shared/components/text';

import { JobDetails } from '~/jobs/core/schemas';
import { JobSkills } from '~/jobs/components/job-skills';

interface Props {
  skills: JobDetails['tags'];
}

export const JobDetailsCardSkills = ({ skills }: Props) => {
  if (!skills.length) return null;

  return (
    <>
      <Divider />

      <div className="flex flex-col gap-2">
        <Heading
          text="Skills"
          className="text-base font-semibold"
          htmlTag="h3"
        />
        <Text text={SKILLS_TEXT} />
      </div>

      <JobSkills skills={skills} />
    </>
  );
};

const SKILLS_TEXT = 'Skills required to be successful at the job:';
