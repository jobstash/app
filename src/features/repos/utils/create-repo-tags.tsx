import type { Repository, TagElement } from '~/core/interfaces';
import { TagIcon } from '~/shared/components';

export const createRepoTags = (repo: Repository): TagElement[] => {
  const { project, type, committers } = repo;

  return [
    { text: `Project: ${project}`, icon: <TagIcon filename="project" /> },
    { text: `Type: ${type}`, icon: <TagIcon filename="project" /> },
    {
      text: `Committers: ${committers}`,
      icon: <TagIcon filename="git-branch" />,
    },
  ];
};
