import { useRouter } from 'next/router';

import { Flex, Paper, Stack, Title } from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import {
  Avatar,
  BankIcon,
  Button,
  CardHeading,
  CodeIcon,
  MoneyIcon,
  SkillHolder,
  SuitcaseIcon,
  Text,
  UsersThreeIcon,
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
            <Paper
              key={id}
              radius="xl"
              p={30}
              pb={20}
              bg="rgba(255, 255, 255, 0.05)"
            >
              <Stack spacing={20}>
                <Flex justify="space-between" align="center">
                  <Flex gap="md">
                    {logo && <Avatar src={logo} alt={name} />}
                    <Stack spacing={0}>
                      <CardHeading>{name}</CardHeading>
                      <Text color="dimmed">{location}</Text>
                    </Stack>
                  </Flex>
                  <Button variant="primary" onClick={() => editOrg(name, id)}>
                    <Text fw="semibold">Edit Organization</Text>
                  </Button>
                </Flex>

                <hr className="border-t border-white/10" />

                <Flex gap="md" wrap="wrap">
                  <Button
                    left={<SuitcaseIcon />}
                    variant="subtle"
                    className="cursor-default"
                  >
                    Jobs: {jobCount}
                  </Button>
                  <Button
                    left={<CodeIcon />}
                    variant="subtle"
                    className="cursor-default"
                  >
                    Projects: {projectCount}
                  </Button>
                  <Button
                    left={<UsersThreeIcon />}
                    variant="subtle"
                    className="cursor-default"
                  >
                    Employees: {headCount}
                  </Button>

                  {lastFundingAmount > 0 && (
                    <Button
                      left={<MoneyIcon />}
                      variant="subtle"
                      className="cursor-default"
                    >
                      {`Last Funding: $${numFormatter.format(
                        lastFundingAmount,
                      )}`}
                    </Button>
                  )}

                  {lastFundingDate > 0 && (
                    <Button
                      left={<BankIcon />}
                      variant="subtle"
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
          ),
        )}
      </Stack>
    </AdminLayout>
  );
};

OrgListPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgListPage;
