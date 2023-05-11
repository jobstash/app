import {
  Box,
  Button,
  Flex,
  Highlight,
  LoadingOverlay,
  MultiSelect,
  Paper,
  Text,
} from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';

import { AdminLayout } from '../layouts/admin-layout';

const data = ['Agile', 'Scrum', 'Project Management', 'Design'];

const breadCrumbs = [
  { title: 'Blocked Terms', href: '/godmode/blocked-terms' },
];

const BlockedTermsPage = () => (
  <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
    <Box w="75%">
      <Paper withBorder radius="lg" p={30} pos="relative">
        <LoadingOverlay visible={false} />
        <Flex w="100%" justify="space-between" gap="xl" align="center">
          <Text size="lg" fw="bold">
            Blocked Terms
          </Text>
          <div className="grow">
            <MultiSelect
              searchable
              creatable
              getCreateLabel={(query) => (
                <Highlight
                  highlight={` "${query}" `}
                  highlightStyles={(theme) => ({
                    backgroundImage: theme.fn.linearGradient(
                      90,
                      theme.colors.orange[4],
                      theme.colors.orange[5],
                      theme.colors.grape[5],
                      theme.colors.indigo[6],
                    ),
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  })}
                >
                  {`Add new blocked term: "${query}"`}
                </Highlight>
              )}
              data={data}
              placeholder="Search or add new blocked-terms here"
              maxDropdownHeight={320}
              size="lg"
            />
          </div>
          <Button radius="md" size="md" variant="default">
            Submit
          </Button>
        </Flex>
      </Paper>
    </Box>
  </AdminLayout>
);

BlockedTermsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default BlockedTermsPage;
