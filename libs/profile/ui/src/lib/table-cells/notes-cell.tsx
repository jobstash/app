interface Props {
  notes?: string;
}

export const NotesCell = ({ notes }: Props) => {
  if (!notes) return null;

  return (
    <div className="self-start pt-1">
      <span className="whitespace-pre-line">{notes}</span>
    </div>
  );
};
