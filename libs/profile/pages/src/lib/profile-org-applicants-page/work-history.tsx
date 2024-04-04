import { Chip, Tooltip } from '@nextui-org/react';

import { JobApplicant } from '@jobstash/jobs/core';
import { getPluralText, shortTimestamp2 } from '@jobstash/shared/utils';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';
import { GithubLogoOutlineIcon, Text } from '@jobstash/shared/ui';

interface Props {
  workHistory: JobApplicant['user']['workHistory'];
}

export const WorkHistory = ({ workHistory }: Props) => {
  if (workHistory.length === 0)
    return <EmptyCellPlaceholder text="None Listed" />;

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      {workHistory.map((history) => (
        <Tooltip
          key={history.login}
          content={<TooltipContent workHistory={history} />}
        >
          <Chip radius="sm">
            <div className="flex gap-2 items-center">
              {history.name}
              <span role="img" aria-label="work-history">
                ✅
              </span>
              <span>{`${getPluralText('Repo', history.repositories.length)}: ${
                history.repositories.length
              }`}</span>
            </div>
          </Chip>
        </Tooltip>
      ))}
    </div>
  );
};

interface TooltipContentProps {
  workHistory: JobApplicant['user']['workHistory'][number];
}

const TooltipContent = ({ workHistory }: TooltipContentProps) => (
  <div className="flex flex-col gap-6 p-2">
    <div key={workHistory.login} className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Text fw="bold" size="lg">{`${workHistory.name}`}</Text>
        <Text color="dimmed" size="lg">
          |
        </Text>
        <Text size="sm" color="dimmed">{`${shortTimestamp2(
          workHistory.firstContributedAt,
        )} - ${shortTimestamp2(workHistory.lastContributedAt)}`}</Text>
      </div>

      <hr className="border-t border-white/10" />

      {workHistory.repositories.map((repository) => (
        <div key={repository.name} className="pl-2 flex items-center gap-2">
          <GithubLogoOutlineIcon />
          <div className="flex items-center gap-2">
            <Text fw="bold">{repository.name}</Text>
            <Text
              color="dimmed"
              size="sm"
            >{`${repository.commitsCount} commits`}</Text>
            <Text size="sm" color="dimmed">
              |
            </Text>
            <Text size="sm" color="dimmed">{`${shortTimestamp2(
              repository.firstContributedAt,
            )} - ${shortTimestamp2(repository.lastContributedAt)}`}</Text>
          </div>
        </div>
      ))}
    </div>
  </div>
);
