import { type ReactNode } from 'react';

import { LoadingOverlay } from '@mantine/core';

import {
  useBlockedTermsContext,
  useBlockedTermsMutationContext,
  useTechnologiesContext,
} from '@jobstash/admin/state';

import AdminContentLoader from '../admin-content-loader';
import AdminTechContentWrapper from '../admin-tech-content-wrapper';

interface Props {
  children: ReactNode;
}

const BlockedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading: isLoadingTechnologies } = useTechnologiesContext();
  const { isLoading: isLoadingBlockedTerms } = useBlockedTermsContext();
  const { isLoading: isLoadingBlockedTermsMutation } =
    useBlockedTermsMutationContext();

  const isLoadingPage = isLoadingTechnologies || isLoadingBlockedTerms;

  if (isLoadingPage) return <AdminContentLoader />;

  return (
    <AdminTechContentWrapper>
      <LoadingOverlay visible={isLoadingBlockedTermsMutation} />
      {children}
    </AdminTechContentWrapper>
  );
};

export default BlockedTermsContentWrapper;
