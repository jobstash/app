import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  Anchor,
  Checkbox,
  MultiSelect,
  NumberInput,
  Stack,
  Text as MText,
  Textarea,
  TextInput,
} from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import {
  Avatar,
  Button,
  CardHeading,
  Heading,
  Text,
} from '~/shared/components';
import { lato } from '~/shared/core/constants';
import { slugify, unslugify } from '~/shared/utils';

import { ImageUploadContainer } from '../components/image-upload-container';
import { OrgProjectNavs } from '../components/org-project-navs';
import { OrgSideNavs } from '../components/org-side-navs';
import { ProjectDefiLlamaSvg } from '../components/project-defillama-svg';
import { ProjectMainnetSvg } from '../components/project-mainnet-svg';
import { useProjectDeets } from '../hooks/use-project-deets';
import { AdminLayout } from '../layouts/admin-layout';

const OrgProjectDetailsPage = () => {
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

  const [logoFile, setLogoFile] = useState<File | null>(null);

  if (isLoading || !data) return <EmptyPage isLoading />;

  if (error) return <pre>error = {JSON.stringify(error)}</pre>;

  const { id, logo, url, name, description, category, teamSize, tokenAddress } =
    data;

  const logoSrc =
    logo.length > 0
      ? logo
      : logoFile
      ? URL.createObjectURL(logoFile)
      : undefined;

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
            activeLabel="Project Details"
          />
        </div>
      }
    >
      <Stack w="60%" spacing={30} pt={20}>
        {/* <pre>{JSON.stringify (data, undefined, '\t')}</pre> */}

        {/* MAINNET */}
        <div className="mt-8 rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5">
          <div className="flex items-center justify-center rounded-3xl bg-darker-gray pb-8">
            <div className="flex flex-col items-center">
              <div>
                <ProjectMainnetSvg />
              </div>
              <div className="-mt-16">
                <span
                  className={`text-6xl font-semibold ${lato.variable} font-lato text-[#663DF9]`}
                >
                  Hey!
                </span>
              </div>
              <div className="py-4">
                <Heading size="sm" fw="normal">
                  Are you a new project that hasn&#39;t been deployed to mainnet
                  yet?
                </Heading>
              </div>
              <div className="py-4">
                <Checkbox label="Yup, project is still in the making!" />
              </div>
            </div>
          </div>
        </div>

        {/* DEFILLAMA */}
        <div className="flex flex-wrap gap-x-4 rounded-3xl border border-white/10 bg-darker-gray py-8">
          <div className="flex w-4/12 items-center justify-center">
            <ProjectDefiLlamaSvg />
          </div>
          <div className="flex max-w-[520px] grow flex-col gap-y-6">
            <Heading fw="semibold">
              Quick Setup with <span className="text-[#663DF9]">DefiLlama</span>
            </Heading>
            <Text color="dimmed">
              Pooling resources can be helpful here. We use data from DefiLiama
              and Dune to ease up the input work as well as automate the inputs
              from any possible future changes in the project.
            </Text>

            <Text color="dimmed">
              DefiLiama can provide us with info such as: Project Name,
              Description, URL, Category, and TVL.
            </Text>

            <Text color="dimmed">
              Paste the DefiLiama URL in the input field below, and make life
              easier for everyone.
            </Text>
          </div>

          <div className="-mt-6 flex w-4/12 items-center justify-center">
            <Heading fw="semibold" size="sm">
              DefiLlama URL
            </Heading>
          </div>

          <div className="-mt-6 w-full max-w-[520px]">
            <TextInput
              placeholder="Enter DefiLlama URL here ..."
              size="lg"
              radius="lg"
            />
          </div>

          <div className="flex w-full items-center justify-center pt-6">
            <Button isActive variant="outline">
              Load DefiLlama
            </Button>
          </div>
        </div>

        <div className="flex h-fit w-full flex-col gap-2.5">
          <hr className="border-t border-white/10" />
        </div>

        <div className="flex w-full items-center justify-center py-8">
          <Heading fw="semibold" size="lg">
            Edit Project Details
          </Heading>
        </div>

        {/* PROJECT DEETS HEADER */}
        <div className="w-full rounded-lg bg-white/5 p-10">
          <div className="flex items-center gap-4">
            {logoSrc ? (
              <ImageUploadContainer setFile={setLogoFile}>
                <Avatar src={logoSrc} alt={name} size="lg" />
              </ImageUploadContainer>
            ) : (
              <Avatar
                src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`}
                alt={name}
                size="lg"
              />
            )}
            <div className="flex flex-col gap-2">
              <CardHeading>{name}</CardHeading>
              <ImageUploadContainer setFile={setLogoFile}>
                <Anchor c="dimmed">Change Logo</Anchor>
              </ImageUploadContainer>
            </div>
          </div>
        </div>

        {/* PROJECT DEETS */}
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="grid w-9/12 grid-cols-12 items-center gap-y-8">
            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Project Name
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput
                placeholder="Project Name"
                value={name}
                size="lg"
                radius="md"
                onChange={() => null}
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Project Description
              </Heading>
            </div>
            <div className="col-span-9">
              <Textarea
                placeholder="Project Description (Max 500 characters)"
                value={description}
                size="lg"
                radius="md"
                minRows={12}
                onChange={() => null}
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Project URL
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput
                placeholder="Add Project URL if available"
                value={url}
                size="lg"
                radius="md"
                onChange={() => null}
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Category
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput
                placeholder="Project category"
                value={category}
                size="lg"
                radius="md"
                onChange={() => null}
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Team Size
              </Heading>
            </div>
            <div className="col-span-9">
              <NumberInput
                placeholder="Your organization's team size"
                value={teamSize}
                size="lg"
                radius="md"
                onChange={() => null}
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Token
              </Heading>
            </div>
            <div className="col-span-9">
              <TextInput
                placeholder="URL for Token Tracker"
                size="lg"
                radius="md"
                onChange={() => null}
              />
            </div>

            <div className="col-span-3">
              <Heading fw="semibold" size="sm">
                Chains
              </Heading>
            </div>
            <div className="col-span-9">
              <MultiSelect
                data={[]}
                placeholder="TODO"
                size="lg"
                radius="md"
                onChange={() => null}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center pt-12">
            <Button isActive variant="outline">
              Save Changes
            </Button>
          </div>
        </div>

        {/* <Paper
          p={30}
          bg="rgba(255, 255, 255, 0.05)"
          radius="md"
          sx={(theme) => ({
            border: `1px solid ${theme.colors.violet[9]}`,
          })}
        >
          <Stack spacing={30}>
            <Grid align="end">
              <Grid.Col span={11}>
                <Stack>
                  <Title c="violet">Hey!</Title>
                  <Title order={4}>
                    Are you a new project that hasn&#39;t been deployed to
                    mainnet yet?
                  </Title>
                </Stack>
              </Grid.Col>
              <Grid.Col span={1} h="100%">
                <Flex align="end" direction="column">
                  <HandWavingIcon />
                </Flex>
              </Grid.Col>
            </Grid>
            <Checkbox
              label="Yup, project is still in the making!"
              radius="md"
              size="lg"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Paper> */}
        {/* <Paper p={30} bg="rgba(255, 255, 255, 0.05)" radius="md">
          <Stack spacing={20}>
            <Grid align="start">
              <Grid.Col span={11}>
                <Flex gap="sm">
                  <Title order={2} c="white">
                    Quick Setup with
                  </Title>
                  <Title order={2} c="violet">
                    DefiLlama
                  </Title>
                </Flex>
              </Grid.Col>
              <Grid.Col span={1} h="100%">
                <Flex align="end" direction="column">
                  <MegaphoneIcon />
                </Flex>
              </Grid.Col>
            </Grid>
            <Stack spacing={15} w="90%">
              <MText c="dimmed">
                Pooling resources can be helpful here. We use data from
                DefiLiama and Dune to ease up the input work as well as automate
                the inputs from any possible future changes in the project.
              </MText>
              <MText c="dimmed">
                DefiLiama can provide us with info such as: Project Name,
                Description, URL, Category, and TVL. and make life easier for
                everyone.
              </MText>
              <MText c="dimmed">
                Paste the DefiLiama URL in the input field below, and make life
                easier for everyone.
              </MText>
            </Stack>
            <Grid pt={20} align="center">
              <Grid.Col span={2}>
                <Title order={4}>DefiLlama URL</Title>
              </Grid.Col>
              <Grid.Col span={9}>
                <TextInput
                  placeholder="Enter DefiLlama URL here ..."
                  size="lg"
                  radius="lg"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper> */}
      </Stack>
    </AdminLayout>
  );
};

OrgProjectDetailsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgProjectDetailsPage;
