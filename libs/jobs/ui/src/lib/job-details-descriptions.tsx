import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  jobPost: JobPost;
}

const JobDetailsDescriptions = ({ jobPost }: Props) => {
  const { role, team, benefits, culture } = jobPost;

  const descriptions = [];

  if (role) descriptions.push({ label: 'Role', desc: role });
  if (team) descriptions.push({ label: 'Team', desc: team });
  if (benefits) descriptions.push({ label: 'Benefits', desc: benefits });
  if (culture) descriptions.push({ label: 'Culture', desc: culture });

  return (
    <>
      {descriptions.map((d) => (
        <div key={d.label} className="flex flex-col gap-2 self-stretch">
          <Heading size="sm" fw="semibold">
            {d.label}
          </Heading>
          <Text color="dimmed">{d.desc}</Text>
        </div>
      ))}
    </>
  );
};

export default memo(JobDetailsDescriptions);
