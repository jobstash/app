import { type ReactNode } from 'react';

import { usePreferredTermsContext } from '@jobstash/admin/state';

import AdminContentLoader from '../admin-content-loader';

interface Props {
  children: ReactNode;
}

const PreferredTermsContentWrapper = ({ children }: Props) => {
  const { isLoading } = usePreferredTermsContext();

  if (isLoading) return <AdminContentLoader />;

  return (
    <div className="flex flex-col gap-8 w-full justify-center items-center">
      {children}
    </div>
  );
};

export default PreferredTermsContentWrapper;
