import {
  ActionIcon,
  Box,
  Button as MButton,
  Flex,
  Grid,
  Highlight,
  LoadingOverlay,
  MultiSelect,
  Paper,
  Select,
  Stack,
  Switch,
  Tabs,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import clsx from 'clsx';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { TagIcon } from '~/shared/components';

import { ApprovalsSideNavs } from '../components/approvals-side-navs';
import { CircleCheckIcon } from '../components/icons/circle-check-icon';
import { JobDataSourceIcon } from '../components/icons/job-data-source-icon';
import { RefreshIcon } from '../components/icons/refresh-icon';
import { TechBlockedIcon } from '../components/icons/tech-blocked-icon';
import { TechCircleXIcon } from '../components/icons/tech-circle-x-icon';
import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Approvals', href: '#' },
  { title: 'Jobs', href: '/godmode/approvals/jobs' },
];

const techs = [
  {
    name: 'TIME MANAGEMENT',
    isActive: false,
    isBlocked: true,
    synonyms: ['PROJECT MANAGEMENT', 'SCRUM'],
  },
  {
    name: 'JAVASCRIPT',
    isActive: true,
    isBlocked: false,
    synonyms: ['JS', 'Jscript', 'Ecmascript'],
  },
  {
    name: 'JS',
    isActive: false,
    isBlocked: false,
    synonyms: ['Javascript', 'Jscript', 'Ecmascript'],
  },
  {
    name: 'PROJECT MANAGEMENT',
    isActive: false,
    isBlocked: false,
    synonyms: ['TIME MANAGEMENT', 'SCRUM'],
  },
  {
    name: 'SCRUM',
    isActive: false,
    isBlocked: false,
    synonyms: ['TIME MANAGEMENT', 'PROJECT MANAGEMENT'],
  },
  {
    name: 'READING',
    isActive: false,
    isBlocked: true,
    synonyms: [],
  },
  {
    name: 'PLANNING',
    isActive: false,
    isBlocked: true,
    synonyms: [],
  },
  {
    name: 'DANCING',
    isActive: false,
    isBlocked: true,
    synonyms: [],
  },
  {
    name: 'LOL',
    isActive: false,
    isBlocked: true,
    synonyms: [],
  },
];

const ApprovalsJobsPage = () => (
  <AdminLayout
    breadCrumbs={breadCrumbs}
    sideNav={<ApprovalsSideNavs activeLabel="Jobs" />}
  >
    <Stack w="60%" spacing={15} pt={20}>
      <Flex justify="end" gap="md" align="center">
        <Text>Jobs: 4</Text>
        <ActionIcon variant="subtle">
          <RefreshIcon />
        </ActionIcon>
      </Flex>
      <Tabs defaultValue="details" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="details">Details</Tabs.Tab>
          <Tabs.Tab value="synonyms">Synonyms</Tabs.Tab>
          <Tabs.Tab value="blocked">Blocked Terms</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="details" pl={20}>
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

              {/* <Flex gap="md" align="center">
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
              </Flex> */}

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
                  trustworthy, and scalable across all frontend properties. You
                  will also be given the opportunity to influence the direction,
                  design, and execution of all future product experiences. We
                  work in React, TypeScript, Elixir, Elm, Solidity, Rust, and
                  are regularly pulling in functional programming languages and
                  tools, forever learning and optimizing everything we make in
                  the name of correct coding.
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
                  We are a team of passionate, creative, and hardworking
                  individuals who are dedicated to building the future of
                  finance. We are a diverse group of people from all walks of
                  life, with different backgrounds and experiences. We are
                  united by our shared mission to create a more open,
                  accessible, and fair financial system.
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
                  medical, dental, and vision insurance, company on-sites across
                  the world, remote available
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
                  Once you&#39;ve applied, please be patient :) it may take us
                  up to 2-3 weeks to get back to you! Don&#39;t meet every
                  single requirement? Studies have shown that women and people
                  of color are less likely to apply to jobs unless they meet
                  every single qualification. We are dedicated to building a
                  diverse, inclusive and authentic workplace, so if you&#39;re
                  excited about this role but your past experience doesn&#39;t
                  align perfectly with every qualification in the job
                  description, we encourage you to apply anyways.
                </Text>
              </Stack>

              <Box py={5}>
                <hr className="border-t border-white/10" />
              </Box>
            </Stack>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="synonyms" pl={20}>
          <Paper p={40} bg="rgba(255, 255, 255, 0.05)" radius="xl">
            <Stack spacing={30}>
              <Flex wrap="wrap" gap="lg">
                {techs.map(({ name, isActive }) => (
                  <div
                    key={name}
                    className={clsx(
                      'flex cursor-pointer items-center justify-center gap-x-1 rounded-lg border border-zinc-600 p-2 hover:opacity-90',
                      {
                        'bg-gradient-to-l from-primary to-secondary': isActive,
                      },
                    )}
                    onClick={() => console.log('TODO: set active')}
                  >
                    <div
                      className={clsx(
                        'border p-2',
                        { 'border-white': isActive },
                        { 'border-[#A6A0FF] ': !isActive },
                      )}
                    >
                      <Text
                        c={isActive ? 'white' : '#A6A0FF'}
                        size="sm"
                        fw="bold"
                      >
                        {name}
                      </Text>
                    </div>
                    <ActionIcon
                      ml={3}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('TODO: remove from terms');
                      }}
                    >
                      <TechCircleXIcon />
                    </ActionIcon>
                    <div className="cursor-default">
                      <Tooltip label="This term is blocked" color="red">
                        <TechBlockedIcon />
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </Flex>
              <hr className="border-t border-white/20" />

              <Paper
                withBorder
                radius="lg"
                px={45}
                pt={45}
                pb={30}
                pos="relative"
                bg="none"
              >
                <LoadingOverlay visible={false} />
                <Stack spacing={30}>
                  <Grid align="center">
                    <Grid.Col span={2}>
                      <Text size="lg" fw="bold">
                        Primary Term
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={10}>
                      <Select
                        searchable
                        clearable
                        data={techs.map(({ name }) => name)}
                        placeholder="Pick one term"
                        maxDropdownHeight={320}
                        nothingFound="Nothing found"
                        size="lg"
                      />
                    </Grid.Col>
                  </Grid>
                  <Grid align="center">
                    <Grid.Col span={2}>
                      <Text size="lg" fw="bold">
                        List of Synonyms
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={10}>
                      <MultiSelect
                        searchable
                        data={techs.map(({ name }) => name)}
                        placeholder="Search and pick terms here"
                        maxDropdownHeight={320}
                        nothingFound="Nothing found"
                        size="lg"
                      />
                    </Grid.Col>
                  </Grid>
                  <Flex w="full" justify="flex-end" align="center">
                    <MButton radius="md" size="md" variant="default">
                      Submit
                    </MButton>
                  </Flex>
                </Stack>
              </Paper>
            </Stack>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="blocked" pl={20}>
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
                  data={techs.map(({ name }) => name)}
                  placeholder="Search or add new blocked-terms here"
                  maxDropdownHeight={320}
                  size="lg"
                />
              </div>
              <MButton radius="md" size="md" variant="default">
                Submit
              </MButton>
            </Flex>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  </AdminLayout>
);

ApprovalsJobsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default ApprovalsJobsPage;
