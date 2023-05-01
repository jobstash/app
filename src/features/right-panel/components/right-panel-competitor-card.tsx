import { memo } from 'react';

import { CardSet, LogoTitle, Text } from '~/shared/components';
import type { Competitor } from '~/shared/core/interfaces';

import { createCompetitorTags } from '../utils';

interface Props {
  competitor: Competitor;
}

const RightPanelCompetitorCard = ({ competitor }: Props) => {
  const { name, logo, description, url } = competitor;

  const { topTags, bottomTags } = createCompetitorTags(competitor);

  return (
    <div className="mt-8 rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5">
      <div className="rounded-3xl bg-darker-gray">
        <div className="flex flex-col gap-6 rounded-3xl p-6">
          <div>
            <LogoTitle
              size="lg"
              title={name}
              avatarProps={{
                src:
                  logo.trim().length > 0
                    ? logo
                    : `https://www.google.com/s2/favicons?domain=${url}&sz=128`,
                alt: name,
              }}
            />
          </div>

          <div>
            <Text color="dimmed">{description}</Text>
          </div>

          <div className="flex gap-4">
            {topTags.map(({ text, icon, link }) => (
              <CardSet key={text} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>

          <div className="flex h-4 flex-col justify-center">
            <hr className="border-t border-white/10" />
          </div>

          <div className="flex gap-4">
            {bottomTags.map(({ text, icon, link }) => (
              <CardSet key={text} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(RightPanelCompetitorCard);
