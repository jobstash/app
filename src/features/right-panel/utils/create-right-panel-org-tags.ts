import { Organization, TagElement } from '~/shared/core/interfaces';

export const createRightPanelOrgTags = (org: Organization) => {
  const {
    url,
    location,
    teamSize,
    githubOrganization,
    twitter,
    telegram,
    discord,
    linkedin,
  } = org;

  const orgTags: TagElement[] = [
    {
      text: 'Website',
      iconText: 'website',
      link: url,
    },
    {
      text: location,
      iconText: 'location',
    },
  ];

  if (teamSize && teamSize !== 'undefined')
    orgTags.push({
      text: `Team Size: ${teamSize}`,
      iconText: 'users-three',
    });

  const orgSocials: TagElement[] = [];

  if (githubOrganization)
    orgSocials.push({
      text: 'Github',
      iconText: 'github',
      link: githubOrganization,
    });

  if (twitter)
    orgSocials.push({ text: 'Twitter', iconText: 'twitter', link: twitter });

  if (telegram)
    orgSocials.push({ text: 'Telegram', iconText: 'telegram', link: telegram });

  // **Note**: waiting for backend/middleware to implement "Docs"

  if (discord)
    orgSocials.push({ text: 'Discord', iconText: 'discord', link: discord });

  if (linkedin)
    orgSocials.push({ text: 'LinkedIn', iconText: 'linkedin', link: linkedin });

  return { orgTags, orgSocials };
};
