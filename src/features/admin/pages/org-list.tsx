import { useRouter } from 'next/router';

import { Stack } from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import { Button, CardSet, TechWrapper } from '~/shared/components';
import LogoTitle from '~/shared/components/base/logo-title';
import { slugify } from '~/shared/utils';

import { useOrgList } from '../hooks/use-org-list';
import { AdminLayout } from '../layouts/admin-layout';
import { createAdminOrgListTags } from '../utils';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
];

const OrgListPage = () => {
  const { push } = useRouter();

  const editOrg = (name: string, id: string) => {
    push(`/godmode/organizations/${slugify(`${name}-${id}`)}/edit`);
  };

  const { data, isLoading } = useOrgList();

  if (isLoading || !data) return <EmptyPage isLoading />;

  return (
    <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
      <Stack w="60%" spacing={45}>
        {data.map((org) => {
          const { id, name, location, technologies } = org;
          const tags = createAdminOrgListTags(org);

          return (
            <div
              key={id}
              className="flex flex-col gap-2 rounded-3xl bg-white/5 p-6"
            >
              <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center justify-between">
                  <LogoTitle
                    title={name}
                    avatarProps={{
                      src: '/jobstash-loading.png',
                      alt: name,
                    }}
                    location={location}
                    size="lg"
                  />
                  <Button
                    variant="primary"
                    onClick={() =>
                      push(
                        `/godmode/organizations/${slugify(
                          `${name}-${id}`,
                        )}/edit`,
                      )
                    }
                  >
                    Edit Organization
                  </Button>
                </div>
              </div>

              {tags.length > 0 && (
                <>
                  <div className="flex flex-col gap-2.5 py-2">
                    <hr className="border-t border-white/10" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4">
                    {tags.map(({ text, icon }) => (
                      <CardSet key={text} icon={icon}>
                        {text}
                      </CardSet>
                    ))}
                  </div>
                </>
              )}

              {technologies.length > 0 && (
                <>
                  <div className="flex flex-col gap-2.5 py-2">
                    <hr className="border-t border-white/10" />
                  </div>

                  <div className="flex items-center gap-4">
                    {technologies.map(({ name, id }) => (
                      <TechWrapper key={id} id={id}>
                        {name}
                      </TechWrapper>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </Stack>
    </AdminLayout>
  );
};

OrgListPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgListPage;
