import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Anchor,
  Center,
  MultiSelect,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import { Button } from '~/shared/components';
import { Avatar, CardHeading, Heading, Text } from '~/shared/components';
import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { slugify } from '~/shared/utils';

import { AddIcon } from '../components/icons/add-icon';
import { ImageUploadContainer } from '../components/image-upload-container';
import { OrgSideNavs } from '../components/org-side-navs';
import { useOrgDeets } from '../hooks/use-org-deets';
import { AdminLayout } from '../layouts/admin-layout';

const useOrgId = () => {
  const { asPath, isReady } = useRouter();
  if (!isReady) return { id: undefined };

  const orgIdSection = asPath.split('/').at(-2);
  if (!orgIdSection) return { id: undefined };

  return { id: orgIdSection.split('-').at(-1) };
};

const getBreadCrumbs = (name: string, id: string) => [
  { title: 'Organizations', href: '/godmode/organizations' },
  {
    title: name,
    href: `/godmode/organizations/${slugify(`${name} ${id}`)}/edit`,
  },
  { title: 'Edit Organization' },
];

const OrgEditPage = () => {
  const { id } = useOrgId();

  const { data, isLoading } = useOrgDeets(id);

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [investors, setInvestors] = useState<string[]>([]);

  if (isLoading) return <EmptyPage isLoading />;
  if (!data) {
    return (
      <Center h="100%">
        <Title order={3}>Org does not exist</Title>
      </Center>
    );
  }

  const {
    id: orgId,
    name,
    logo,
    website,
    domain,
    description,
    location,
  } = data;

  const logoSrc =
    logo && logo.length > 0
      ? logo
      : logoFile
      ? URL.createObjectURL(logoFile)
      : undefined;

  const logoSubmit = async () => {
    if (logoFile) {
      const formData = new FormData();
      formData.append('file', logoFile);

      const res = await fetch(
        `${NEXT_PUBLIC_MW_URL}/organizations/upload-logo`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: formData,
        },
      );
      const jsonRes = await res.json();
      console.log('UPLOAD LOGO response =', jsonRes);
    }
  };

  return (
    <AdminLayout
      breadCrumbs={getBreadCrumbs(name, orgId)}
      sideNav={
        <OrgSideNavs
          keySegment={slugify(`${name} ${id}`)}
          activeLabel="Organization"
        />
      }
    >
      <div className="flex w-full flex-col items-center justify-center space-y-52 p-10">
        <div className="flex flex-col items-center justify-center space-y-10">
          {/* ORG DEETS HEADER */}
          <div className="w-9/12 rounded-lg bg-white/5 p-10">
            <div className="flex items-center gap-4">
              {logoSrc && (
                <ImageUploadContainer setFile={setLogoFile}>
                  <Avatar src={logoSrc} alt={name} size="lg" />
                </ImageUploadContainer>
              )}
              <div className="flex flex-col gap-2">
                <CardHeading>{name}</CardHeading>
                <ImageUploadContainer setFile={setLogoFile}>
                  <Anchor c="dimmed">{`${
                    logo || logoFile ? 'Change' : 'Add'
                  } Logo`}</Anchor>
                </ImageUploadContainer>
              </div>
            </div>
          </div>

          {/* ORG DEETS */}
          <div className="flex w-7/12 flex-col gap-4">
            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Organization Name
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  placeholder="Your organization's name"
                  value={name}
                  size="lg"
                  radius="md"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Website
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  placeholder="Your organization's website"
                  value={website}
                  size="lg"
                  radius="md"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Validated Domain
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  disabled
                  value={domain}
                  size="lg"
                  radius="md"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Organization Description
                </Heading>
              </div>
              <div className="col-span-10">
                <Textarea
                  description="Organization Description (max 500 characters)"
                  descriptionProps={{ pt: 10 }}
                  placeholder="Your organization's description"
                  value={description}
                  size="lg"
                  radius="md"
                  minRows={10}
                  inputWrapperOrder={['label', 'input', 'error', 'description']}
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Github Organization
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  size="lg"
                  radius="md"
                  placeholder="Github organization. You can find it in any repo URL"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Location
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  size="lg"
                  radius="md"
                  value={location}
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Employee count
                </Heading>
              </div>
              <div className="col-span-10">
                <NumberInput defaultValue={10} size="lg" radius="md" />
              </div>
            </div>
          </div>

          {/* ORG FINANCIALS HEADER */}
          <div className="w-9/12 rounded-lg bg-white/5 p-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <Heading fw="semibold" size="sm">
                  Financials
                </Heading>
                <Text color="dimmed">Add details to your Organization.</Text>
              </div>
              <div>
                <Button variant="outline" left={<AddIcon />}>
                  Add Funding
                </Button>
              </div>
            </div>
          </div>

          {/* ORG FINANCIALS FORM */}
          <div className="flex w-7/12 flex-col gap-8 rounded-3xl border-2 border-white/10 bg-white/5 p-10 pb-6">
            <div className="grid grid-cols-12 items-center gap-y-4">
              <div className="col-span-3 ">
                <Heading fw="semibold" size="sm">
                  Funding Round
                </Heading>
              </div>
              <div className="col-span-9">
                <TextInput
                  placeholder="e.g. Seed, Series A, Private Equity, Debt Financing"
                  size="lg"
                  radius="md"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-3 ">
                <Heading fw="semibold" size="sm">
                  Funding Date
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
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-3 ">
                <Heading fw="semibold" size="sm">
                  Money Raised
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
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-3 ">
                <Heading fw="semibold" size="sm">
                  Investors
                </Heading>
              </div>
              <div className="col-span-9">
                <MultiSelect
                  searchable
                  creatable
                  data={investors}
                  placeholder="Type here..."
                  size="lg"
                  radius="md"
                  getCreateLabel={(query) => `Add "${query}" investor`}
                  onCreate={(query) => {
                    setInvestors((current) => [...current, query]);
                    return query;
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline">Save</Button>
            </div>
          </div>

          {/* ORG FINANCIALS PREVIOUS VALUES */}
          <div className="flex w-7/12 flex-col gap-8 rounded-3xl border-2 border-white/10 bg-white/5 p-10 pb-6">
            <div className="grid grid-cols-12 items-center gap-y-4">
              <div className="col-span-3 ">
                <Heading fw="semibold" size="sm">
                  Funding Round
                </Heading>
              </div>
              <div className="col-span-9">
                <TextInput
                  placeholder="e.g. Seed, Series A, Private Equity, Debt Financing"
                  size="lg"
                  radius="md"
                  value="Series A"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-3 ">
                <Heading fw="semibold" size="sm">
                  Funding Date
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
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-3 ">
                <Heading fw="semibold" size="sm">
                  Money Raised
                </Heading>
              </div>
              <div className="col-span-9">
                <NumberInput
                  size="lg"
                  radius="md"
                  value={1_000_000_000}
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
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-3 ">
                <Heading fw="semibold" size="sm">
                  Investors
                </Heading>
              </div>
              <div className="col-span-9">
                <MultiSelect
                  searchable
                  creatable
                  data={[
                    'Yakoa',
                    'WalletConnect',
                    'Blowfish',
                    'Panoptic',
                    'Sardine',
                    'Goldsky',
                    'LayerZero Labs',
                    'DEX Screener',
                    'Fundamental Labs',
                    'Aviv Hadar',
                    'Manhattan Venture Partners',
                    'Propel VC',
                    'New York Stock Exchange',
                    'Nelson Ventures',
                    'Boost VC',
                    'Valor Capital Ventures',
                  ]}
                  value={[
                    'Yakoa',
                    'WalletConnect',
                    'Blowfish',
                    'Panoptic',
                    'Sardine',
                    'Goldsky',
                    'LayerZero Labs',
                    'DEX Screener',
                    'Fundamental Labs',
                    'Aviv Hadar',
                    'Manhattan Venture Partners',
                    'Propel VC',
                    'New York Stock Exchange',
                    'Nelson Ventures',
                    'Valor Capital Ventures',
                  ]}
                  placeholder="Type here..."
                  size="lg"
                  radius="md"
                  getCreateLabel={(query) => `Add "${query}" investor`}
                  onCreate={(query) => {
                    setInvestors((current) => [...current, query]);
                    return query;
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Save</Button>
              <Button variant="outline">Delete</Button>
            </div>
          </div>

          {/* ORG SOCIALS HEADER */}
          <div className="w-9/12 rounded-lg bg-white/5 p-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <Heading fw="semibold" size="sm">
                  Social
                </Heading>
                <Text color="dimmed">Add details to your Organization.</Text>
              </div>
              <div>
                <Button variant="outline" left={<AddIcon />}>
                  Add Social
                </Button>
              </div>
            </div>
          </div>

          {/* ORG SOCIALS FORM */}
          <div className="flex w-7/12 flex-col gap-4">
            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Twitter
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  size="lg"
                  radius="md"
                  placeholder="https://twitter.uniswap.com"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Linkedin
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  size="lg"
                  radius="md"
                  placeholder="https://twitter.uniswap.com"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Facebook
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  size="lg"
                  radius="md"
                  placeholder="https://twitter.uniswap.com"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <Heading fw="semibold" size="sm">
                  Twitter
                </Heading>
              </div>
              <div className="col-span-10">
                <TextInput
                  size="lg"
                  radius="md"
                  placeholder="https://twitter.uniswap.com"
                  onChange={() => null}
                />
              </div>
            </div>
          </div>

          {/* ORG SUBMIT CONTROLS */}
          <div className="flex h-fit w-8/12 flex-col gap-2.5 pt-8">
            <hr className="border-t border-white/10" />
          </div>
          <div className="flex w-full items-center justify-center gap-x-10">
            <Button variant="primary">Save Changes</Button>
            <Button>Delete Organization</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

OrgEditPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgEditPage;
