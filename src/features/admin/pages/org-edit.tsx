import {
  Anchor,
  Center,
  Flex,
  Grid,
  Paper,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';

import { Avatar, CardHeading } from '~/shared/components';

import { OrgSideNavs } from '../components/org-side-navs';
import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
  { title: 'Edit Organization', href: '/godmode/organizations/edit' },
];

export const OrgEditPage = () => (
  <AdminLayout
    breadCrumbs={breadCrumbs}
    sideNav={<OrgSideNavs activeLabel="Organization" />}
  >
    <Stack w="70%" spacing={30} pt={30}>
      <Paper p={60} bg="rgba(255, 255, 255, 0.05)">
        <Flex gap="md" align="center">
          <Avatar src="/orgs/Uniswap Labs.png" alt="Uniswap Labs" size="lg" />
          <Stack spacing={0}>
            <CardHeading>Uniswap Labs</CardHeading>
            <Anchor c="dimmed">Change Logo</Anchor>
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
                placeholder="Uniswap Labs"
                value="Uniswap Labs"
                size="lg"
                radius="md"
              />
            </Grid.Col>
          </Grid>

          <Grid align="center">
            <Grid.Col span={3}>
              <Title order={4}>Website</Title>
            </Grid.Col>
            <Grid.Col span="auto">
              <TextInput
                placeholder="https://uniswap.org"
                value="https://uniswap.org"
                size="lg"
                radius="md"
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
                placeholder="uniswap.org"
                value="uniswap.org"
                size="lg"
                radius="md"
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
                value="Uniswap Labs is the company which provides the engineering and development of Uniswap solutions"
                size="lg"
                radius="md"
                minRows={10}
                inputWrapperOrder={['label', 'input', 'error', 'description']}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Center>
    </Stack>
  </AdminLayout>
);
