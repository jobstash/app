import { ActionIcon, Box, Center, Flex, Table } from '@mantine/core';

import { ApprovalsSideNavs } from '../components/approvals-side-navs';
import { CircleCheckIcon } from '../components/icons/circle-check-icon';
import { CircleXIcon } from '../components/icons/circle-x-icon';
import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Approvals', href: '#' },
  { title: 'Organizations', href: '/godmode/approvals/organizations' },
];

const data = [
  {
    date: '21/02/2023',
    orgName: 'Uniswap Labs',
    website: 'https://uniswap.org',
    wallet: '0xc37...2192',
    email: 'DevoorPerson@gmail.com',
    github: '0xDevoor',
  },
  {
    date: '21/02/2023',
    orgName: 'Ultrasound Money',
    website: 'https://Ultrasound Money.org',
    wallet: '0xc37...2192',
    email: 'JohnSmithTheThirdFromTheBlock@gmail.com',
    github: 'Kroomin',
  },
  {
    date: '21/02/2023',
    orgName: 'Some Random Punk NFT',
    website: 'https://SomeRandomPunkNFT.org',
    wallet: '0xc37...2192',
    email: '0xc37...2192',
    github: 'Landmver',
  },
  {
    date: '21/02/2023',
    orgName: 'Ultrasound Money 2',
    website: 'https://Ultrasound Money.org',
    wallet: '0xc37...2192',
    email: 'JohnSmithTheThirdFromTheBlock@gmail.com',
    github: 'Kroomin',
  },
  {
    date: '21/02/2023',
    orgName: 'Some Random Punk NFT 2',
    website: 'https://SomeRandomPunkNFT.org',
    wallet: '0xc37...2192',
    email: '0xc37...2192',
    github: 'Landmver',
  },
];

export const ApprovalsOrgsPage = () => {
  const rows = data.map((d, i) => (
    <tr
      key={d.orgName}
      className={i % 2 === 0 ? 'bg-transparent' : 'bg-zinc-800'}
    >
      <td>{d.date}</td>
      <td>{d.orgName}</td>
      <td>{d.website}</td>
      <td>{d.wallet}</td>
      <td>{d.email}</td>
      <td>{d.github}</td>
      <td>
        <Flex justify="center" align="center" gap="lg">
          <ActionIcon>
            <CircleCheckIcon />
          </ActionIcon>
          <Box mt={3}>
            <ActionIcon>
              <CircleXIcon />
            </ActionIcon>
          </Box>
        </Flex>
      </td>
    </tr>
  ));

  return (
    <AdminLayout
      breadCrumbs={breadCrumbs}
      sideNav={<ApprovalsSideNavs activeLabel="Organizations" />}
    >
      <Box w="100%" pt={30}>
        <Table
          withBorder
          verticalSpacing="lg"
          horizontalSpacing="md"
          fontSize="md"
          sx={{ borderRadius: 8 }}
        >
          <thead className="bg-zinc-800">
            <tr>
              <th>Date</th>
              <th>Org Name</th>
              <th>Website</th>
              <th>Wallet ID</th>
              <th>Personal Email</th>
              <th>Github</th>
              <th>
                <Center>Approval</Center>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
    </AdminLayout>
  );
};
