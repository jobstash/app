import { type ProfileOrgReview } from '@jobstash/profile/core';
import { type TagElement } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { CardSet, LogoTitle, Text } from '@jobstash/shared/ui';

import { createOrgInfoSocials } from '../utils/create-right-panel-org-socials';
import { createRightPanelOrgTags } from '../utils/create-right-panel-org-tags';

interface Props {
  orgInfo?: ProfileOrgReview['org'];
}

export const ProfileRightPanelOrgHeader = ({ orgInfo }: Props) => {
  if (!orgInfo) return null;

  const { name, logo: logoUrl, website, summary } = orgInfo;

  const tags: TagElement[] = createRightPanelOrgTags(orgInfo);
  const socials: TagElement[] = createOrgInfoSocials(orgInfo);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex h-10 items-center">
          <LogoTitle
            title={name}
            avatarProps={{
              src: getLogoUrl(website ?? '', logoUrl),
              alt: name,
            }}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {tags.map(({ id, text, icon, link }) => (
            <CardSet key={id} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>
      </div>

      <Text color="dimmed">{summary as string}</Text>

      <div className="flex gap-4 flex-wrap">
        {socials.map(({ id, text, icon, link }) => (
          <CardSet key={id} link={link} icon={icon}>
            {text}
          </CardSet>
        ))}
      </div>
    </div>
  );
};