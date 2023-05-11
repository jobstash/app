import { useRouter } from 'next/router';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import { slugify, unslugify } from '~/shared/utils';

import { OrgProjectNavs } from '../components/org-project-navs';
import { OrgSideNavs } from '../components/org-side-navs';
import { useProjectDeets } from '../hooks/use-project-deets';
import { AdminLayout } from '../layouts/admin-layout';

const OrgProjectRepositoriesPage = () => {
  const { query } = useRouter();

  const splitIndex = (query.orgSegment as string).lastIndexOf('-');
  const orgName = (query.orgSegment as string).slice(0, splitIndex);
  const orgId = (query.orgSegment as string).slice(splitIndex + 1);
  const keySegment = slugify(`${orgName} ${orgId}`);

  const projectSlugLength = (query.projSegment as string).length - 36;
  const projectSlug = (query.projSegment as string).slice(
    0,
    projectSlugLength - 1,
  );
  const projectId = (query.projSegment as string).slice(-36);

  const breadCrumbs = [
    { title: 'Organizations', href: '/godmode/organizations' },
    {
      title: unslugify(orgName),
      href: `/godmode/organizations/${keySegment}/edit`,
    },
    {
      title: 'Projects',
      href: `/godmode/organizations/${keySegment}/projects`,
    },
    {
      title: unslugify(projectSlug),
    },
  ];

  const { data, error, isLoading } = useProjectDeets(projectId);

  if (isLoading || !data) return <EmptyPage isLoading />;

  if (error) return <pre>error = {JSON.stringify(error)}</pre>;

  const { id, name } = data;

  return (
    <AdminLayout
      breadCrumbs={breadCrumbs}
      sideNav={
        <div className="flex flex-col justify-end gap-4">
          <OrgSideNavs
            keySegment={slugify(`${orgName} ${orgId}`)}
            activeLabel="Projects"
          />

          <div className="flex h-fit w-full flex-col gap-2.5">
            <hr className="border-t border-white/10" />
          </div>

          <OrgProjectNavs
            orgSegment={slugify(`${orgName} ${orgId}`)}
            projSegment={slugify(`${name} ${id}`)}
            activeLabel="Project Repositories"
          />
        </div>
      }
    >
      <p>TODO</p>
    </AdminLayout>
  );
};

OrgProjectRepositoriesPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgProjectRepositoriesPage;
