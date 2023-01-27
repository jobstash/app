import clsx from 'clsx';

import type { Job, Skill } from '~/core/interfaces';
import { formatSalary } from '~/utils/format-salary';

/** Titles used in hard skills */
const hardSkillTitles = [
  'You will be the main contributor for',
  'A team member can mentor you about',
  'You share responsibility with others about',
];

/** Inner props has job defined */
interface InnerProps {
  job: Job;
}

export const Description = ({ job }: InnerProps) => {
  const {
    details: { role, team, benefits, interview },
  } = job;
  const descriptions = [role, team, benefits, interview];

  return (
    <>
      <div className="flex flex-col space-y-6">
        {descriptions.map((details) => (
          <div key={details.label} className="flex max-w-xl flex-col space-y-2">
            <span className="font-semibold">{details.label}</span>
            <span className="text-xs text-zinc-500">{details.desc}</span>
          </div>
        ))}
      </div>

      <hr className="h-px border-0 bg-neutral-500" />
    </>
  );
};

export const Header = ({ job }: InnerProps) => {
  const {
    title,
    details: { role, team },
    salary,
    location,
    tz,
  } = job;

  const strSalary = formatSalary(salary);
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex space-x-4">
        <span className="text-sm">{role.name}</span>
        <span className="text-sm">{strSalary}</span>
        <span className="text-sm">{location}</span>
        <span className="text-sm">Team Size: {team.size}</span>
        <span className="text-sm">{tz}</span>
      </div>

      <div>
        <button
          className="rounded-xl border border-zinc-600 px-8 py-3"
          // eslint-disable-next-line no-alert
          onClick={() => alert('TODO')}
        >
          <span className="text-sm">Apply for this job</span>
        </button>
      </div>

      <hr className="h-px border-0 bg-neutral-500" />
    </>
  );
};

export const HardSkills = ({ job: { skills } }: InnerProps) => (
  <div className="flex flex-col space-y-6">
    <div className="flex flex-col space-y-2">
      <span className="text-xl font-bold">Hard Skills</span>
      <span className="text-sm text-zinc-400">
        These are skills required for the job
      </span>
    </div>

    {
      // Keys -> "main" | "hasMentor" | "shared"
      // Value -> Skill[] -> {name: string, isChecked: boolean}[]
      // Keys exactly maps to titles
      Object.entries(skills).map(([k, v], i) => (
        <div key={k} className="flex flex-col space-y-4">
          <span className="text-sm text-zinc-400">{hardSkillTitles[i]}</span>
          <div className="flex space-x-4">
            {v.map((skill: Skill) => (
              <div
                key={skill.name}
                className={clsx('border border-zinc-800 p-2', {
                  'border-red-500': skill.isChecked,
                })}
              >
                <h3 className="text-xs">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ))
    }
  </div>
);

/** Parent element needs conditional render on optional job */
interface Props {
  job?: Job;
}

export const JobDetails = ({ job }: Props) => {
  // It's possible job is undefined in which case we don't display panel
  if (!job) return null;

  return (
    <div className="flex flex-col space-y-8 rounded-2xl border border-zinc-600 p-6">
      <Header job={job} />
      <Description job={job} />
      <HardSkills job={job} />
    </div>
  );
};
