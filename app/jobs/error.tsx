'use client';

import { ErrorBoundaryProps } from '~/shared/core/types';
import { reloadPage } from '~/shared/utils/reload-page';
import { InternalErrorResult } from '~/shared/components/internal-error-result';

const Error = (props: ErrorBoundaryProps) => {
  return <InternalErrorResult onReset={reloadPage} {...props} />;
};

export default Error;
