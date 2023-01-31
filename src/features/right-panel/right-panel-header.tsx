import { getTagIcon } from '~/core/constants';
import type { Org } from '~/core/interfaces';

import { Button } from '../unstyled-ui/base/button';
import { Text } from '../unstyled-ui/base/text';
import { FundingTagIcon, LocationTagIcon } from '../unstyled-ui/icons';
import { TeamSizeTagIcon } from '../unstyled-ui/icons';
import { LogoTitle } from '../unstyled-ui/logo-title';
import { TagButton } from '../unstyled-ui/tag-button';

interface Props {
  org: Org;
}

export const RightPanelHeader = ({
  org: { name, avatar, location, teamSize, fundingDate, summary, tags },
}: Props) => {
  const orgTags = [
    { text: location, icon: <LocationTagIcon /> },
    { text: `Team size: ${teamSize}`, icon: <TeamSizeTagIcon /> },
    { text: `Funding: ${fundingDate}`, icon: <FundingTagIcon /> },
  ];

  return (
    <div className="space-y-4 pt-6">
      <LogoTitle name={name} avatar={avatar} size="xl" avatarSize="md" />

      <div className="flex items-center">
        {orgTags.map(({ text, icon }) => (
          <TagButton key={text} text={text} icon={icon} />
        ))}
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
};
