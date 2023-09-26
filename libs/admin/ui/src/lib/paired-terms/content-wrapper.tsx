import { type ReactNode } from 'react';

import {
  usePairedTermsContext,
  useTechnologiesContext,
} from '@jobstash/admin/state';

import AdminContentLoader from '../admin-content-loader';

interface Props {
  children: ReactNode;
}

const PairedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading: isLoadingTechnologies } = useTechnologiesContext();
  const { isLoading: isLoadingPairedTerms } = usePairedTermsContext();

  const isLoading = isLoadingTechnologies || isLoadingPairedTerms;

  if (isLoading) return <AdminContentLoader />;

  return <div className="w-full">{children}</div>;
};

export default PairedTermsContentWrapper;
