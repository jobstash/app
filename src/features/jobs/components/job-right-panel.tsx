import { Button } from '~/shared/components';
import type { JobPost } from '~/shared/core/interfaces';

import { createJobTags } from '../utils';

const hardSkillTitles = [
  'You will be the main contributor for',
  'A team member can mentor you about',
  'You share responsibility with others about',
];

interface Props {
  job: JobPost['details'];
}

export const JobRightPanel = ({ job }: Props) => {
  if (!job) return null;

  const { title, role, team, benefits, interview, skills } = job;

  const descriptions = [
    { label: 'Role', desc: role.description },
    { label: 'Team', desc: team.description },
    { label: 'Benefits', desc: benefits },
    { label: 'Interview', desc: interview },
  ];

  const tags = createJobTags(job);

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium">{title}</h2>
      <div className="flex space-x-8 pt-6 pb-4 text-sm">
        {tags.map((tag) => (
          <div key={tag.text} className="flex items-center">
            <div className="relative mr-2 h-3 w-3">{tag.icon}</div>
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap space-x-2 border-b border-white/20 pb-6">
        <Button>Apply for this job</Button>
      </div>
      <div className="space-y-4 pt-4">
        {descriptions.map((d) => (
          <div key={d.label} className="">
            <p className="text-md text-white">{d.label}</p>
            <p className="text-sm text-sidebarTitle">{d.desc}</p>
          </div>
        ))}
      </div>
      <div>
        <div>
          <p>Hard Skills</p>
          <p>These are technical skills required for the job</p>
        </div>
        {Object.entries(skills).map(([k, v], i) => (
          <div key={k}>
            <span>{hardSkillTitles[i]}</span>
            <p>{JSON.stringify(v)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
