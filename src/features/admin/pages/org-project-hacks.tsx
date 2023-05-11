import { useRouter } from 'next/router';

import { NumberInput, Select, TextInput } from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import { Button, Heading, Text } from '~/shared/components';
import { slugify, unslugify } from '~/shared/utils';

import { OrgProjectNavs } from '../components/org-project-navs';
import { OrgSideNavs } from '../components/org-side-navs';
import ProjectHacksSvg from '../components/project-hacks-svg';
import { useProjectDeets } from '../hooks/use-project-deets';
import { AdminLayout } from '../layouts/admin-layout';

const OrgProjectHacksPage = () => {
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
            activeLabel="Hacks"
          />
        </div>
      }
    >
      <div className="mt-12 flex w-7/12 flex-col gap-8">
        <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-darker-gray p-8 pt-4">
          <div className="flex w-full items-center">
            <div className="">
              <ProjectHacksSvg />
            </div>
            <div className="flex max-w-[520px] flex-col gap-y-4">
              <Heading size="lg" fw="semibold">
                Hacks
              </Heading>
              <Text color="dimmed">
                Be upfront about any hacks or security breaches that may have
                affected your project.
              </Text>
              <Text color="dimmed">
                By being transparent about the hack and the steps taken to
                mitigate its effects, we can build trust with our users and
                foster a stronger community committed to the principles of
                blockchain technology. At Jobstash we take the security
                seriously, and we strive to promote a culture of openness and
                collaboration in the crypto world.
              </Text>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button isActive variant="outline">
              Import Hacks
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
                Date of Hack
              </Heading>
            </div>
            <div className="col-span-9">
              <DatesProvider settings={{ firstDayOfWeek: 0 }}>
                <DatePickerInput
                  placeholder="Pick date"
                  size="lg"
                  radius="md"
                />
              </DatesProvider>
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Classification
              </Heading>
            </div>
            <div className="col-span-9">
              <Select data={[]} placeholder="Select..." size="lg" radius="md" />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Amount Lost
              </Heading>
            </div>
            <div className="col-span-9">
              <NumberInput
                size="lg"
                radius="md"
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  Number.isNaN(Number.parseFloat(value))
                    ? '$ '
                    : `$ ${value}`.replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ',',
                      )
                }
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Link to the Hack
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput placeholder="Select" size="lg" radius="md" />
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
                Date of Hack
              </Heading>
            </div>
            <div className="col-span-9">
              <DatesProvider settings={{ firstDayOfWeek: 0 }}>
                <DatePickerInput
                  placeholder="Pick date"
                  size="lg"
                  radius="md"
                  value={new Date()}
                />
              </DatesProvider>
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Classification
              </Heading>
            </div>
            <div className="col-span-9">
              <Select
                data={['Something']}
                value="Something"
                placeholder="Select..."
                size="lg"
                radius="md"
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Amount Lost
              </Heading>
            </div>
            <div className="col-span-9">
              <NumberInput
                size="lg"
                radius="md"
                value={2_000_000}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  Number.isNaN(Number.parseFloat(value))
                    ? '$ '
                    : `$ ${value}`.replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ',',
                      )
                }
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Link to the Hack
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput
                value="https://www.coingecko.com/en/coins/uniswap"
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

OrgProjectHacksPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgProjectHacksPage;
