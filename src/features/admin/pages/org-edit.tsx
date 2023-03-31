import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Anchor,
  Button,
  Center,
  Flex,
  Grid,
  Paper,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import { Avatar, CardHeading } from '~/shared/components';
import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { slugify } from '~/shared/utils';

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

  if (isLoading) return <EmptyPage isLoading />;
  if (!data) {
    return (
      <Center h="100%">
        <Title order={3}>Org does not exist</Title>
      </Center>
    );
  }

  const { id: orgId, name, logo, website, domain, description } = data;

  const logoSrc =
    logo ?? (logoFile ? URL.createObjectURL(logoFile) : undefined);

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
      sideNav={<OrgSideNavs activeLabel="Organization" />}
    >
      <Stack w="70%" spacing={30} pt={30}>
        <Paper p={60} bg="rgba(255, 255, 255, 0.05)">
          <Flex gap="md" align="center">
            {logoSrc && (
              <ImageUploadContainer setFile={setLogoFile}>
                <Avatar src={logoSrc} alt={name} size="lg" />
              </ImageUploadContainer>
            )}
            <Stack spacing={0}>
              <CardHeading>{name}</CardHeading>
              <ImageUploadContainer setFile={setLogoFile}>
                <Anchor c="dimmed">{`${
                  logo || logoFile ? 'Change' : 'Add'
                } Logo`}</Anchor>
              </ImageUploadContainer>
            </Stack>
          </Flex>
        </Paper>
        <Center>
          <Stack w="80%" spacing={30}>
            <Grid align="center">
              <Grid.Col span={3}>
                <Title order={4}>Organization Name</Title>
              </Grid.Col>
              <Grid.Col span="auto">
                <TextInput
                  placeholder="Your organization's name"
                  value={name}
                  size="lg"
                  radius="md"
                  onChange={() => null}
                />
              </Grid.Col>
            </Grid>

            <Grid align="center">
              <Grid.Col span={3}>
                <Title order={4}>Website</Title>
              </Grid.Col>
              <Grid.Col span="auto">
                <TextInput
                  placeholder="Your organization's website"
                  value={website}
                  size="lg"
                  radius="md"
                  onChange={() => null}
                />
              </Grid.Col>
            </Grid>

            <Grid align="center">
              <Grid.Col span={3}>
                <Title order={4}>Validated Domain</Title>
              </Grid.Col>
              <Grid.Col span="auto">
                <TextInput
                  disabled
                  value={domain}
                  size="lg"
                  radius="md"
                  onChange={() => null}
                />
              </Grid.Col>
            </Grid>

            <Grid align="center">
              <Grid.Col span={3}>
                <Title order={4}>Organization Description</Title>
              </Grid.Col>
              <Grid.Col span="auto">
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
              </Grid.Col>
            </Grid>
            <Flex justify="end">
              <Button variant="outline" onClick={logoSubmit}>
                Update
              </Button>
            </Flex>
          </Stack>
        </Center>
      </Stack>
    </AdminLayout>
  );
};

OrgEditPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgEditPage;
