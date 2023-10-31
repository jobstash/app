import { memo } from 'react';

import InternalErrorResult from './internal-error-result';

interface Props {
  error: unknown;
}

const ListErrorMessage = ({ error }: Props) => {
  if (!error) return null;

  return <InternalErrorResult />;
};

export default memo(ListErrorMessage);
