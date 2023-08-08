import { memo, useCallback, useMemo, useState } from 'react';

import { LoadingOverlay, Select, Switch, TextInput } from '@mantine/core';

import { type ProfileInfo } from '@jobstash/profile/core';

import {
  useProfileInfo,
  useProfileInfoMutation,
} from '@jobstash/profile/state';

import { Button, LogoTitle, Text } from '@jobstash/shared/ui';

const CONTACT_OPTIONS_PLACEHOLDER = 'Preferred Way of Contact';

const ProfileHeader = () => {
  const { data } = useProfileInfo();

  const { availableForWork, username, avatar, contact } =
    data || ({} as ProfileInfo);

  const [checked, setChecked] = useState<boolean>(availableForWork || false);
  const [preferredWOC, setPreferredWOC] = useState<string | null>(
    contact?.preferred || null,
  );
  const [selectedWOC, setSelectedWOC] = useState<string | null>(
    contact?.value || null,
  );

  const { isLoading, mutate } = useProfileInfoMutation();

  const isSaveDisabled = useMemo(
    () =>
      JSON.stringify({
        availableForWork,
        preferred: contact?.preferred,
        value: contact?.value,
      }) ===
      JSON.stringify({
        availableForWork: checked,
        preferred: preferredWOC,
        value: selectedWOC,
      }),
    [availableForWork, checked, contact, preferredWOC, selectedWOC],
  );

  const handleSaveClick = useCallback(() => {
    mutate({
      avatar,
      username,
      availableForWork: checked,
      contact: {
        options: contact?.options,
        preferred: preferredWOC,
        value: selectedWOC,
      },
    });
  }, [avatar, checked, contact, mutate, preferredWOC, selectedWOC, username]);

  return (
    <div className="border border-dark-gray p-8 rounded-3xl flex-col space-y-4 relative">
      <LoadingOverlay visible={isLoading} />

      <div className="flex items-center gap-6">
        <LogoTitle
          title={username}
          avatarProps={{
            src: avatar,
            alt: `${username}'s avatar`,
            isRounded: true,
          }}
          size="lg"
        />
        <Switch
          size="md"
          label={
            <Text size="lg" color="dimmed">
              Available for work
            </Text>
          }
          color="green"
          checked={checked}
          onChange={(e) => setChecked(e.currentTarget.checked)}
        />
      </div>
      <div className="flex justify-between items-center">
        <Select
          placeholder={CONTACT_OPTIONS_PLACEHOLDER}
          data={contact?.options || []}
          value={preferredWOC}
          size="lg"
          classNames={{
            input:
              'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
            itemsWrapper: 'bg-dark',
            item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
          }}
          onChange={(v) => {
            setSelectedWOC(null);
            setPreferredWOC(v);
          }}
        />
        <TextInput
          placeholder="Type here ..."
          size="lg"
          disabled={!preferredWOC}
          value={selectedWOC ?? ''}
          classNames={{
            input:
              'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
          }}
          onChange={(e) => setSelectedWOC(e.currentTarget.value)}
        />
        <Button
          isDisabled={isSaveDisabled}
          variant="primary"
          size="lg"
          textProps={{ size: 'md' }}
          className="px-10"
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default memo(ProfileHeader);
