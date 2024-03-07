import { A11Y, HREFS } from '~/shared/core/constants';
import { CodeIcon } from '~/shared/components/icons/code-icon';
import { HandbagIcon } from '~/shared/components/icons/handbag-icon';
import { UsersThreeIcon } from '~/shared/components/icons/users-three-icon';

export const createNavSections = () => {
  const sections = [
    {
      label: 'Discover',
      bartabs: [
        {
          icon: <CodeIcon />,
          text: A11Y.LINK.SIDEBAR.JOBS,
          href: HREFS.JOBS_PAGE,
        },
        {
          icon: <HandbagIcon />,
          text: A11Y.LINK.SIDEBAR.ORGS,
          href: HREFS.ORGS_PAGE,
        },
        {
          icon: <UsersThreeIcon />,
          text: A11Y.LINK.SIDEBAR.PROJECTS,
          href: HREFS.PROJECTS_PAGE,
        },
      ],
    },
  ];

  return sections;
};
