import { type ReactNode } from 'react';

import {
  usePreferredTermsContext,
  useTagsContext,
} from '@jobstash/admin/state';

import AdminContentLoader from '../../admin-content-loader';

interface Props {
  children: ReactNode;
}

const PreferredTermsContentWrapper = ({ children }: Props) => {
  const { isLoading: isLoadingTags } = useTagsContext();
  const { isLoading: isLoadingQuery } = usePreferredTermsContext();

  const isLoadingPage = isLoadingTags || isLoadingQuery;

  if (isLoadingPage) return <AdminContentLoader />;

  return (
    <div className="flex flex-col w-full gap-8">
      {children}
    </div>
  );
};

export default PreferredTermsContentWrapper;
