import { type ReactNode } from 'react';

import { LoadingOverlay } from '@mantine/core';

import {
  useBlockedTermsContext,
  useBlockedTermsMutationContext,
  useTagsContext,
} from '@jobstash/admin/state';

import AdminContentLoader from '../admin-content-loader';
import AdminTechContentWrapper from '../admin-tech-content-wrapper';

interface Props {
  children: ReactNode;
}

const BlockedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading: isLoadingTags } = useTagsContext();
  const { isLoading: isLoadingBlockedTerms } = useBlockedTermsContext();
  const { isLoading: isLoadingBlockedTermsMutation } =
    useBlockedTermsMutationContext();

  const isLoadingPage = isLoadingTags || isLoadingBlockedTerms;

  if (isLoadingPage) return <AdminContentLoader />;

  return (
    <AdminTechContentWrapper>
      <LoadingOverlay visible={isLoadingBlockedTermsMutation} />
      {children}
    </AdminTechContentWrapper>
  );
};

export default BlockedTermsContentWrapper;
