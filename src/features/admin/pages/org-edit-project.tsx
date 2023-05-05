import { useRouter } from 'next/router';

import {
  Checkbox,
  Flex,
  Grid,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { slugify } from '~/shared/utils';

import { HandWavingIcon } from '../components/icons/hand-waving-icon';
import { MegaphoneIcon } from '../components/icons/megaphone-icon';
import { OrgSideNavs } from '../components/org-side-navs';
import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
  { title: 'My Projects', href: '/godmode/organizations/projects' },
  { title: 'Edit Project', href: '/godmode/organizations/projects/edit' },
];

const OrgEditProjectPage = () => {
  const { query } = useRouter();

  const splitIndex = (query.key as string).lastIndexOf('-');
  const orgName = (query.key as string).slice(0, splitIndex);
  const orgId = (query.key as string).slice(splitIndex + 1);

  return (
    <AdminLayout
      breadCrumbs={breadCrumbs}
      sideNav={
        <OrgSideNavs
          keySegment={slugify(`${orgName} ${orgId}`)}
          activeLabel="Projects"
        />
      }
    >
      <Stack w="60%" spacing={30} pt={20}>
        <Paper
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
        </Paper>
        <Paper p={30} bg="rgba(255, 255, 255, 0.05)" radius="md">
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
              <Text c="dimmed">
                Pooling resources can be helpful here. We use data from
                DefiLiama and Dune to ease up the input work as well as automate
                the inputs from any possible future changes in the project.
              </Text>
              <Text c="dimmed">
                DefiLiama can provide us with info such as: Project Name,
                Description, URL, Category, and TVL. and make life easier for
                everyone.
              </Text>
              <Text c="dimmed">
                Paste the DefiLiama URL in the input field below, and make life
                easier for everyone.
              </Text>
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
        </Paper>
      </Stack>
    </AdminLayout>
  );
};

OrgEditProjectPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgEditProjectPage;
