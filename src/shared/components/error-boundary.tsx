'use client';

import { ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const ErrorBoundary = ({ children, fallback = null }: Props) => {
  return (
    <BaseErrorBoundary fallback={<>{fallback}</>}>{children}</BaseErrorBoundary>
  );
};
