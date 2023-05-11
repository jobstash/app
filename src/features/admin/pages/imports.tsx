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
import { Prism } from '@mantine/prism';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { Button } from '~/shared/components';

import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [{ title: 'Imports', href: '/godmode/imports' }];

const jsonText = `{
  "raises": [
    {
      "date": 1567296000,
      "name": "Adhara",
      "round": "Seed",
      "amount": 2.5,
      "chains": [],
      "sector": "Real time global liquidity management, FX and international payments on CBDCs and tokenized money for banks and central banks",
      "category": "CeFi",
      "source": "https://nordic9.com/news/adhara-in-a-25-million-deal/",
      "leadInvestors": [],
      "otherInvestors": [
        "ConsenSys"
      ],
      "valuation": null
    },
    {
      "date": 1463270400,
      "name": "Jincor",
      "round": "Seed",
      "amount": 0.4,
      "chains": [],
      "sector": "Genuinely simple smart contracts and cryptocurrency transactions for any business.",
      "category": null,
      "leadInvestors": [],
      "otherInvestors": [],
      "valuation": null
    },
    {
      "date": 1666742400,
      "name": "Kollider",
      "round": "Seed",
      "amount": 2.4,
      "chains": [
        "Bitcoin"
      ],
      "sector": "",
      "category": null,
      "source": "https://twitter.com/CoinDesk/status/1585312996213014529 ",
      "leadInvestors": [
        "Lemniscap"
      ],
      "otherInvestors": [
        "Castle Island Ventures",
        "Polychain Capital",
        "Alameda Research",
        "Pfeffer Capital",
        "OKX"
      ],
      "valuation": null
    },
    {
      "date": 1503014400,
      "name": "Decentraland",
      "round": "ICO",
      "amount": 25,
      "chains": [
        "Ethereum"
      ],
      "sector": "Decentraland is a virtual reality platform that allows users to explore the metaverse and experience novelty.",
      "category": "Metaverse",
      "leadInvestors": [],
      "otherInvestors": [
        "Animoca Brands",
        "Boost VC",
        "Fabric Ventures",
        "Fundamental Labs",
        "Genesis One Capital",
        "George Burke",
        "INBlockchain",
        "Kosmos Ventures"
      ],
      "valuation": null
    },
    {
      "date": 1626912000,
      "name": "PlanetWatch",
      "round": null,
      "amount": 1.23,
      "chains": [],
      "sector": "Decentralizing and incentivizing environmental monitoring",
      "category": null,
      "leadInvestors": [],
      "otherInvestors": [],
      "valuation": null
    },
    {
      "date": 1660089600,
      "name": "CreatorDAO",
      "round": "Seed",
      "amount": 20,
      "chains": [],
      "sector": "DAO",
      "category": null,
      "source": "https://twitter.com/MichaelandMa/status/1556992840667889665",
      "leadInvestors": [
        "a16z",
        "Initialized Capital"
      ],
      "otherInvestors": [
        "Liquid 2 Ventures",
        "M13",
        "Audacious Ventures",
        "6th Man Ventures",
        "Abstract Ventures",
        "SV Angel",
        "Hack VC",
        "Fika Ventures",
        "Fuel Capital",
        "Goldhouse",
        "Soma Capital",
        "Alliance DAO",
        "Shima Capital",
        "Olive Capital",
        "Kygo's Palm Tree Crew",
        "MGU Capital",
        "Position Ventures",
        "Alchemy Ventures",
        "Paris Hilton",
        "The Chainsmokers",
        "Michael Ovtiz",
        "Liam Payne"
      ],
      "valuation": null
    },
    {
      "date": 1541635200,
      "name": "Cred",
      "round": "Debt Financing",
      "amount": 50,
      "chains": [],
      "sector": "Cred is a lending ecosystem that facilitates open access to credit anywhere and anytime based on the Ethereum blockchain.",
      "category": null,
      "leadInvestors": [],
      "otherInvestors": [],
      "valuation": null
    },
    {
      "date": 1524009600,
      "name": "CipherTrace",
      "round": null,
      "amount": 2.98,
      "chains": [],
      "sector": "CipherTrace is a cryptocurrency intelligence company that delivers delivers cryptocurrency AML compliance solutions.",
      "category": "Crypto Intelligence",
      "leadInvestors": [],
      "otherInvestors": [],
      "valuation": null
    }
  ]
}`;

const ImportsPage = () => (
  <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
    <Stack w="60%">
      <Paper radius="xl" p={30} pb={20} bg="rgba(255, 255, 255, 0.05)">
        <Stack spacing={30} w="100%">
          <Title order={2}>/Jobs/Jobs/JObzzzzz</Title>
          <Flex gap="md" align="center">
            <Box w="100%">
              <TextInput placeholder="Input ..." size="lg" radius="lg" />
            </Box>
            <Button variant="primary">
              <Text size="md">Execute</Text>
            </Button>
          </Flex>
          <Center>
            <Title order={4}>Output</Title>
          </Center>
          <Prism language="json">{jsonText}</Prism>
        </Stack>
      </Paper>
    </Stack>
  </AdminLayout>
);

ImportsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default ImportsPage;
