import { useRouter } from 'next/router';

import { Flex } from '@mantine/core';

import { Button, Text } from '~/shared/components';

type SideNavLabels = 'Organization' | 'Projects' | 'Jobs' | 'Repositories';

interface Props {
  activeLabel: SideNavLabels;
}

const sideNavs = [
  { label: 'Organization', href: '/godmode/organizations/edit' },
  { label: 'Projects', href: '/godmode/organizations/projects' },
  { label: 'Jobs', href: '/godmode/organizations/jobs' },
  { label: 'Repositories', href: '/godmode/organizations/repositories' },
];

export const OrgSideNavs = ({ activeLabel }: Props) => {
  const { push } = useRouter();

  return (
    <Flex gap="lg">
      {sideNavs.map(({ label, href }) => (
        <Button
          key={label}
          variant={activeLabel === label ? 'primary' : 'outline'}
          onClick={() => push(href)}
        >
          <Text>{label}</Text>
        </Button>
      ))}
    </Flex>
  );
};
