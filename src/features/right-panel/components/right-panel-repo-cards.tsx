import { memo, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';

import clsx from 'clsx';

import { Repository } from '~/shared/core/interfaces';

import { dayMapping } from '../core/constants';

import RightPanelRepoCard from './right-panel-repo-card';

interface Props {
  isPending: boolean;
  repos: Repository[];
}

const RightPanelRepoCards = ({ repos, isPending }: Props) => {
  const hourlyCommitsData = useMemo(
    () =>
      repos.map((d) => {
        const hourlyCommits = Array.from({ length: 24 })
          .fill(0)
          .map((_, i) => ({
            hour: i,
            commits: 0,
          }));

        for (const [hour, commits] of JSON.parse(d.dailyHistogram) as [
          number,
          number,
        ][]) {
          hourlyCommits[hour] = { hour, commits };
        }

        return hourlyCommits;
      }),
    [repos],
  );

  const weeklyCommitsData = useMemo(
    () =>
      repos.map((d) => {
        const weeklyCommits = Object.values(dayMapping).map((day) => ({
          day,
          commits: 0,
        }));
        for (const [dayKey, commits] of JSON.parse(d.weeklyHistogram) as [
          number,
          number,
        ][]) {
          weeklyCommits[dayKey] = {
            day: dayMapping[dayKey as keyof typeof dayMapping],
            commits,
          };
        }

        return weeklyCommits;
      }),
    [repos],
  );

  if (repos.length === 0) return <p>No repositories</p>;

  return (
    <div className="mt-4">
      <List
        height={800}
        itemCount={repos.length}
        itemSize={1160}
        width="calc(100% + 40px)"
      >
        {({ index, style }) => (
          <div style={{ ...style, paddingRight: 40 }}>
            <div
              className={clsx(
                'mt-8 rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5',
                { 'select-none pointer-events-none': isPending },
              )}
            >
              <div className="rounded-3xl bg-darker-gray">
                <div className="flex flex-col gap-6">
                  <RightPanelRepoCard
                    repo={repos[index]}
                    hourlyCommits={hourlyCommitsData[index]}
                    weeklyCommits={weeklyCommitsData[index]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </List>
    </div>
  );
};

export default memo(RightPanelRepoCards);
