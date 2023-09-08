import { memo } from 'react';

import { type Competitor } from '@jobstash/competitors/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { CardSet, LogoTitle, Text } from '@jobstash/shared/ui';

import { createCompetitorTags } from './utils/create-right-panel-competitor-tags';
import RightPanelCardBorder from './right-panel-card-border';

interface Props {
  competitor: Competitor;
}

const RightPanelCompetitorCard = ({ competitor }: Props) => {
  const { name, logo, description, url } = competitor;

  const { topTags, bottomTags } = createCompetitorTags(competitor);

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

        <div>
          <Text color="dimmed">{description}</Text>
        </div>

        <div className="flex gap-4">
          {topTags.map(({ id, text, icon, link }) => (
            <CardSet key={id} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>

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
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelCompetitorCard);
