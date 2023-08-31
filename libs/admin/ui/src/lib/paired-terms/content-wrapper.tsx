import { usePairedTermsContext } from '@jobstash/admin/state';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

interface Props {
  children: React.ReactNode;
}

const PairedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading } = usePairedTermsContext();

  return (
    <AdminTechContentWrapper isLoading={isLoading} withBorders={false}>
      {children}
    </AdminTechContentWrapper>
  );
};

export default PairedTermsContentWrapper;
