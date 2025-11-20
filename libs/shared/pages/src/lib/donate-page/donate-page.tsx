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
            <strong className="text-red-500">
              JobStash is facing a critical moment. After 3 years of serving the
              ecosystem as a public good, our grant funding has been exhausted,
              and we are at risk of shutting down.
            </strong>
            <br />
            <br />
            We have proudly supported the community for free, delivering over 1M
            pageviews, helping 150k users find unique and otherwise undiscoverable opportunities across 25k job
            posts at over 1.5k companies.
            This was built on 20k engineering hours and pure dedication to the
            space.
            <br />
            <br />
            To continue this mission, we now urgently need your support. If
            JobStash has brought value to you or your company, please consider
            contributing to keep this public good alive.
          </Text>
          <img
            src="/stats/stats-all-time.png"
            alt="JobStash Stats: 1M Views"
            className="rounded-xl border border-white/10 w-full max-w-2xl"
          />
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
    title: 'Web3SecNews - Jobs',
    link: 'https://www.web3sec.news/jobs',
    date: '2023/01/01',
  },
  {
    title: 'CryptoNomads - Jobs',
    link: 'https://cryptonomads.org/jobs',
    date: '2025/02/01',
  }
];

export const platformUpdatesData = [
  {
    title: 'Pricing Structure Updates',
    link: 'https://x.com/jobstash',
    date: '2025/11/20',
  },
  {
    title: 'Profile Expert Status Section',
    link: 'https://x.com/jobstash',
    date: '2025/08/28',
  },
  {
    title: 'Ethereum Season of Internships Highlight',
    link: 'https://x.com/jobstash',
    date: '2025/06/25',
  },
  {
    title: 'Crypto-Native Profile Properties',
    link: 'https://x.com/jobstash',
    date: '2025/03/21',
  },
  {
    title: 'UI Framework Migration to HeroUI',
    link: 'https://x.com/jobstash',
    date: '2025/02/25',
  },
  {
    title: 'Veri Dynamic Pricing & Comparison',
    link: 'https://x.com/jobstash',
    date: '2025/02/19',
  },
];
