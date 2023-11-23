import { type ReactNode } from 'react';

import { usePairedTermsContext, useTagsContext } from '@jobstash/admin/state';

import AdminContentLoader from '../../admin-content-loader';

interface Props {
  children: ReactNode;
}

const PairedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading: isLoadingTags } = useTagsContext();
  const { isLoading: isLoadingPairedTerms } = usePairedTermsContext();

  const isLoading = isLoadingTags || isLoadingPairedTerms;

  if (isLoading) return <AdminContentLoader />;

  return <div className="w-full">{children}</div>;
};

export default PairedTermsContentWrapper;
