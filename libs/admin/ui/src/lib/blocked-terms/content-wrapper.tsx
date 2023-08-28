import { useBlockedTermsContext } from '@jobstash/admin/state';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

interface Props {
  children: React.ReactNode;
}

const BlockedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading } = useBlockedTermsContext();

  return (
    <AdminTechContentWrapper isLoading={isLoading}>
      {children}
    </AdminTechContentWrapper>
  );
};

export default BlockedTermsContentWrapper;
