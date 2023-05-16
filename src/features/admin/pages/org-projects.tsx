import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  ActionIcon,
  Button as MButton,
  Flex,
  Paper,
  Stack,
  Text as MText,
  Title,
} from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import EmptyPage from '~/features/auth/pages/empty-page';
import {
  ActiveUsersIcon,
  ArrowCircleUpRightIcon,
  Avatar,
  Button,
  CardHeading,
  CardSet,
  CategoryIcon,
  CurrencyCircleDollarIcon,
  GithubLogoIcon,
  MonthlyVolumeIcon,
  RevenueIcon,
  ShieldCheckIcon,
  SuitcaseIcon,
  Text,
  TvlIcon,
  UsersThreeIcon,
} from '~/shared/components';
import { numFormatter, slugify, unslugify } from '~/shared/utils';

import { fetchOrgProjects } from '../api/fetch-org-projects';
import { RefreshIcon } from '../components/icons/refresh-icon';
import { OrgSideNavs } from '../components/org-side-navs';
import { useOrgProjects } from '../hooks/use-org-projects';
import { AdminLayout } from '../layouts/admin-layout';

const OrgProjectsPage = () => {
  const { push, query, asPath } = useRouter();

  const splitIndex = (query.orgSegment as string).lastIndexOf('-');
  const orgName = (query.orgSegment as string).slice(0, splitIndex);
  const orgId = (query.orgSegment as string).slice(splitIndex + 1);
  const keySegment = slugify(`${orgName} ${orgId}`);

  const { data, isLoading, error, refetch } = useOrgProjects(orgId);

  if (!data || isLoading) return <EmptyPage isLoading />;

  if (error) return <pre>{JSON.stringify(error, undefined, '\t')}</pre>;

  const breadCrumbs = [
    { title: 'Organizations', href: '/godmode/organizations' },
    {
      title: unslugify(orgName),
      href: `/godmode/organizations/${keySegment}/edit`,
    },
    {
      title: 'Projects',
    },
  ];

  return (
    <AdminLayout
      breadCrumbs={breadCrumbs}
      sideNav={<OrgSideNavs keySegment={keySegment} activeLabel="Projects" />}
    >
      <Stack w="55%" spacing={15} pt={15}>
        <Flex justify="end" gap="md" align="center">
          <Text>{`Projects: ${data.length}`}</Text>
          <ActionIcon variant="subtle" onClick={() => refetch()}>
            <RefreshIcon />
          </ActionIcon>
        </Flex>

        {data.map(
          ({
            id,
            logo,
            name,
            url,
            description,
            tokenSymbol,
            category,
            teamSize,
            tvl,
            monthlyVolume,
            monthlyActiveUsers,
            monthlyFees,
            monthlyRevenue,
          }) => (
            <Paper key={id} p={30} bg="rgba(255, 255, 255, 0.05)" radius="xl">
              <Stack spacing={20}>
                <Flex align="center" justify="space-between">
                  <Flex gap="md" align="center">
                    <Avatar
                      src={
                        logo.length > 0
                          ? logo
                          : `https://www.google.com/s2/favicons?domain=${url}&sz=128`
                      }
                      alt={name}
                      size="lg"
                    />
                    <CardHeading>{name}</CardHeading>
                  </Flex>
                  <Flex>
                    {/* {chains.map((chain) => (
                    <Avatar
                      key={chain}
                      src={`/chains/${chain}.png`}
                      alt={chain}
                      size="sm"
                    />
                  ))} */}
                    <p>{`TODO: <ChainAvatars />`}</p>
                  </Flex>
                </Flex>

                <Button left={<UsersThreeIcon />} variant="subtle">
                  <Text>Source of Data: DefiLlama</Text>
                </Button>

                <hr className="border-t border-white/10" />

                <Stack>
                  <Title order={4}>Description</Title>
                  <MText color="dimmed" size="md">
                    {description}
                  </MText>
                </Stack>

                <hr className="border-t border-white/10" />

                <Flex gap="lg" wrap="wrap" align="center">
                  {tokenSymbol && (
                    <CardSet icon={<CurrencyCircleDollarIcon />} link={url}>
                      {`Token: $${tokenSymbol}`}
                    </CardSet>
                  )}
                  <CardSet icon={<SuitcaseIcon />}>Jobs: TBD</CardSet>
                  <CardSet icon={<GithubLogoIcon />}>
                    Relevant Repos: TBD
                  </CardSet>
                  <CardSet icon={<CategoryIcon />}>
                    {`Category: ${category}`}
                  </CardSet>
                  {}
                  {teamSize && (
                    <CardSet icon={<UsersThreeIcon />}>
                      {`Team Size: ${teamSize}`}
                    </CardSet>
                  )}
                  {tvl && (
                    <CardSet icon={<TvlIcon />}>{`TVL: $${numFormatter.format(
                      tvl,
                    )}`}</CardSet>
                  )}
                  {monthlyVolume && (
                    <CardSet
                      icon={<MonthlyVolumeIcon />}
                    >{`Monthly Volume: $${numFormatter.format(
                      monthlyVolume,
                    )}`}</CardSet>
                  )}
                  {monthlyActiveUsers && (
                    <CardSet
                      icon={<MonthlyVolumeIcon />}
                    >{`Active Users: $${numFormatter.format(
                      monthlyActiveUsers,
                    )}`}</CardSet>
                  )}
                  {monthlyFees && (
                    <CardSet
                      icon={<MonthlyVolumeIcon />}
                    >{`Monthly Fees: $${numFormatter.format(
                      monthlyFees,
                    )}`}</CardSet>
                  )}
                  {(monthlyRevenue ?? 0) > 10 && (
                    <CardSet
                      icon={<RevenueIcon />}
                    >{`Monthly Revenue: $${numFormatter.format(
                      monthlyRevenue ?? 0,
                    )}`}</CardSet>
                  )}
                </Flex>

                <hr className="border-t border-white/10" />

                <Stack>
                  <Title order={4}>TODO: Audits</Title>
                  {/* <Flex gap="lg" wrap="wrap">
                    <Button
                      left={<ShieldCheckIcon />}
                      right={<ArrowCircleUpRightIcon />}
                    >
                      SigmaPrime
                    </Button>
                    <Button
                      left={<ShieldCheckIcon />}
                      right={<ArrowCircleUpRightIcon />}
                    >
                      Chainsecurity
                    </Button>
                    <Button
                      left={<ShieldCheckIcon />}
                      right={<ArrowCircleUpRightIcon />}
                    >
                      Mixbytes
                    </Button>
                  </Flex> */}

                  <hr className="border-t border-white/10" />

                  <Flex gap="lg" align="center" justify="space-between">
                    <Button
                      variant="primary"
                      onClick={() =>
                        push(`${asPath}/${slugify(name + ' ' + id)}/details`)
                      }
                    >
                      <MText fw="bold">Edit Project</MText>
                    </Button>
                    <MButton variant="outline" color="red">
                      Delete Project
                    </MButton>
                  </Flex>
                </Stack>
              </Stack>
            </Paper>
          ),
        )}
      </Stack>
    </AdminLayout>
  );
};

OrgProjectsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgProjectsPage;
