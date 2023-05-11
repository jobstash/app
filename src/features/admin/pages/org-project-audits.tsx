import { useRouter } from 'next/router';

import { TextInput } from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import { Button, Heading, Text } from '~/shared/components';
import { slugify, unslugify } from '~/shared/utils';

import { OrgProjectNavs } from '../components/org-project-navs';
import { OrgSideNavs } from '../components/org-side-navs';
import ProjectAuditSvg from '../components/project-audit-svg';
import { useProjectDeets } from '../hooks/use-project-deets';
import { AdminLayout } from '../layouts/admin-layout';

const OrgProjectAuditsPage = () => {
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
            activeLabel="Audits"
          />
        </div>
      }
    >
      <div className="mt-12 flex w-7/12 flex-col gap-8">
        <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-darker-gray p-8">
          <div className="flex w-full items-center">
            <div className="">
              <ProjectAuditSvg />
            </div>
            <div className="flex max-w-[520px] flex-col gap-y-4">
              <Heading size="lg" fw="semibold">
                Audits
              </Heading>
              <Text color="dimmed">
                Audits are critical in cryptocurrency because they ensure that
                the code is secure, free of vulnerabilities and fully compliant
                with the standards set forth by the blockchain community. With
                the proliferation of cryptocurrencies and their underlying
                technologies, it is more important than ever to have reliable
                third-party auditors that can ensure the safety and security of
                users&#39; funds and data.
              </Text>
              <Text color="dimmed">
                By providing transparency around the audits of the projects on
                our platform, we enable our users to make informed decisions
                when it comes to their career choices. Whether you&#39;re a
                software engineer looking for your next challenge or a hiring
                manager looking for top talent, the information we provide on
                project audits will help you make the right decision.
              </Text>
            </div>
          </div>
          <div className="flex w-full items-center justify-center pt-8">
            <Button isActive variant="outline">
              Import Audits
            </Button>
          </div>
        </div>

        <div className="flex h-fit w-full flex-col gap-2.5">
          <hr className="border-t border-white/10" />
        </div>

        <div className="w-full text-center">
          <Heading size="md" fw="semibold">
            Edit Project Details
          </Heading>
        </div>

        <div className="flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-darker-gray p-8">
          <div className="grid w-9/12 grid-cols-12 items-center gap-y-8">
            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Name of Auditer
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput placeholder="Type here ..." size="lg" radius="md" />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Audit
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput placeholder="Enter URL" size="lg" radius="md" />
            </div>
          </div>

          <div className="flex w-9/12 justify-end gap-4">
            <Button variant="outline">Save</Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-darker-gray p-8">
          <div className="grid w-9/12 grid-cols-12 items-center gap-y-8">
            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Name of Auditer
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput value="ABDK Consulting" size="lg" radius="md" />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Audit
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput
                value="https://github.com/Uniswap/v3-core/blob/main/audits/abdk/audit.pdf"
                size="lg"
                radius="md"
              />
            </div>
          </div>

          <div className="flex w-9/12 justify-end gap-4">
            <Button variant="outline">Save</Button>
            <Button variant="outline">Delete</Button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center pt-12">
          <Button isActive variant="outline">
            Save Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

OrgProjectAuditsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgProjectAuditsPage;
