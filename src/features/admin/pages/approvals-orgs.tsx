import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Approvals', href: '#' },
  { title: 'Organizations', href: '/godmode/approvals/organizations' },
];

export const ApprovalsOrgsPage = () => (
  <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
    <div>TODO</div>
  </AdminLayout>
);
