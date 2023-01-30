import Image from 'next/image';

import clsx from 'clsx';

import { getTagIcon } from '~/core/constants';
import type { Org } from '~/core/interfaces';

import { Button } from '../unstyled-ui/base/button';
import { Text } from '../unstyled-ui/base/text';
import { FundingTagIcon, LocationTagIcon } from '../unstyled-ui/icons';
import { TeamSizeTagIcon } from '../unstyled-ui/icons';
import { LogoTitle } from '../unstyled-ui/logo-title';

interface Props {
  org: Org;
}

export const RightPanelHeader = ({
  org: { name, avatar, location, teamSize, fundingDate, summary, tags },
}: Props) => (
  <div className="space-y-4 pt-6">
    <LogoTitle name={name} avatar={avatar} size="xl" avatarSize="md" />

    <div className="flex items-center">
      <Button
        size="sm"
        kind="subtle"
        textProps={{
          fw: 'regular',
          size: 'md',
          className: 'text-white/90',
          htmlTag: 'h3',
        }}
        left={<LocationTagIcon />}
      >
        {location}
      </Button>
      <Button
        size="sm"
        kind="subtle"
        textProps={{
          fw: 'regular',
          size: 'md',
          className: 'text-white/90',
          htmlTag: 'h3',
        }}
        left={<TeamSizeTagIcon />}
      >
        Team Size: {teamSize}
      </Button>

      <Button
        size="sm"
        kind="subtle"
        textProps={{
          fw: 'regular',
          size: 'md',
          className: 'text-white/90',
          htmlTag: 'h3',
        }}
        left={<FundingTagIcon />}
      >
        Funding: {fundingDate}
      </Button>
    </div>
    <div className="max-w-xl">
      <Text size="md" fw="regular" className="text-white/70">
        {summary}
      </Text>
    </div>
    <div className="flex items-center space-x-4 pt-2">
      {tags.map((tag) => (
        <Button
          key={tag.text}
          size="sm"
          textProps={{ fw: 'regular' }}
          left={getTagIcon(tag.iconKey)}
          // eslint-disable-next-line no-alert
          onClick={tag.link ? () => alert('External link') : undefined}
        >
          {tag.text}
        </Button>
      ))}
    </div>
  </div>
);
