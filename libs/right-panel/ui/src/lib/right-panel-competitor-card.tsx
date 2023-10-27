import { memo } from 'react';

import { type Competitor } from '@jobstash/competitors/core';
import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';
import { getLogoUrl, slugify } from '@jobstash/shared/utils';

import { CardSet, ChainList, LogoTitle, Text } from '@jobstash/shared/ui';

import { createCompetitorTags } from './utils/create-right-panel-competitor-tags';
import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';

interface Props {
  competitor: Competitor;
}

const RightPanelCompetitorCard = ({ competitor }: Props) => {
  const { id, name, logo, description, url, chains } = competitor;

  const { topTags, bottomTags } = createCompetitorTags(competitor);

  const slug = slugify(`${name} ${id}`);
  const link = `${ROUTE_SECTION.PROJECTS}/${slug}/${TAB_SEGMENT.details}`;
  const onClickExplore = () => {
    if (typeof window !== 'undefined') {
      window.location.href = link;
    }
  };

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col gap-6 rounded-3xl p-6">
        <div>
          <LogoTitle
            size="lg"
            title={name}
            avatarProps={{
              src: getLogoUrl(url, logo),
              alt: name,
            }}
          />
        </div>

        {description && (
          <div>
            <Text color="dimmed">{description}</Text>
          </div>
        )}

        {topTags.length > 0 && (
          <div className="flex gap-4">
            {topTags.map(({ id, text, icon, link }) => (
              <CardSet key={id} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>
        )}

        {bottomTags.length > 0 && (
          <>
            <hr className="border-t border-white/10" />

            <div className="flex gap-4">
              {bottomTags.map(({ text, icon, link }) => (
                <CardSet key={text} link={link} icon={icon}>
                  {text}
                </CardSet>
              ))}
            </div>
          </>
        )}

        {chains.length > 0 && (
          <>
            <hr className="border-t border-white/10" />
            <ChainList chains={chains} />
          </>
        )}

        <hr className="border-t border-white/10" />

        <RightPanelCta text="Explore Competitor" onClick={onClickExplore} />
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelCompetitorCard);
