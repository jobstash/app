import { memo } from 'react';

import { type JobInfo } from '@jobstash/shared/core';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  jobInfo: JobInfo;
}

const RightPanelJobCardDescriptions = ({ jobInfo }: Props) => {
  const { summary, requirements, responsibilities, benefits, culture } =
    jobInfo;

  const listTexts: { label: string; items: string[] }[] = [];

  if (requirements.length > 0)
    listTexts.push({ label: 'Requirements', items: requirements });

  if (responsibilities.length > 0)
    listTexts.push({ label: 'Responsibilities', items: responsibilities });

  if (benefits.length > 0)
    listTexts.push({ label: 'Benefits', items: benefits });

  const hasListTexts = listTexts.length > 0;

  //
  // if (role) descriptions.push({ label: 'Role', desc: role });
  // if (team) descriptions.push({ label: 'Team', desc: team });
  // if (benefits) descriptions.push({ label: 'Benefits', desc: benefits });
  // if (culture) descriptions.push({ label: 'Culture', desc: culture });

  //
  // return (
  //   <>
  //     {descriptions.map((d) => (
  //       <div key={d.label} className="flex flex-col gap-2 self-stretch">
  //         <Heading size="sm" fw="semibold">
  //           {d.label}
  //         </Heading>
  //         <Text color="dimmed">{d.desc}</Text>
  //       </div>
  //     ))}
  //   </>
  // );

  return (
    <div className="flex flex-col gap-6">
      {summary && (
        <div className="flex flex-col gap-2 self-stretch">
          <Heading size="sm" fw="semibold">
            Summary
          </Heading>
          <Text color="dimmed">{summary}</Text>
        </div>
      )}
      {hasListTexts &&
        listTexts.map(({ label, items }) => (
          <div key={label} className="flex flex-col gap-2 self-stretch">
            <Heading size="sm" fw="semibold">
              {label}
            </Heading>
            <ul className="space-y-1 list-disc list-outside pl-6">
              {items.map((text) => (
                <li key={text}>
                  <Text color="dimmed">{text}</Text>
                </li>
              ))}
            </ul>
          </div>
        ))}
      {culture && (
        <div className="flex flex-col gap-2 self-stretch">
          <Heading size="sm" fw="semibold">
            Culture
          </Heading>
          <Text color="dimmed">{culture}</Text>
        </div>
      )}
    </div>
  );
};

export default memo(RightPanelJobCardDescriptions);
