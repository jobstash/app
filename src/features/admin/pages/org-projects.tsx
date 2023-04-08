import { useRouter } from 'next/router';

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
import {
  ActiveUsersIcon,
  ArrowCircleUpRightIcon,
  Avatar,
  Button,
  CardHeading,
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

import { RefreshIcon } from '../components/icons/refresh-icon';
import { OrgSideNavs } from '../components/org-side-navs';
import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
  { title: 'My Projects', href: '/godmode/organizations/projects' },
];

const chains = [
  'Cardano ADA',
  'Cronos',
  'Dogecoin',
  'Ethereum ETH',
  'Huobi',
  'Litecoin LTC',
  'PancakeSwap CAKE',
  'Polygon',
  'Ripple XRP',
  'Shiba',
  'Solanart',
  'TRON',
  'Uniswap UNI',
  'USD Coin USDC',
];

const OrgProjectsPage = () => {
  const { push } = useRouter();

  const editOrgProject = (id: string) => {
    console.log('TODO: set as currentOrgProjectEdit:', id);
    push('/godmode/organizations/projects/edit');
  };

  return (
    <AdminLayout
      breadCrumbs={breadCrumbs}
      sideNav={<OrgSideNavs activeLabel="Projects" />}
    >
      <Stack w="55%" spacing={15} pt={15}>
        <Flex justify="end" gap="md" align="center">
          <Text>Projects: 1</Text>
          <ActionIcon variant="subtle">
            <RefreshIcon />
          </ActionIcon>
        </Flex>
        <Paper p={30} bg="rgba(255, 255, 255, 0.05)" radius="xl">
          <Stack spacing={20}>
            <Flex align="center" justify="space-between">
              <Flex gap="md" align="center">
                <Avatar
                  src="/orgs/projects/Uniswap V3.png"
                  alt="Uniswap Labs"
                  size="lg"
                />
                <CardHeading>Uniswap V3</CardHeading>
              </Flex>
              <Flex>
                {chains.map((chain) => (
                  <Avatar
                    key={chain}
                    src={`/chains/${chain}.png`}
                    alt={chain}
                    size="sm"
                  />
                ))}
              </Flex>
            </Flex>

            <Button left={<UsersThreeIcon />} variant="subtle">
              <Text>Source of Data: DefiLlama</Text>
            </Button>

            <hr className="border-t border-white/10" />

            <Stack>
              <Title order={4}>Description</Title>
              <MText color="dimmed" size="md">
                Uniswap v3 is the most powerful version of the protocol yet,
                with Concentrated Liquidity offering unprecedented capital
                efficiency for liquidity providers better execution for traders,
                and superior infrastructure at the heart of decentralized
                finance.
              </MText>
            </Stack>

            <hr className="border-t border-white/10" />

            <Flex gap="lg" wrap="wrap">
              <Button
                left={<CurrencyCircleDollarIcon />}
                right={<ArrowCircleUpRightIcon />}
              >
                Token: $UNI
              </Button>
              <Button left={<SuitcaseIcon />}>Jobs: 2</Button>
              <Button left={<GithubLogoIcon />}>Relevant Repos: 2</Button>
              <Button
                left={<CategoryIcon />}
                className="cursor-default"
                variant="subtle"
              >
                Category: DEX
              </Button>
              <Button
                left={<UsersThreeIcon />}
                className="cursor-default"
                variant="subtle"
              >
                Team Size: 12
              </Button>
              <Button
                left={<TvlIcon />}
                className="cursor-default"
                variant="subtle"
              >
                TVL: $99M
              </Button>
              <Button
                left={<MonthlyVolumeIcon />}
                className="cursor-default"
                variant="subtle"
              >
                Monthly Volume: $14K
              </Button>
              <Button
                left={<ActiveUsersIcon />}
                className="cursor-default"
                variant="subtle"
              >
                Active Users: 23K
              </Button>
              <Button
                left={<RevenueIcon />}
                className="cursor-default"
                variant="subtle"
              >
                Revenue: $590K
              </Button>
            </Flex>

            <hr className="border-t border-white/10" />

            <Stack>
              <Title order={4}>Audits</Title>
              <Flex gap="lg" wrap="wrap">
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
              </Flex>

              <hr className="border-t border-white/10" />

              <Flex gap="lg" align="center" justify="space-between">
                <Button
                  variant="primary"
                  onClick={() => editOrgProject('some-id')}
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
      </Stack>
    </AdminLayout>
  );
};

OrgProjectsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgProjectsPage;
