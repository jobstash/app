import { ChipsCell } from './chips-cell';
import { EmptyCellPlaceholder } from './empty-cell-placeholder';

interface Props {
  ecosystemActivations?: string[];
}

export const EcosystemActivationsCell = ({ ecosystemActivations }: Props) => {
  if (!ecosystemActivations) return <EmptyCellPlaceholder />;
  if (ecosystemActivations.length === 0) return <EmptyCellPlaceholder />;
  return <ChipsCell values={ecosystemActivations} />;
};
