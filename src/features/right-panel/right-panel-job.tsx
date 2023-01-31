import type { Job, Tech } from '~/core/interfaces';
import { createJobTags } from '~/utils/create-job-tags';

import { Button } from '../unstyled-ui/base/button';
import { Text } from '../unstyled-ui/base/text';
import { TagMapper } from '../unstyled-ui/tag-mapper';
import { TechWrapper } from '../unstyled-ui/tech-wrapper';

/** Titles used in hard skills */
const hardSkillTitles = [
  'You will be the main contributor for',
  'A team member can mentor you about',
  'You share responsibility with others about',
];

interface Props {
  job: Job;
}

export const Description = ({ job }: Props) => {
  const {
    details: { role, team, benefits, interview },
  } = job;
  const descriptions = [role, team, benefits, interview];

  return (
    <>
      <div className="flex flex-col space-y-6">
        {descriptions.map((details) => (
          <div key={details.label} className="flex max-w-xl flex-col space-y-2">
            <Text size="md" fw="bold">
              {details.label}
            </Text>
            <Text size="sm" fw="regular" className="text-white/60">
              {details.desc}
            </Text>
          </div>
        ))}
      </div>

      <hr className="h-px border-0 bg-neutral-500" />
    </>
  );
};

export const Header = ({ job }: Props) => {
  const { title } = job;

  return (
    <>
      <Text htmlTag="h1" size="2xl" fw="bold" className="text-white/90">
        {title}
      </Text>

      <TagMapper tags={createJobTags(job)} />

      <div>
        <Button
          size="lg"
          kind="primary"
          // eslint-disable-next-line no-alert
          onClick={() => alert('TODO')}
        >
          Apply for this job
        </Button>
      </div>

      <div className="py-2">
        <hr className="h-px border-0 bg-white/20" />
      </div>
    </>
  );
};

export const HardSkills = ({ job: { skills } }: Props) => (
  <div className="flex flex-col space-y-6">
    <div className="flex flex-col space-y-2">
      <Text size="lg" fw="bold">
        Hard Skills
      </Text>
      <Text size="md" fw="regular" className="text-white/60">
        These are technical skills required for the job
      </Text>
    </div>

    {
      // Keys -> "main" | "hasMentor" | "shared"
      // Value -> Skill[] -> {name: string, isChecked: boolean}[]
      // Keys exactly maps to titles
      Object.entries(skills).map(([k, v], i) => (
        <div key={k} className="flex flex-col space-y-4">
          <span className="text-sm text-zinc-400">{hardSkillTitles[i]}</span>
          <div className="flex space-x-4">
            {v.map((skill: Tech) => (
              <TechWrapper
                key={skill.name}
                text={skill.name}
                isChecked={skill.isChecked}
              />
            ))}
          </div>
        </div>
      ))
    }
  </div>
);

export const RightPanelJob = ({ job }: Props) => {
  // It's possible job is undefined in which case we don't display panel
  if (!job) return null;

  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-l from-primary to-secondary p-1">
      <div className="flex flex-col space-y-4 rounded-2xl bg-card p-6">
        <Header job={job} />
        <Description job={job} />
        <HardSkills job={job} />
      </div>
    </div>
  );
};
