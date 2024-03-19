'use client';

import { usePathname } from 'next/navigation';

import { useAtomValue } from 'jotai';

import { HREFS } from '~/shared/core/constants';
import { initPathAtom } from '~/shared/atoms/init-path-atom';

import { JobCardSkeleton } from '~/jobs/components/job-card/skeleton';

import { initOrgAtom } from '../atoms/init-org-atom';

import { OrgCard } from './org-card';

interface Props {
  filterParamsString: string;
}

export const InitOrgCard = ({ filterParamsString }: Props) => {
  const pathname = usePathname();

  const initPath = useAtomValue(initPathAtom);
  const initOrg = useAtomValue(initOrgAtom);

  // Do not render if initially in /jobs
  if (initPath === HREFS.ORGS_PAGE) return null;

  // Do not render if on /jobs page and no initOrg
  if (!initOrg && pathname === HREFS.ORGS_PAGE) return null;

  // Render initOrg if set
  if (initOrg)
    return (
      <OrgCard
        isInit
        orgItem={initOrg}
        filterParamsString={filterParamsString}
      />
    );

  // Defaults to a skeleton (job card skeleton for now)
  return <JobCardSkeleton />;
};
