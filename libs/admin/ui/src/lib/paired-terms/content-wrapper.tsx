import { usePairedTermsContext } from '@jobstash/admin/state';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

interface Props {
  children: React.ReactNode;
}

const PairedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading } = usePairedTermsContext();

  return (
    <AdminTechContentWrapper isLoading={isLoading}>
      {children}
    </AdminTechContentWrapper>
  );
};

export default PairedTermsContentWrapper;
