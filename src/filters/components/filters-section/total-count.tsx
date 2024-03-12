import { PrimitiveAtom, useAtomValue } from 'jotai';

import { capitalize } from '~/shared/utils/capitalize';
import { Text } from '~/shared/components/text';

import { useFiltersContext } from '~/filters/providers/filters-provider/context';

interface Props {
  countAtom: PrimitiveAtom<number | null>;
}

export const TotalCount = ({ countAtom }: Props) => {
  const { isPendingFilters, routeSection } = useFiltersContext();
  const totalCount = useAtomValue(countAtom);

  // Do not show on empty count or pending
  if (!totalCount || isPendingFilters) return null;

  return <Text text={`${capitalize(routeSection)} Found: ${totalCount}`} />;
};
