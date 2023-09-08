import { LoadingOverlay } from '@mantine/core';

import { useIsLoadingPairedTermsPage } from '@jobstash/admin/state';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

interface Props {
  children: React.ReactNode;
}

const PairedTermsContentWrapper = ({ children }: Props) => {
  const isLoading = useIsLoadingPairedTermsPage();

  return (
    <AdminTechContentWrapper>
      <LoadingOverlay visible={isLoading} />
      {children}
    </AdminTechContentWrapper>
  );
};

export default PairedTermsContentWrapper;
