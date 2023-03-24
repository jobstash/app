import { useRouter } from 'next/router';

import { Flex, Paper, Stack, Title } from '@mantine/core';

import {
  Avatar,
  Button,
  CardHeading,
  SkillHolder,
  TagIcon,
  Text,
} from '~/shared/components';
import { numFormatter } from '~/shared/utils';

import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
];

const data = [
  {
    id: '0',
    name: 'Uniswap Labs',
    location: 'NYC, USA',
    avatar: '/orgs/Uniswap Labs.png',
    jobs: 2,
    projects: 1,
    employees: 9,
    lastFunding: 300_000,
    fundingDate: '21 Nov, 2021',
    ts: '3 days ago',
    tech: ['REACT', 'WEBGL', 'TYPESCRIPT'],
  },
  {
    id: '1',
    name: '1inch Network',
    location: 'Boston, USA',
    avatar: '/orgs/1Inch Network.png',
    jobs: 1,
    projects: 1,
    employees: 3,
    ts: '4 days ago',
    tech: ['DOCKER', 'SOLIDITY', 'HTML', 'TYPESCRIPT', 'WEBGL'],
  },
  {
    id: '2',
    name: 'Balancer',
    location: 'Lisbon, Portugal',
    avatar: '/orgs/Balancer.png',
    jobs: 3,
    projects: 1,
    employees: 10,
    ts: '5 days ago',
    tech: ['REACT', 'TYPESCRIPT', 'DOCKER', 'C++', 'PYTHON', 'SOLIDITY'],
  },
];

export const OrgListPage = () => {
  const { push } = useRouter();

  const editOrg = (id: string) => {
    console.log('TODO: set as currentOrgEdit:', id);
    push('/godmode/organizations/edit');
  };

  return (
    <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
      <Stack w="60%" spacing={45}>
        {data.map(
          ({
            id,
            name,
            avatar,
            location,
            ts,
            jobs,
            projects,
            employees,
            lastFunding,
            fundingDate,
            tech,
          }) => (
            <Stack
              key={id}
              spacing={30}
              p={30}
              pos="relative"
              sx={{
                border: '2px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 10,
              }}
            >
              <Flex justify="space-between" align="center">
                <Title order={4}>{name}</Title>
                <Button kind="primary" size="lg" onClick={() => editOrg(id)}>
                  <Text fw="semibold">View as Organization</Text>
                </Button>
              </Flex>
              <Paper radius="xl" p={30} pb={20} bg="rgba(255, 255, 255, 0.05)">
                <Stack spacing={20}>
                  <Flex justify="space-between" align="center">
                    <Flex gap="md">
                      <Avatar src={avatar} alt={name} size="lg" />
                      <Stack spacing={0}>
                        <CardHeading>{name}</CardHeading>
                        <Text color="dimmed">{location}</Text>
                      </Stack>
                    </Flex>
                    <Text>{ts}</Text>
                  </Flex>

                  <hr className="border-t border-white/10" />

                  <Flex gap="md">
                    <Button left={<TagIcon filename="baggage-2" />}>
                      Jobs: {jobs}
                    </Button>
                    <Button left={<TagIcon filename="code" />}>
                      Projects: {projects}
                    </Button>
                    <Button
                      left={<TagIcon filename="users-three" />}
                      kind="subtle"
                      className="cursor-default"
                    >
                      Employees: {employees}
                    </Button>
                    {lastFunding && (
                      <Button
                        left={<TagIcon filename="money" />}
                        kind="subtle"
                        className="cursor-default"
                      >
                        {`Last Funding: $${numFormatter.format(lastFunding)}`}
                      </Button>
                    )}
                    {fundingDate && (
                      <Button
                        left={<TagIcon filename="funding" />}
                        kind="subtle"
                        className="cursor-default"
                      >
                        Funding Date: {fundingDate}
                      </Button>
                    )}
                  </Flex>

                  <hr className="border-t border-white/10" />

                  <Flex gap="md">
                    {tech.map((tech) => (
                      <SkillHolder key={tech}>{tech}</SkillHolder>
                    ))}
                  </Flex>
                </Stack>
              </Paper>
            </Stack>
          ),
        )}
      </Stack>
    </AdminLayout>
  );
};
