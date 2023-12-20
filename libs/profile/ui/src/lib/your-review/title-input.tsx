import { TextInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import {
  useProfileInfoContext,
  useProfileOrgReviewFormContext,
} from '@jobstash/profile/state';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

const TitleInput = () => {
  const { profileInfoData } = useProfileInfoContext();

  const username = profileInfoData?.username ?? '';
  const avatar = profileInfoData?.avatar ?? '';

  const {
    review: { title },
    setTitle,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Heading size="md" fw="semibold">
          Title
        </Heading>
        <LogoTitle
          title={username}
          avatarProps={{ src: avatar, alt: `${username}'s avatar` }}
        />
      </div>
      <div className="w-full">
        <TextInput
          placeholder="Best place I worked"
          size="lg"
          classNames={{
            input: cn(
              'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-md focus:border-white/40',
              // { 'border border-white': Boolean(selectedWOC) },
            ),
          }}
          value={title ?? ''}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

export default TitleInput;
