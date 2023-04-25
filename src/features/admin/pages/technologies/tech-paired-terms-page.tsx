import { useRouter } from 'next/router';

import {
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  LoadingOverlay,
  MultiSelect,
  Paper,
  Select,
  Stack,
  Title,
} from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { Text } from '~/shared/components';

import TechnologiesSidenav from '../../components/technologies-sidenav';
import { AdminLayout } from '../../layouts/admin-layout';

const data = [
  'React',
  'Angular',
  'Svelte',
  'Vue',
  'Riot',
  'NextJS',
  'Qwik',
  'Lit',
  'Jest',
  'Cypress',
  'Playwright',
];

const breadCrumbs = [
  { title: 'Paired Terms', href: '/godmode/technologies/paired-terms' },
];

const TechPairedTermsPage = () => {
  const { asPath, push } = useRouter();

  return (
    <AdminLayout
      breadCrumbs={breadCrumbs}
      sideNav={<TechnologiesSidenav asPath={asPath} push={push} />}
    >
      <Stack w="70%" pt={60} spacing={60}>
        <Paper withBorder radius="lg" px={45} pt={45} pb={30} pos="relative">
          <LoadingOverlay visible={false} />
          <Stack spacing={30}>
            <Grid align="center">
              <Grid.Col span={2}>
                <Text size="lg" fw="bold">
                  Origin
                </Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <Select
                  searchable
                  clearable
                  data={data}
                  placeholder="Type here ..."
                  maxDropdownHeight={320}
                  nothingFound="Nothing found"
                  size="lg"
                />
              </Grid.Col>
            </Grid>
            <Grid align="center">
              <Grid.Col span={2}>
                <Text size="lg" fw="bold">
                  Destination
                </Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <MultiSelect
                  searchable
                  data={data}
                  placeholder="Type here ..."
                  maxDropdownHeight={320}
                  nothingFound="Nothing found"
                  size="lg"
                />
              </Grid.Col>
            </Grid>
            <Flex w="full" justify="flex-end" align="center">
              <Button radius="md" size="md" variant="default">
                Submit
              </Button>
            </Flex>
          </Stack>
        </Paper>

        <Center>
          <Divider
            w="100%"
            size={2}
            label={
              <div className="px-8">
                <Title order={2}>Existing Paired Terms</Title>
              </div>
            }
            labelPosition="center"
          />
        </Center>

        <Paper
          withBorder
          radius="lg"
          px={45}
          pt={45}
          pb={30}
          pos="relative"
          miw="75%"
        >
          <LoadingOverlay visible={false} />
          <Stack spacing={30}>
            <Grid align="center">
              <Grid.Col span={2}>
                <Text size="lg" fw="bold">
                  Origin
                </Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <Select
                  searchable
                  disabled
                  data={data}
                  placeholder="Pick one term"
                  maxDropdownHeight={320}
                  nothingFound="Nothing found"
                  size="lg"
                  value={data[0]}
                />
              </Grid.Col>
            </Grid>
            <Grid align="center">
              <Grid.Col span={2}>
                <Text size="lg" fw="bold">
                  Destination
                </Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <MultiSelect
                  searchable
                  data={data}
                  placeholder="Search and pick terms here"
                  maxDropdownHeight={320}
                  nothingFound="Nothing found"
                  size="lg"
                />
              </Grid.Col>
            </Grid>
            <Flex w="full" justify="flex-end" align="center" gap="xl">
              <Button radius="md" size="md" variant="outline" color="red">
                Delete
              </Button>
              <Button radius="md" size="md" variant="default">
                Submit
              </Button>
            </Flex>
          </Stack>
        </Paper>
      </Stack>
    </AdminLayout>
  );
};

TechPairedTermsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default TechPairedTermsPage;
