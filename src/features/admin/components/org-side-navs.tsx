import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { Flex } from '@mantine/core';

import { Button, Text } from '~/shared/components';
import { slugify } from '~/shared/utils';

type SideNavLabels = 'Organization' | 'Projects' | 'Jobs' | 'Repositories';

interface Props {
  keySegment: string;
  activeLabel: SideNavLabels;
}

const getSideNavs = (segmentKey: string) => [
  { label: 'Organization', href: `/godmode/organizations/${segmentKey}/edit` },
  { label: 'Projects', href: `/godmode/organizations/${segmentKey}/projects` },
  { label: 'Jobs', href: `/godmode/organizations/${segmentKey}/jobs` },
  {
    label: 'Repositories',
    href: `/godmode/organizations/${segmentKey}/repositories`,
  },
];

export const OrgSideNavs = ({ keySegment, activeLabel }: Props) => {
  const { push } = useRouter();

  const sideNavs = useMemo(() => getSideNavs(keySegment), [keySegment]);

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
