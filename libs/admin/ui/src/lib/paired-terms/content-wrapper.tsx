import { useIsLoadingPairedTermsPage } from '@jobstash/admin/state';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

interface Props {
  children: React.ReactNode;
}

const PairedTermsContentWrapper = ({ children }: Props) => {
  const isLoading = useIsLoadingPairedTermsPage();

  return (
    <AdminTechContentWrapper isLoading={isLoading} withBorders={false}>
      {children}
    </AdminTechContentWrapper>
  );
};

export default PairedTermsContentWrapper;
