import { memo } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  BookmarkIcon,
  Button,
  Heading,
  RepoGithubIcon,
  RepoLinkIcon,
  ShareIcon,
  Text,
} from '~/shared/components';
import { Repository } from '~/shared/core/interfaces';

interface Props {
  repo: Repository;
  hourlyCommits: { hour: number; commits: number }[];
  weeklyCommits: {
    day: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
    commits: number;
  }[];
}

const RightPanelRepoCard = ({ repo, hourlyCommits, weeklyCommits }: Props) => (
  <div className="flex flex-col gap-4 p-6">
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <RepoGithubIcon />
          <Heading size="md" fw="semibold">
            {repo.fullName}
          </Heading>
        </div>
        <div className="flex gap-x-4">
          <Button isIcon size="sm" variant="translucent">
            <BookmarkIcon />
          </Button>
          <Button isIcon size="sm" variant="translucent">
            <RepoLinkIcon />
          </Button>
          <Button isIcon size="sm" variant="translucent">
            <ShareIcon />
          </Button>
        </div>
      </div>

      {/* <div className="flex h-8 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div> */}

      {/* <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center gap-2">
          <ProjectIcon />
          <Text>Project: Uniswap v3 DApp</Text>
        </div>
        <div className="flex items-center gap-2">
          <CommitersGitBranchIcon />
          <Text>Comitters: 17</Text>
        </div>
      </div> */}
    </div>

    {/* <div className="flex flex-col gap-2.5">
      <Text>🦄 An open source interface for the Uniswap protocol</Text>
      <div className="flex flex-col gap-2">
        <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/40 p-2.5 pl-4">
          <div className="flex items-center gap-1">
            <CommitersLargerIcon />
            <Text>4 Devs</Text>
          </div>
          <TechWrapper id="5">SOLIDITY</TechWrapper>
          <TechWrapper id="14">TYPESCRIPT</TechWrapper>
        </div>

        <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/40 p-2.5 pl-4">
          <div className="flex items-center gap-1">
            <CommitersLargerIcon />
            <Text>2 Devs</Text>
          </div>
          <TechWrapper id="27">REACT</TechWrapper>
          <TechWrapper id="16">WEBGL</TechWrapper>
          <TechWrapper id="7">JEST</TechWrapper>
        </div>
        <div />
      </div>
    </div> */}

    <div className="flex h-8 flex-col justify-center">
      <hr className="border-t border-white/10" />
    </div>

    <div className="flex flex-col gap-2">
      <Heading size="sm" fw="semibold">
        Commit Distribution (Daily)
      </Heading>
      <Text color="dimmed">
        Hourly distribution of commits made by contributors in different UTC
        time zones. Each hour is represented by a section, with its height
        showing the number of commits during that hour in a specific time zone.
      </Text>

      <div className="relative flex h-[380px] w-full items-center justify-center p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={520}
            height={360}
            data={hourlyCommits}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: -20,
            }}
          >
            <CartesianGrid
              strokeDasharray="1 3"
              strokeOpacity={0.2}
              vertical={false}
            />
            <XAxis
              includeHidden
              dataKey="hour"
              tickLine={false}
              tick={{ fontWeight: 500, fontSize: 10 }}
              minTickGap={0}
              label={{
                value: 'Hour of the day',
                fontSize: 12,
                margin: 10,
              }}
              height={60}
            />
            <YAxis
              interval="preserveEnd"
              dataKey="commits"
              type="number"
              tick={{ fontWeight: 500, fontSize: 10 }}
              minTickGap={0}
              tickLine={false}
              label={{
                angle: -90,
                value: 'Commits',
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgb(52, 52, 52)',
                border: 'none',
              }}
              labelFormatter={(label: string) =>
                `${label === 'UT' ? label : 'UTC ' + label}`
              }
            />
            <Bar dataKey="commits" fill="#E9954D" barSize={15} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="flex h-8 flex-col justify-center">
      <hr className="border-t border-white/10" />
    </div>

    <div className="flex flex-col gap-2">
      <Heading size="sm" fw="semibold">
        Commit Distribution (Weekly)
      </Heading>
      <Text color="dimmed">
        The graph displays the weekly distribution of commits. The graph
        information can also identify peak times for productivity and aid in
        scheduling decisions.
      </Text>

      <div className="relative flex h-[380px] w-full items-center justify-center p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={520}
            height={360}
            data={weeklyCommits}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: -20,
            }}
          >
            <CartesianGrid
              strokeDasharray="1 3"
              strokeOpacity={0.2}
              vertical={false}
            />
            <XAxis
              includeHidden
              dataKey="day"
              tickLine={false}
              tick={{ fontWeight: 500, fontSize: 10 }}
              minTickGap={0}
              label={{
                value: 'Day of the Week',
                fontSize: 12,
                margin: 10,
              }}
              height={60}
            />
            <YAxis
              interval="preserveEnd"
              dataKey="commits"
              type="number"
              tick={{ fontWeight: 500, fontSize: 10 }}
              minTickGap={0}
              tickLine={false}
              label={{
                angle: -90,
                value: 'Commits',
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgb(52, 52, 52)',
                border: 'none',
              }}
            />
            <Bar dataKey="commits" fill="#E491B4" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default memo(RightPanelRepoCard);
