import type { Project, TagElement } from '~/core/interfaces';
import { TagIcon } from '~/shared/components';

export const createProjectTags = (project: Project) => {
  const {
    numJobs,
    numRepos,
    website,
    category,
    teamSize,
    tvl,
    monthlyVolume,
    activeUsers,
    revenue,
    audits,
    hacks,
  } = project;

  const top: TagElement[] = [
    { text: `Jobs: ${numJobs}`, icon: <TagIcon filename="suitcase" /> },
    {
      text: `Relevant Repos: ${numRepos}`,
      icon: <TagIcon filename="github" />,
    },
    website,
    { text: `Category: ${category}`, icon: <TagIcon filename="category" /> },
    { text: `Team Size: ${teamSize}`, icon: <TagIcon filename="category" /> },
  ];

  const mid: TagElement[] = [
    { text: `TVL: ${tvl}`, icon: <TagIcon filename="tvl" /> },
    {
      text: `Monthly Volume: ${monthlyVolume}`,
      icon: <TagIcon filename="monthly-volume" />,
    },
    {
      text: `Active Users: ${activeUsers}`,
      icon: <TagIcon filename="active-user" />,
    },
    { text: `Revenue: ${revenue}`, icon: <TagIcon filename="revenue" /> },
  ];

  const bottom: TagElement[] = [
    ...audits.map((audit) => ({
      text: `Audit: ${audit.text}`,
      icon: <TagIcon filename="audit" />,
      link: audit.link,
    })),
    ...hacks.map((hack) => ({
      text: `Hack: ${hack.text}`,
      icon: <TagIcon filename="hacks" />,
      link: hack.link,
    })),
  ];

  return {
    top,
    mid,
    bottom,
  };
};
