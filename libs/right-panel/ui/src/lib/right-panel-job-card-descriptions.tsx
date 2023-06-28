import { memo } from 'react';

import { type JobInfo } from '@jobstash/shared/core';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  jobInfo: JobInfo;
}

const RightPanelJobCardDescriptions = ({ jobInfo }: Props) => {
  const { role, team, benefits, culture } = jobInfo;

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

export default memo(RightPanelJobCardDescriptions);
