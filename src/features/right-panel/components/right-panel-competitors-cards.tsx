import { memo, useMemo } from 'react';

import clsx from 'clsx';

import { Button, CardSet, LogoTitle, Text } from '~/shared/components';
import TechWrapper from '~/shared/components/base/tech-wrapper';
import type { Project } from '~/shared/core/interfaces';

import { createRightPanelProjectCardTags } from '../utils';

interface Props {
  isPending: boolean;
}

const CompetitorCard = ({ project }: { project: Project }) => {
  console.log('competitor project =', project);
  const { projectTags, projectTvlTags } = useMemo(
    () => createRightPanelProjectCardTags(project),
    [project],
  );

  return (
    <div
      key={project.id}
      className={clsx(
        'mt-8 rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5',
      )}
    >
      <div className="rounded-3xl bg-darker-gray">
        <div className="flex flex-col gap-6 rounded-3xl p-6">
          <div>
            <LogoTitle
              size="lg"
              title={project.name}
              avatarProps={{
                src: project.logo,
                alt: project.name,
              }}
            />
          </div>

          <div>
            <Text color="dimmed">{project.description}</Text>
          </div>

          <div>
            <CardSet showLinkIcon link="##" icon={null}>
              {project.defillamaSlug ?? project.name}
            </CardSet>
          </div>

          <div>
            <Button variant="primary">Explore Competitor</Button>
          </div>

          <div className="flex h-4 flex-col justify-center">
            <hr className="border-t border-white/10" />
          </div>

          <div className="flex flex-col gap-4">
            {projectTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-4">
                {projectTags.map(({ text, icon, link, showLinkIcon }) => (
                  <CardSet
                    key={text}
                    link={link}
                    icon={icon}
                    showLinkIcon={showLinkIcon}
                  >
                    {text}
                  </CardSet>
                ))}
              </div>
            )}
            {projectTvlTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-4">
                {projectTvlTags.map(({ text, icon, link, showLinkIcon }) => (
                  <CardSet
                    key={text}
                    link={link}
                    icon={icon}
                    showLinkIcon={showLinkIcon}
                  >
                    {text}
                  </CardSet>
                ))}
              </div>
            )}
          </div>

          <div className="flex h-4 flex-col justify-center">
            <hr className="border-t border-white/10" />
          </div>

          <div className="flex flex-wrap gap-4">
            <TechWrapper id="8">REACT</TechWrapper>
            <TechWrapper id="23">JEST</TechWrapper>
            <TechWrapper id="6">TYPESCRIPT</TechWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompetitorCardMemo = memo(CompetitorCard);

const RightPanelCompetitorsCards = ({ isPending }: Props) => {
  const competitors = fakeCompetitors; // TEMP

  if (competitors.length === 0 || isPending) return null;

  return (
    <>
      {competitors.map((project) => (
        <CompetitorCardMemo key={project.id} project={project} />
      ))}
    </>
  );
};

export default memo(RightPanelCompetitorsCards);

const fakeCompetitors = [
  {
    id: '0',
    name: 'Versa Games',
    description:
      ' VersaGames is a digital platform where gamers worldwide can discover and  learn about NFT games, and grow their digital assets and collections',
    url: 'https://versagames.io',
    defillamaSlug: 'Versa Games.org',
    teamSize: 3,
    tvl: 10_000,
    monthlyVolume: 3000,
    monthlyActiveUsers: 2000,
    monthlyRevenue: 33_000,
    logo: `/orgs/Versa Games.png`,
  },
  {
    id: '1',
    name: 'Curve',
    description:
      'Curve is an exchange liquidity pool on Ethereum (like Uniswap) designed for (1) extremely efficient stablecoin trading (2) low risk, supplemental fee income for liquidity providers, without an opportunity cost.',
    url: 'https://curve.fi',
    defillamaSlug: 'curve.fi',
    teamSize: 4,
    tvl: 99_000,
    monthlyVolume: 32_000,
    monthlyActiveUsers: 1000,
    monthlyRevenue: 323_000,
    logo: '/orgs/Curve.png',
  },
  {
    id: '2',
    name: 'Pancake Swap',
    description:
      'PancakeSwap is a decentralized exchange built on the BNB Chain (previously BSC and Binance Chain) instead of Ethereum. It enables its users to swap BEP-20 standard tokens easily. The original idea of DeFi and DEX was to decentralize world finances.Aug 13, 2565 BE.',
    url: 'https://pancakeswaproject.finance',
    defillamaSlug: 'pancakeswaproject.finance',
    teamSize: 125,
    tvl: 929_000,
    monthlyVolume: 322_000,
    monthlyActiveUsers: 12_000,
    monthlyRevenue: 323_000,
    logo: '/orgs/Pancake Swap.png',
  },
  {
    id: '3',
    name: 'Uniswap V3',
    description:
      'Uniswap v3 is the most powerful version of the protocol yet, with Concentrated Liquidity offering unprecedented capital efficiency for liquidity providers, better execution for traders, and superior infrastructure at the heart of decentralized finance.',
    url: 'https://approject.uniswaproject.org',
    defillamaSlug: 'uniswapV3.dApp',
    teamSize: 7,
    tvl: 100_000,
    monthlyVolume: 14_000,
    monthlyActiveUsers: 3000,
    monthlyRevenue: 33_000,
    logo: '/orgs/Uniswap Labs.png',
  },
] as Project[];
