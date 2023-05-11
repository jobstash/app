import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';

import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [{ title: 'Sales', href: '/godmode/sales' }];

const SalesPage = () => (
  <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
    <div>TODO</div>
  </AdminLayout>
);

SalesPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default SalesPage;
