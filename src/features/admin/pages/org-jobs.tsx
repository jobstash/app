import {
  ActionIcon,
  Box,
  Flex,
  Paper,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { Button, TagIcon } from '~/shared/components';

import { CircleCheckIcon } from '../components/icons/circle-check-icon';
import { JobDataSourceIcon } from '../components/icons/job-data-source-icon';
import { RefreshIcon } from '../components/icons/refresh-icon';
import { OrgSideNavs } from '../components/org-side-navs';
import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
  { title: 'My Jobs', href: '/godmode/organizations/jobs' },
];

const OrgJobsPage = () => (
  <AdminLayout
    breadCrumbs={breadCrumbs}
    sideNav={<OrgSideNavs activeLabel="Projects" />}
  >
    <Stack w="60%" spacing={15} pt={20}>
      <Flex justify="end" gap="md" align="center">
        <Text>Jobs: 4</Text>
        <ActionIcon variant="subtle">
          <RefreshIcon />
        </ActionIcon>
      </Flex>
      <Paper p={40} bg="rgba(255, 255, 255, 0.05)" radius="xl">
        <Stack spacing={15}>
          <Flex justify="space-between" align="center">
            <Title order={2} c="white">
              Senior Frontend Developer
            </Title>
            <Text>Posted: 21/02/2022</Text>
          </Flex>

          <Flex gap="xs" align="center">
            <CircleCheckIcon />
            <Text>Status: Active</Text>
            <Switch checked color="green" />
          </Flex>

          <Flex gap="xs" align="center">
            <JobDataSourceIcon />
            <Text>Source of Data: DefiLlama</Text>
          </Flex>

          <Box py={5}>
            <hr className="border-t border-white/10" />
          </Box>

          <Flex gap="md" align="center">
            <Button
              left={<TagIcon filename="level" />}
              className="cursor-default"
              kind="subtle"
            >
              <Text size="md">Level: Senior</Text>
            </Button>
            <Button
              left={<TagIcon filename="money" />}
              className="cursor-default"
              kind="subtle"
            >
              <Text size="md">Salary: $60-90K/Year</Text>
            </Button>
            <Button
              left={<TagIcon filename="location" />}
              className="cursor-default"
              kind="subtle"
            >
              <Text size="md">Remote</Text>
            </Button>
            <Button
              left={<TagIcon filename="users-three" />}
              className="cursor-default"
              kind="subtle"
            >
              <Text size="md">Team Size: 14</Text>
            </Button>
          </Flex>

          <Box py={5}>
            <hr className="border-t border-white/10" />
          </Box>

          <Stack spacing={10}>
            <Title order={4} c="white">
              Role
            </Title>
            <Text c="dimmed" size="md">
              As a Senior Frontend Engineer, you will help lead our team in
              building well-designed user experiences that are unique,
              trustworthy, and scalable across all frontend properties. You will
              also be given the opportunity to influence the direction, design,
              and execution of all future product experiences. We work in React,
              TypeScript, Elixir, Elm, Solidity, Rust, and are regularly pulling
              in functional programming languages and tools, forever learning
              and optimizing everything we make in the name of correct coding.
            </Text>
          </Stack>

          <Box py={5}>
            <hr className="border-t border-white/10" />
          </Box>

          <Stack spacing={10}>
            <Title order={4} c="white">
              Team
            </Title>
            <Text c="dimmed" size="md">
              We are a team of passionate, creative, and hardworking individuals
              who are dedicated to building the future of finance. We are a
              diverse group of people from all walks of life, with different
              backgrounds and experiences. We are united by our shared mission
              to create a more open, accessible, and fair financial system.
            </Text>
          </Stack>

          <Box py={5}>
            <hr className="border-t border-white/10" />
          </Box>

          <Stack spacing={10}>
            <Title order={4} c="white">
              Benefits
            </Title>
            <Text c="dimmed" size="md">
              Stock options, 3+ weeks of vacation, paid parental leave, full
              medical, dental, and vision insurance, company on-sites across the
              world, remote available
            </Text>
          </Stack>

          <Box py={5}>
            <hr className="border-t border-white/10" />
          </Box>

          <Stack spacing={10}>
            <Title order={4} c="white">
              Interview Process
            </Title>
            <Text c="dimmed" size="md">
              Once you&#39;ve applied, please be patient :) it may take us up to
              2-3 weeks to get back to you! Don&#39;t meet every single
              requirement? Studies have shown that women and people of color are
              less likely to apply to jobs unless they meet every single
              qualification. We are dedicated to building a diverse, inclusive
              and authentic workplace, so if you&#39;re excited about this role
              but your past experience doesn&#39;t align perfectly with every
              qualification in the job description, we encourage you to apply
              anyways.
            </Text>
          </Stack>

          <Box py={5}>
            <hr className="border-t border-white/10" />
          </Box>
        </Stack>
      </Paper>
    </Stack>
  </AdminLayout>
);

OrgJobsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgJobsPage;
