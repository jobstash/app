import { memo } from 'react';

import { TextInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { AddTechIcon, Button, Heading, Text } from '@jobstash/shared/ui';

import ProfileRepoTech from './profile-repo-tech';

const ProfileRightPanelTechsUsed = () => (
  <>
    <Heading size="lg" fw="semibold">
      Technologies Used
    </Heading>

    <div className="w-[90%] flex flex-col space-y-6 ">
      <Text color="dimmed">
        Please tell us about which Technologies you used to build this project.
      </Text>
      <Text color="dimmed">
        We use these Technologies to show you relevant projects, and if you mark
        yourself as available for work, we show these to our partner
        Organizations.
      </Text>

      <TextInput
        placeholder="Add technology used"
        size="lg"
        classNames={{
          input: cn(
            'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
            // { 'border border-white': Boolean(selectedWOC) },
          ),
        }}
        rightSection={
          <Button
            isIcon
            variant="outline"
            className="bg-dark-gray hover:bg-gray"
          >
            <AddTechIcon />
          </Button>
        }
      />

      <div className="flex flex-wrap gap-4 items-center">
        <ProfileRepoTech />
        <ProfileRepoTech />
        <ProfileRepoTech />
      </div>

      <div className="flex w-full justify-center">
        <Button variant="primary" className="px-8">
          Save & Next
        </Button>
      </div>
    </div>
  </>
);

export default memo(ProfileRightPanelTechsUsed);
