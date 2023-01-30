import { MouseEventHandler, useReducer, useState } from 'react';

import type { Job } from '~/core/interfaces';
import { formatSalary } from '~/utils/format-salary';

import { Button } from '../unstyled-ui/base/button';
import { Text } from '../unstyled-ui/base/text';
import {
  BookmarkActiveButtonIcon,
  BookmarkButtonIcon,
  LocationTagIcon,
  SalaryTagIcon,
  SeniorTagIcon,
} from '../unstyled-ui/icons';
import { TeamSizeTagIcon } from '../unstyled-ui/icons';
import { UtcTagIcon } from '../unstyled-ui/icons/utc-tag-icon';

interface Props {
  job: Job;
}

const BookmarkButton = () => {
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <Button onClick={onClick}>
      {isActive ? <BookmarkActiveButtonIcon /> : <BookmarkButtonIcon />}
    </Button>
  );
};

export const JobListingHeader = ({ job }: Props) => {
  const { title, salary, location, tz, created, details } = job;

  const strSalary = formatSalary(salary);

  return (
    <>
      <div className="flex justify-between">
        <Text htmlTag="h1" size="xl" fw="semibold" className="text-white/90">
          {title}
        </Text>

        <div className="flex items-center space-x-4">
          <Text htmlTag="h3" size="md" fw="regular" className="text-white/80">
            {created}
          </Text>
          <BookmarkButton />
        </div>
      </div>

      <div className="flex items-center">
        <Button
          size="sm"
          kind="subtle"
          textProps={{
            fw: 'regular',
            size: 'md',
            className: 'text-white/90',
            htmlTag: 'h3',
          }}
          left={<SeniorTagIcon />}
        >
          {details.role.name}
        </Button>
        <Button
          size="sm"
          kind="subtle"
          textProps={{
            fw: 'regular',
            size: 'md',
            className: 'text-white/90',
            htmlTag: 'h3',
          }}
          left={<SalaryTagIcon />}
        >
          {strSalary}
        </Button>
        <Button
          size="sm"
          kind="subtle"
          textProps={{
            fw: 'regular',
            size: 'md',
            className: 'text-white/90',
            htmlTag: 'h3',
          }}
          left={<LocationTagIcon />}
        >
          {location}
        </Button>
        <Button
          size="sm"
          kind="subtle"
          textProps={{
            fw: 'regular',
            size: 'md',
            className: 'text-white/90',
            htmlTag: 'h3',
          }}
          left={<TeamSizeTagIcon />}
        >
          Team Size: {details.team.size}
        </Button>
        <Button
          size="sm"
          kind="subtle"
          textProps={{
            fw: 'regular',
            size: 'md',
            className: 'text-white/90',
            htmlTag: 'h3',
          }}
          left={<UtcTagIcon />}
        >
          {tz}
        </Button>
      </div>

      <hr className="h-px border-0 bg-white/30" />
    </>
  );
};
