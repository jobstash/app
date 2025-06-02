import { Socials, TagElement } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import RightPanelHeaderSocials from './right-panel-header-socials';
import RightPanelHeaderTags from './right-panel-header-tags';

interface Props {
  name: string;
  website: string | null;
  logo: string | null;
  description: string | null;
  socials: Socials | null;
  tags: TagElement[];
}

const RightPanelHeader = ({
  name,
  website,
  logo,
  description,
  socials,
  tags,
}: Props) => (
  <div className="flex flex-col gap-6 md:gap-4">
    <div className="flex h-10 items-center">
      <LogoTitle
        title={name}
        avatarProps={{
          src: getLogoUrl(website ?? '', logo),
          alt: name,
        }}
      />
    </div>

    <RightPanelHeaderTags tags={tags} />

    {description && <Text color="dimmed">{description}</Text>}

    {socials && <RightPanelHeaderSocials socials={socials} />}
  </div>
);

export default RightPanelHeader;
