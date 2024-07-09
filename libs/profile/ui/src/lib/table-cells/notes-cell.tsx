import { EmptyCellPlaceholder } from '../empty-cell-placeholder';

interface Props {
  note?: string | null;
}

export const NotesCell = ({ note }: Props) => {
  if (!note) return <EmptyCellPlaceholder />;

  return (
    <div className="self-start pt-1">
      <span className="whitespace-pre-line">{note}</span>
    </div>
  );
};
