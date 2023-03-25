import {
  Box,
  Center,
  Flex,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import { Button } from '~/shared/components';

import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [{ title: 'Imports', href: '/godmode/imports' }];

export const ImportsPage = () => (
  <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
    <Stack w="60%">
      <Paper radius="xl" p={30} pb={20} bg="rgba(255, 255, 255, 0.05)">
        <Stack spacing={30} w="100%">
          <Title order={2}>/Jobs/Jobs/JObzzzzz</Title>
          <Flex gap="md" align="center">
            <Box w="100%">
              <TextInput placeholder="Input ..." size="lg" radius="lg" />
            </Box>
            <Button kind="primary" size="lg">
              <Text size="md">Execute</Text>
            </Button>
          </Flex>
          <Center>
            <Title order={4}>Output</Title>
          </Center>
        </Stack>
      </Paper>
    </Stack>
  </AdminLayout>
);
