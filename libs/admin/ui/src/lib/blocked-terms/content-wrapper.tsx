import { type ReactNode } from 'react';

import { LoadingOverlay } from '@mantine/core';

import { useBlockedTermsMutationContext } from '@jobstash/admin/state';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

interface Props {
  children: ReactNode;
}

const BlockedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading } = useBlockedTermsMutationContext();

  return (
    <AdminTechContentWrapper>
      <LoadingOverlay visible={isLoading} />
      {children}
    </AdminTechContentWrapper>
  );
};

export default BlockedTermsContentWrapper;
