import type { Job } from '~/core/interfaces';
import { formatSalary } from '~/utils/format-salary';

import {
  LocationTagIcon,
  SalaryTagIcon,
  SeniorTagIcon,
  TeamSizeTagIcon,
  UtcTagIcon,
} from '../unstyled-ui/icons';

export const getJobTags = (job: Job) => {
  const { salary, location, tz, details } = job;
  const strSalary = formatSalary(salary);

  return [
    { text: details.role.name, icon: <SeniorTagIcon /> },
    { text: strSalary, icon: <SalaryTagIcon /> },
    { text: location, icon: <LocationTagIcon /> },
    { text: `Team size: ${details.team.size}`, icon: <TeamSizeTagIcon /> },
    { text: tz, icon: <UtcTagIcon /> },
  ];
};
