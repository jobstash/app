import { memo } from 'react';

interface Props {
  error: unknown;
}

const ListErrorMessage = ({ error }: Props) => {
  if (!error) return null;

  return (
    <div className="py-8">
      <p>error = {(error as Error).message}</p>
    </div>
  );
};

export default memo(ListErrorMessage);
