import { Link, Tooltip } from '@nextui-org/react';

import { JobApplicant } from '@jobstash/jobs/core';
import { UserAvailableForWork, UserWorkHistory } from '@jobstash/shared/core';
import { getLogoUrl, shortTimestamp2 } from '@jobstash/shared/utils';

import Avatar from '../../base/avatar';
import Text from '../../base/text';
import GithubLogoOutlineIcon from '../../icons/github-logo-outline-icon';

import { EmptyCellPlaceholder } from './empty-cell-placeholder';

interface OrgLogoDateProps {
  src: string;
  name: string;
  url: string | null;
  login: string;
  orgTimestampText: string;
  repoCount: number;
  hideCount?: boolean;
}

const OrgLogoDate = ({
  src,
  name,
  url,
  login,
  orgTimestampText,
  repoCount,
  hideCount,
}: OrgLogoDateProps) => (
  <div className="flex items-center gap-3">
    <Avatar key={src} src={src} alt={name} size="md" name={name} />
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1 shrink-0">
        <Link
          href={url ?? `https://github.com/${login}`}
          size="sm"
          underline="hover"
          className="font-semibold text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </Link>
        {repoCount && !hideCount && name.length < 16 && (
          <Text size="sm" color="dimmed">
            ({repoCount})
          </Text>
        )}
      </div>
      <Text size="sm" color="dimmed">
        {orgTimestampText}
      </Text>
    </div>
  </div>
);

interface TooltipContentProps {
  src: string;
  orgTimestampText: string;
  workHistory: JobApplicant['user']['workHistory'][number];
}

const TooltipContent = ({
  workHistory,
  src,
  orgTimestampText,
}: TooltipContentProps) => {
  const { login, name, url, repositories } = workHistory;

  return (
    <div className="flex flex-col gap-6 p-2">
      <div key={login} className="flex flex-col gap-2">
        <OrgLogoDate
          hideCount
          src={src}
          name={name ?? ''}
          url={url}
          login={login}
          orgTimestampText={orgTimestampText}
          repoCount={repositories.length}
        />

        <hr className="border-t border-white/10" />

        {repositories.map((repository) => (
          <div key={repository.name} className="pl-2 flex items-center gap-2">
            <GithubLogoOutlineIcon />
            <div className="flex items-center gap-2">
              <Link
                href={`https://github.com/${repository.name}`}
                size="sm"
                underline="hover"
                className="font-semibold text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repository.name}
              </Link>
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
};

interface Props {
  workHistory?: UserWorkHistory[];
}

export const WorkHistoryCell = ({ workHistory }: Props) => {
  if (!workHistory) return <EmptyCellPlaceholder />;
  if (workHistory.length === 0) {
    return <EmptyCellPlaceholder />;
  }

  return (
    <div className="flex flex-col gap-4 self-start">
      {workHistory.map((history) => {
        const {
          login,
          name,
          firstContributedAt,
          lastContributedAt,
          url,
          logoUrl,
          repositories,
        } = history;

        const src = getLogoUrl(url, logoUrl);
        const orgTimestampText = `${shortTimestamp2(
          firstContributedAt,
        )} - ${shortTimestamp2(lastContributedAt)}`;

        return (
          <Tooltip
            key={login}
            delay={0}
            content={
              <TooltipContent
                src={src}
                orgTimestampText={orgTimestampText}
                workHistory={history}
              />
            }
          >
            <div className="flex gap-2 items-center min-w-[180px] w-fit">
              <OrgLogoDate
                src={src}
                name={name ?? ''}
                url={url}
                login={login}
                orgTimestampText={orgTimestampText}
                repoCount={repositories.length}
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};
