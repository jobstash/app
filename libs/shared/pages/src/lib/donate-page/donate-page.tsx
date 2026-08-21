import { sonnerToast } from '@jobstash/shared/utils';

import {
  ArrowCircleUpIcon,
  Button,
  CopyIcon,
  EthereumIcon,
  Heading,
  PageWrapper,
  ShieldCheckIcon,
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
            For 3 years, we&apos;ve provided the richest crypto job data completely for free, helping over <strong>150k users</strong> discover unique roles noone else is incentivized to cover.
            <br />
            <br />
            We built this with grant money, but that funding is now exhausted. To keep the lights on and our data operations running, we need your help.
          </Text>

          <div className="flex flex-col gap-3 pl-2 mt-2">
            <div className="flex items-center gap-3 text-white/80">
              <ShieldCheckIcon className="w-5 h-5 text-green-400 shrink-0" />
              <span className="text-lg">Did your company get free distribution? <strong>Time to donate.</strong></span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <ShieldCheckIcon className="w-5 h-5 text-green-400 shrink-0" />
              <span className="text-lg">Did you hire via us? <strong>Time to donate.</strong></span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <ShieldCheckIcon className="w-5 h-5 text-green-400 shrink-0" />
              <span className="text-lg">Do you want us to stay online? <strong>Time to donate.</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-6">
          <Heading size="lg" fw="semibold">
            Ways to Donate to Us
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ethereum Wallet Card */}
            <div className="flex flex-col p-6 bg-white/5 border border-white/10 rounded-2xl gap-6 hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <EthereumIcon className="w-6 h-6 stroke-2" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <Text fw="bold" size="lg" className="block leading-tight">
                    Direct Transfer
                  </Text>
                  <Text
                    size="sm"
                    color="dimmed"
                    className="block leading-tight"
                  >
                    Donate to our wallet (jobstash.eth) on any EVM chain
                  </Text>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                  <Text size="sm" className="font-mono text-white/70 break-all text-center">
                    {walletAddress}
                  </Text>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    left={<CopyIcon className="w-4 h-4" />}
                    onClick={handleCopyWallet}
                    className="w-full"
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    left={<ArrowCircleUpIcon className="w-4 h-4" />}
                    onClick={() => window.open(etherscanLink, '_blank')}
                    className="w-full"
                  >
                    Etherscan
                  </Button>
                </div>
              </div>
            </div>

            {/* Giveth Card */}
            <div className="flex flex-col p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl gap-6 hover:border-indigo-500/40 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <HandIconSvg />
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <HandsReachingSvg />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <Text fw="bold" size="lg" className="block leading-tight">
                    JobStash Giveth Campaign
                  </Text>
                  <Text
                    size="sm"
                    color="dimmed"
                    className="block leading-tight"
                  >
                    Support via transparent charitable giving
                  </Text>
                </div>
              </div>

              <div className="mt-auto relative z-10">
                <Button
                  variant="primary"
                  right={<ArrowCircleUpIcon className="w-4 h-4" />}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 border-0"
                  onClick={() => window.open(givethLink, '_blank')}
                >
                  Donate on Giveth
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <HandIconSvg />
            <Heading className="md:text-3xl lg:text-4xl">Impact</Heading>
          </div>
          <img
            src="/stats/stats-all-time.png"
            alt="JobStash Stats: 1M Views"
            className="rounded-xl border border-white/10 w-full max-w-2xl"
          />
          <Text color="dimmed" className="leading-relaxed">
            Over the past 3 years, we have provided 92k+ job applications to over 1.5K companies by 143k+ users, in 1M+ views.
          </Text>
        </div>

        <div className="flex flex-col gap-y-3">
          <Heading size="lg" fw="semibold">
            Public use of our data
          </Heading>
          <Text color="dimmed" className="leading-relaxed">
            The following projects use our job data APIs
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
            {/* <EthFoundationSvg /> */}
            <OptimismSvg />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

const publicUseData = [
  {
    title: 'Web3SecNews - Jobs Section',
    link: 'https://www.web3sec.news/jobs',
    date: '2023/01/01',
  },
  {
    title: 'CryptoNomads - Jobs Section',
    link: 'https://cryptonomads.org/jobs',
    date: '2025/02/01',
  }
];

export const platformUpdatesData = [
  {
    title: 'Pricing Structure Updates',
    link: 'https://x.com/jobstashxyz',
    date: '2025/11/20',
  },
  {
    title: 'Profile Expert Status Section',
    link: 'https://x.com/jobstashxyz',
    date: '2025/08/28',
  },
  {
    title: 'Ethereum Season of Internships Highlight',
    link: 'https://x.com/jobstashxyz',
    date: '2025/06/25',
  },
  {
    title: 'Crypto-Native Profile Properties',
    link: 'https://x.com/jobstashxyz',
    date: '2025/03/21',
  },
  {
    title: 'UI Framework Migration to HeroUI',
    link: 'https://x.com/jobstashxyz',
    date: '2025/02/25',
  },
  {
    title: 'Veri Dynamic Pricing & Comparison',
    link: 'https://x.com/jobstashxyz',
    date: '2025/02/19',
  },
];
