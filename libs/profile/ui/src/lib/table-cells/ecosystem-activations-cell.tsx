import { EmptyCellPlaceholder } from '../empty-cell-placeholder';

import { ChipsCell } from './chips-cell';

interface Props {
  ecosystemActivations?: string[];
}

export const EcosystemActivationsCell = ({ ecosystemActivations }: Props) => {
  if (!ecosystemActivations) return <EmptyCellPlaceholder />;
  if (ecosystemActivations.length === 0) return <EmptyCellPlaceholder />;
  return <ChipsCell values={ecosystemActivations} />;
};
