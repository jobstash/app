import type { OrgListing, TagElement } from '~/core/interfaces';
import { TagIcon } from '~/shared/components';

export const createOrgTags = (listing: OrgListing): TagElement[] => {
  const { jobs, projects, details } = listing;

  const { teamSize, funding } = details;

  const tags: TagElement[] = [
    {
      text: `Team Size: ${teamSize}`,
      icon: <TagIcon filename="users-three" />,
    },
    {
      text: `Funding: ${funding.date}`,
      icon: <TagIcon filename="funding" />,
    },
  ];

  if (projects.length > 0) {
    tags.unshift({
      text: `Projects: ${projects.length}`,
      icon: <TagIcon filename="code" />,
    });
  }

  if (jobs.length > 0) {
    tags.unshift({
      text: `Jobs: ${jobs.length}`,
      icon: <TagIcon filename="suitcase" />,
    });
  }

  return tags;
};
