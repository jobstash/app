import { sonnerToast } from '@jobstash/shared/utils';

import {
  ArrowCircleUpIcon,
  Button,
  CopyIcon,
  EthereumIcon,
  Heading,
  PageWrapper,
  Text,
} from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { ArbitrumSvg } from './arbitrum-svg';
import DonateDataList from './donate-data-list';
import { EthFoundationSvg } from './eth-foundation-svg';
import { HandIconSvg } from './hand-icon-svg';
import { HandsReachingSvg } from './hands-reaching-svg';
import { OptimismSvg } from './optimism-svg';

const walletAddress = '0xf071e75C56eD5B162B5cb5e9D30d752BcD663f2D';
const givethLink = 'https://giveth.io/donate/jobstash';
const etherscanLink = `https://etherscan.io/address/${walletAddress}`;

export const DonatePage = () => {
  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      sonnerToast({
        title: 'Copied to clipboard!',
        message: 'Wallet address has been copied.',
      });
    } catch (error) {
      console.error('Failed to copy wallet address:', error);
      sonnerToast({
        title: 'Failed to copy',
        message: 'Please try again.',
      });
    }
  };

  return (
    <PageWrapper>
      <SideBar />
      <div className="flex flex-col gap-16 p-8 lg:p-12">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <HandIconSvg />
            <Heading className="md:text-3xl lg:text-4xl">Donate</Heading>
          </div>
          <Text color="dimmed" className="leading-relaxed">
            Jobstash started with a mission to democratize access to Web3
            opportunities. We decided to build the platform as a public good,
            because we want everyone to have free access to quality job
            opportunities in the Web3 ecosystem, connecting talent with
            innovative projects.
          </Text>
        </div>

        <div className="flex flex-col gap-y-4">
          <Heading size="lg" fw="semibold">
            Ways to Donate to Us
          </Heading>
          <Text color="dimmed" className="leading-relaxed">
            You can donate anytime by sending tokens to one of our following
            wallets:
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="flex flex-col gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl flex-1">
              <div className="flex items-center gap-2">
                <EthereumIcon className="stroke-2 h-5 w-5" />
                <Text fw="medium">
                  Donate to our wallet on any Ethereum compatible wallet.
                </Text>
              </div>
              <div className="flex flex-col gap-2">
                <Text
                  size="sm"
                  className="pl-1 font-mono text-white/70 break-all"
                >
                  {walletAddress}
                </Text>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    left={<CopyIcon className="w-4 h-4" />}
                    onClick={handleCopyWallet}
                  >
                    Copy Address
                  </Button>
                  <Button
                    variant="outline"
                    left={<ArrowCircleUpIcon className="w-4 h-4" />}
                    onClick={() => window.open(etherscanLink, '_blank')}
                  >
                    View on Etherscan
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl flex-1">
              <Text fw="medium">Donate on our Giveth page</Text>
              <Text size="sm" className="text-white/70">
                Support us through the Giveth platform for transparent
                charitable giving.
              </Text>
              <Button
                variant="primary"
                right={<ArrowCircleUpIcon className="w-4 h-4" />}
                className="mt-auto"
                onClick={() => window.open(givethLink, '_blank')}
              >
                Contribute to Giveth
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <HandIconSvg />
            <Heading className="md:text-3xl lg:text-4xl">Impact</Heading>
          </div>
          <Text color="dimmed" className="leading-relaxed">
            Jobstash data and insights are used by developers, organizations,
            and job seekers across the Web3 ecosystem. Our main focus is to
            cater towards talented individuals seeking opportunities and
            organizations looking to build exceptional teams in Web3. Therefore
            we support everyone who helps us achieve this mission.
          </Text>
        </div>

        <div className="flex flex-col gap-y-3">
          <Heading size="lg" fw="semibold">
            Public use of our data and visualizations
          </Heading>
          <Text color="dimmed" className="leading-relaxed">
            The following people and institutions mention us or use our data
            regularly, free of charge:
          </Text>
          <DonateDataList data={publicUseData} />
        </div>

        <div className="flex flex-col gap-y-3">
          <Heading size="lg" fw="semibold">
            Platform Updates
          </Heading>
          <Text color="dimmed" className="leading-relaxed">
            Our public change log. A list with bigger feature releases and their
            announcements. We keep building!
          </Text>
          <DonateDataList data={platformUpdatesData} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <HandsReachingSvg />
            <Heading className="md:text-3xl lg:text-4xl">Support</Heading>
          </div>
          <Text color="dimmed" className="leading-relaxed">
            We received grants from the following partners, communities or
            foundations.
          </Text>
          <div className="flex gap-12 items-center pl-4 py-4">
            <ArbitrumSvg />
            <EthFoundationSvg />
            <OptimismSvg />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

const publicUseData = [
  {
    title: 'Vitalik Buterin - Scaling Ethereum L1 and L2s in 2025 and beyond',
    link: 'vitalik.eth.limo/general/2025/01/23/l1l2future.html',
    date: '2025/01/23',
  },
  {
    title: 'Vitalik Buterin - Layer 2 Fees',
    link: 'x.com/VitalikButerin/status/1835470870221124065',
    date: '2024/09/16',
  },
  {
    title: 'Bankless - Ethereum L2 Token Thesis',
    link: 'youtube.com/watch?v=cd4yUnX3fnw',
    date: '2024/01/17',
  },
  {
    title: 'The Daily Gwei - Contract Labeling',
    link: 'youtube.com/watch?v=yRjsyh27E1k?si=HJX-3qV8Yq0ZlMXE&t=1689',
    date: '2024/08/02',
  },
  {
    title: 'Bankless Episode',
    link: 'youtube.com/watch?v=Fs3gLOcqxco?si=kYvQRCW3k8pNlPvm&t=745',
    date: '2024/10/04',
  },
  {
    title: 'Blockworks - ZKsync Elastic Chain Rebrand',
    link: 'blockworks.co/news/zk-sync-elastic-chain-rebrand-seeks-to-carve-out-scaling-niche',
    date: '2024/07/04',
  },
  {
    title: 'Coinbase Institutional - ETH and the Rise of L2s',
    link: 'coinbase.com/en-de/institutional/research-insights/research/market-intelligence/e...',
    date: '2023/08/13',
  },
  {
    title:
      'Cointelegraph - Ethereum L2 ecosystem processes a record 12.4M transac...',
    link: 'cointelegraph.com/news/ethereum-l2-ecosystem-processes-a-record-12-4-m-trans...',
    date: '2024/08/14',
  },
];

export const platformUpdatesData = [
  {
    title: 'Enhanced job matching algorithm for Web3 roles',
    link: 'x.com/jobstash/status/1879903540090687608',
    date: '2025/01/16',
  },
  {
    title: 'Integration with major L2 ecosystem job boards',
    link: 'x.com/jobstash/status/1879162621435446463',
    date: '2025/01/14',
  },
  {
    title: 'Launch of developer profile verification system',
    link: 'x.com/jobstash/status/1869728221018952190',
    date: '2024/12/19',
  },
  {
    title: 'New salary transparency features',
    link: 'x.com/jobstash/status/1851991565272563766',
    date: '2024/10/31',
  },
  {
    title: 'Job seeker dashboard improvements',
    link: 'x.com/jobstash/status/1849088312775854669',
    date: '2024/10/22',
  },
  {
    title: 'Partnership with leading Web3 organizations',
    link: 'x.com/jobstash/status/1848368866776244368',
    date: '2024/10/21',
  },
  {
    title: 'Launch of remote work filter features',
    link: 'x.com/jobstash/status/1845801743491190899',
    date: '2024/10/14',
  },
  {
    title: 'Introduction of skill-based job recommendations',
    link: 'x.com/jobstash/status/1841456858256527665',
    date: '2024/10/02',
  },
  {
    title: 'Improved application tracking system',
    link: 'x.com/jobstash/status/1831327443440380603',
    date: '2024/09/04',
  },
];
