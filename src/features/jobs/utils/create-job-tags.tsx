import { TagIcon } from '~/shared/components/icons';
import type { Job, TagElement } from '~/shared/core/interfaces';

export const createJobTags = (job: Job): TagElement[] => [
  { text: job.role.name, icon: <TagIcon filename="level" /> },
  { text: job.salary, icon: <TagIcon filename="money" /> },
  { text: job.location, icon: <TagIcon filename="location" /> },
  {
    text: `Team size: ${job.team.size}`,
    icon: <TagIcon filename="users-three" />,
  },
];
