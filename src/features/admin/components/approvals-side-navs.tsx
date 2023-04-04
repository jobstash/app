import { useRouter } from 'next/router';

import { Flex } from '@mantine/core';

import { Button, Text } from '~/shared/components';

type SideNavLabels = 'Organizations' | 'Jobs';

interface Props {
  activeLabel: SideNavLabels;
}

const sideNavs = [
  { label: 'Organizations', href: '/godmode/approvals/organizations' },
  { label: 'Jobs', href: '/godmode/approvals/jobs' },
];

export const ApprovalsSideNavs = ({ activeLabel }: Props) => {
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
