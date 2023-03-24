import { Center, Flex, Grid, Paper, Stack, Title } from '@mantine/core';

import { HandWavingIcon } from '../components/icons/hand-waving-icon';
import { OrgSideNavs } from '../components/org-side-navs';
import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
  { title: 'My Projects', href: '/godmode/organizations/projects' },
  { title: 'Edit Project', href: '/godmode/organizations/projects/edit' },
];

export const OrgEditProjectPage = () => (
  <AdminLayout
    breadCrumbs={breadCrumbs}
    sideNav={<OrgSideNavs activeLabel="Projects" />}
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
        <Grid align="end">
          <Grid.Col span={11}>
            <Stack>
              <Title c="violet">Hey!</Title>
              <Title order={4}>
                Are you a new project that hasn&#39;t been deployed to mainnet
                yet?
              </Title>
            </Stack>
          </Grid.Col>
          <Grid.Col span={1} h="100%">
            <Flex align="end" direction="column">
              <HandWavingIcon />
            </Flex>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  </AdminLayout>
);
