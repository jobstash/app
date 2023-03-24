import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Approvals', href: '#' },
  { title: 'Jobs', href: '/godmode/approvals/jobs' },
];

export const ApprovalsJobsPage = () => (
  <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
    <div>TODO</div>
  </AdminLayout>
);
