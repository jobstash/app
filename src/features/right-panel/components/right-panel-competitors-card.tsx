import { memo } from 'react';

import {
  Button,
  CardSet,
  CategoryIcon,
  GithubLogoOutlineIcon,
  LogoTitle,
  SuitcaseIcon,
  Text,
  UsersThreeIcon,
} from '~/shared/components';
import TechWrapper from '~/shared/components/base/tech-wrapper';

const RightPanelCompetitorsCard = () => (
  <div className="flex flex-col gap-6 rounded-3xl p-6">
    <div>
      <LogoTitle
        size="lg"
        title="Versa Games"
        avatarProps={{
          src: `/orgs/Versa Games.png`,
          alt: 'Versa Games',
        }}
      />
    </div>

    <div>
      <Text color="dimmed">
        VersaGames is a digital platform where gamers worldwide can discover and
        learn about NFT games, and grow their digital assets and collections.
      </Text>
    </div>

    <div>
      <CardSet showLinkIcon link="##" icon={null}>
        VersaGames.org
      </CardSet>
    </div>

    <div>
      <Button variant="primary">Explore Competitor</Button>
    </div>

    <div className="flex h-4 flex-col justify-center">
      <hr className="border-t border-white/10" />
    </div>

    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <CardSet link="##" icon={<SuitcaseIcon />} showLinkIcon={false}>
          Jobs: 5
        </CardSet>
        <CardSet
          link="##"
          icon={<GithubLogoOutlineIcon />}
          showLinkIcon={false}
        >
          Relevant Repos: 3
        </CardSet>
        <CardSet icon={<CategoryIcon />} showLinkIcon={false}>
          Category: DEX
        </CardSet>
        <CardSet icon={<UsersThreeIcon />} showLinkIcon={false}>
          Team Size: 3
        </CardSet>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <CardSet icon={<UsersThreeIcon />} showLinkIcon={false}>
          TVL: $10k
        </CardSet>
        <CardSet icon={<UsersThreeIcon />} showLinkIcon={false}>
          Monthly Volume: $3k
        </CardSet>
        <CardSet icon={<UsersThreeIcon />} showLinkIcon={false}>
          Active Users: 2k
        </CardSet>
        <CardSet icon={<UsersThreeIcon />} showLinkIcon={false}>
          Revenue: $33k
        </CardSet>
      </div>
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
);

export default memo(RightPanelCompetitorsCard);
