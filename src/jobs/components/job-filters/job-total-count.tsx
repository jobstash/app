'use client';

import { useAtomValue } from 'jotai';

import { Text } from '~/shared/components/text';

import { jobTotalCountAtom } from '~/jobs/atoms/job-total-count-atom';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

export const JobTotalCount = () => {
  const { isPendingFilters } = useFiltersContext();
  const totalCount = useAtomValue(jobTotalCountAtom);

  // Do not show on empty count or pending
  if (!totalCount || isPendingFilters) return null;

  return <Text text={`Jobs Found: ${totalCount}`} />;
};
