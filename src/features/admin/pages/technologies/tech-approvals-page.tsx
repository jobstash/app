import { useRouter } from 'next/router';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';

import TechnologiesSidenav from '../../components/technologies-sidenav';
import { AdminLayout } from '../../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Technology Approvals', href: '/godmode/technologies/approvals' },
];

const TechApprovalsPage = () => {
  const { asPath, push } = useRouter();

  return (
    <AdminLayout
      breadCrumbs={breadCrumbs}
      sideNav={<TechnologiesSidenav asPath={asPath} push={push} />}
    >
      <p>TODO</p>
    </AdminLayout>
  );
};

TechApprovalsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default TechApprovalsPage;
