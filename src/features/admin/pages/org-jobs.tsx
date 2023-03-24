import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
  { title: 'My Jobs', href: '/godmode/organizations/jobs' },
];

export const OrgJobsPage = () => (
  <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
    <div>TODO</div>
  </AdminLayout>
);
