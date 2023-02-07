import type { JobListing } from '~/core/interfaces';
import { Button } from '~/shared/components';

import { createJobTags } from '../utils';

const hardSkillTitles = [
  'You will be the main contributor for',
  'A team member can mentor you about',
  'You share responsibility with others about',
];

interface Props {
  job: JobListing['details'];
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
    <div>
      <p>{title}</p>

      <div>
        {tags.map((tag) => (
          <div key={tag.text}>
            {tag.icon}
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <div>
        <Button>Apply for this job</Button>
      </div>

      <hr />

      <div>
        {descriptions.map((d) => (
          <div key={d.label}>
            <p>{d.label}</p>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>

      <hr />

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
