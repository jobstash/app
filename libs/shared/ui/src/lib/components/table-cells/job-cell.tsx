import { CustomCellRendererProps } from 'ag-grid-react';

import Text from '../../base/text';

export type CellProps = CustomCellRendererProps<{
  job: { title: string; classification: string | null };
}>;

export const JobCell = ({ data }: CellProps) => {
  if (!data) return null;

  const {
    job: { title, classification },
  } = data;

  return (
    <div className="flex flex-col">
      <Text size="md" fw="bold">
        {title}
      </Text>
      <Text size="sm" color="dimmed">
        {classification}
      </Text>
    </div>
  );
};
