import Link from 'next/link';
import { memo } from 'react';

import { Breadcrumbs as MBreadCrumbs } from '@mantine/core';

import Text from '../base/text';

interface Props {
  breadCrumbs: { title: string; href?: string }[];
}

const BreadCrumbs = ({ breadCrumbs }: Props) => (
  <MBreadCrumbs>
    {breadCrumbs.map(({ title, href }) =>
      href ? (
        <Link key={title} href={href}>
          <Text key={title} color="dimmed" className="hover:underline">
            {title}
          </Text>
        </Link>
      ) : (
        <Text key={title} color="dimmed">
          {title}
        </Text>
      ),
    )}
  </MBreadCrumbs>
);

export default memo(BreadCrumbs);
