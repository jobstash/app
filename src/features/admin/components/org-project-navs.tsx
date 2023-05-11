import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { Flex } from '@mantine/core';

import { Button, Text } from '~/shared/components';
import { slugify } from '~/shared/utils';

type NavLabels =
  | 'Project Details'
  | 'Audits'
  | 'Hacks'
  | 'Project Metrics'
  | 'Project Repositories';

interface Props {
  orgSegment: string;
  projSegment: string;
  activeLabel: NavLabels;
}

const getNavs = (orgSegment: string, projSegment: string) => [
  {
    label: 'Project Details',
    href: `/godmode/organizations/${orgSegment}/projects/${projSegment}/details`,
  },
  {
    label: 'Audits',
    href: `/godmode/organizations/${orgSegment}/projects/${projSegment}/audits`,
  },
  {
    label: 'Hacks',
    href: `/godmode/organizations/${orgSegment}/projects/${projSegment}/hacks`,
  },
  {
    label: 'Project Metrics',
    href: `/godmode/organizations/${orgSegment}/projects/${projSegment}/metrics`,
  },
  {
    label: 'Project Repositories',
    href: `/godmode/organizations/${orgSegment}/projects/${projSegment}/repositories`,
  },
];

export const OrgProjectNavs = ({
  orgSegment,
  projSegment,
  activeLabel,
}: Props) => {
  const { push } = useRouter();

  const sideNavs = useMemo(
    () => getNavs(orgSegment, projSegment),
    [orgSegment, projSegment],
  );

  return (
    <Flex gap="lg" justify="end">
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
