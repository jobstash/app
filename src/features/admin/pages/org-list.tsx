import { useRouter } from 'next/router';

import { Flex, Paper, Stack, Title } from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import {
  Avatar,
  Button,
  CardHeading,
  SkillHolder,
  TagIcon,
  Text,
} from '~/shared/components';
import { numFormatter, prettyTimestamp, slugify } from '~/shared/utils';

import { useOrgList } from '../hooks/use-org-list';
import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
];

const OrgListPage = () => {
  const { push } = useRouter();

  const editOrg = (name: string, id: string) => {
    push(`/godmode/organizations/${slugify(`${name}-${id}`)}/edit`);
  };

  const { data, isLoading } = useOrgList();

  if (isLoading || !data) return <EmptyPage isLoading />;

  return (
    <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
      <Stack w="60%" spacing={45}>
        {data.map(
          ({
            id,
            name,
            logo,
            location,
            jobCount,
            projectCount,
            headCount,
            lastFundingAmount,
            lastFundingDate,
            technologies,
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
                <Button
                  kind="primary"
                  size="lg"
                  onClick={() => editOrg(name, id)}
                >
                  <Text fw="semibold">View as Organization</Text>
                </Button>
              </Flex>
              <Paper radius="xl" p={30} pb={20} bg="rgba(255, 255, 255, 0.05)">
                <Stack spacing={20}>
                  <Flex justify="space-between" align="center">
                    <Flex gap="md">
                      {logo && <Avatar src={logo} alt={name} size="lg" />}
                      <Stack spacing={0}>
                        <CardHeading>{name}</CardHeading>
                        <Text color="dimmed">{location}</Text>
                      </Stack>
                    </Flex>
                    <Text>TBD</Text>
                  </Flex>

                  <hr className="border-t border-white/10" />

                  <Flex gap="md" wrap="wrap">
                    <Button
                      left={<TagIcon filename="baggage-2" />}
                      kind="subtle"
                      className="cursor-default"
                    >
                      Jobs: {jobCount}
                    </Button>
                    <Button
                      left={<TagIcon filename="code" />}
                      kind="subtle"
                      className="cursor-default"
                    >
                      Projects: {projectCount}
                    </Button>
                    <Button
                      left={<TagIcon filename="users-three" />}
                      kind="subtle"
                      className="cursor-default"
                    >
                      Employees: {headCount}
                    </Button>

                    {lastFundingAmount > 0 && (
                      <Button
                        left={<TagIcon filename="money" />}
                        kind="subtle"
                        className="cursor-default"
                      >
                        {`Last Funding: $${numFormatter.format(
                          lastFundingAmount,
                        )}`}
                      </Button>
                    )}

                    {lastFundingDate > 0 && (
                      <Button
                        left={<TagIcon filename="funding" />}
                        kind="subtle"
                        className="cursor-default"
                      >
                        Funding Date: {prettyTimestamp(lastFundingDate)}
                      </Button>
                    )}
                  </Flex>

                  <hr className="border-t border-white/10" />

                  <Flex gap="md">
                    {technologies.map(({ id, name }) => (
                      <SkillHolder key={id}>{name}</SkillHolder>
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

OrgListPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgListPage;
