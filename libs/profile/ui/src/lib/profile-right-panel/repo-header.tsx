import { type ProfileRepo } from '@jobstash/profile/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import {
  Button,
  CloseIcon,
  Heading,
  LogoTitle,
  Text,
} from '@jobstash/shared/ui';

interface Props {
  profileRepo: ProfileRepo | null;
  closeRightPanel: () => void;
}

export const ProfileRightPanelRepoHeader = ({
  profileRepo,
  closeRightPanel,
}: Props) => {
  if (!profileRepo) return null;

  const { org, name, description } = profileRepo;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center w-full justify-between">
        <Heading size="md">{name}</Heading>
        <div className="block lg:hidden">
          <Button size="sm" variant="transparent" onClick={closeRightPanel}>
            <CloseIcon />
          </Button>
        </div>
      </div>
      <Text color="dimmed">{description}</Text>
      <LogoTitle
        title={org.name}
        avatarProps={{
          src: getLogoUrl(org.url, org.logo),
          alt: org.name,
        }}
      />
    </div>
  );
};
