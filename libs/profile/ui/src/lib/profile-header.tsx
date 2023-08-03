import { memo, useEffect, useState } from 'react';

import { Select, Switch, TextInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { Button, LogoTitle, Text } from '@jobstash/shared/ui';

interface Props {
  availableForWork: boolean;
  username: string;
  avatar: string;
}

export const PREFERRED_WAY_OF_CONTACT = {
  EMAIL: 'Email',
  OPTION2: 'Option 2',
  OPTION3: 'Option 3',
};

const WAY_OF_CONTACT = {
  Email: ['0xDevoor@gmail.com', '0x.dev@gmail.com', '0xDevoor@jobstash.xyz'],
  Phone: ['+1 301-288-3143', '+61 483 130 151', '+31 6 50624715'],
};

const ProfileHeader = (props: Props) => {
  const { availableForWork, username, avatar } = props;

  const [checked, setChecked] = useState(availableForWork);

  const [preferredWOC, setPreferredWOC] = useState<string | null>(null);
  const selections = preferredWOC
    ? WAY_OF_CONTACT[preferredWOC as keyof typeof WAY_OF_CONTACT]
    : [];

  const [selectedWOC, setSelectedWOC] = useState<string | null>(null);

  return (
    <div className="border border-dark-gray p-8 rounded-3xl flex-col space-y-4">
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
          placeholder="Preferred Way of Contact"
          data={Object.keys(WAY_OF_CONTACT)}
          value={preferredWOC}
          size="lg"
          classNames={{
            input: cn(
              'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
              // { 'border border-white': Boolean(preferredWOC) },
            ),
            itemsWrapper: 'bg-dark',
            item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
          }}
          onChange={setPreferredWOC}
        />
        <TextInput
          placeholder="Contact Info"
          size="lg"
          disabled={!preferredWOC}
          value={
            selectedWOC && selections.includes(selectedWOC) ? selectedWOC : ''
          }
          classNames={{
            input: cn(
              'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
              // { 'border border-white': Boolean(selectedWOC) },
            ),
          }}
          onChange={(e) => setSelectedWOC(e.currentTarget.value)}
        />
        <Button
          variant="primary"
          size="lg"
          textProps={{ size: 'md' }}
          className="px-10"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default memo(ProfileHeader);
