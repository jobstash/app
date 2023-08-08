import { memo, useCallback, useState } from 'react';

import { LoadingOverlay, Textarea } from '@mantine/core';

import { type ProfileRepo } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useYourContributionMutation } from '@jobstash/profile/state';

import { Button, Heading, Text } from '@jobstash/shared/ui';

interface Props {
  username: string;
  profileRepo: ProfileRepo | null;
}

const ProfileRightPanelYourContribution = (props: Props) => {
  const { username, profileRepo } = props;

  const [contributionSummary, setContributionSummary] = useState(
    profileRepo?.contribution.summary ?? '',
  );

  const { id, name, description, contribution } =
    profileRepo || ({} as ProfileRepo);

  const disableSave = contribution.summary === contributionSummary;

  const { isLoading, mutate } = useYourContributionMutation();

  const onClickSave = useCallback(() => {
    mutate({
      id,
      contribution: contributionSummary,
    });
  }, [mutate, id, contributionSummary]);

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Heading size="lg" fw="semibold">
        Describe your contribution
      </Heading>
      <div className="w-[90%]">
        <Text color="dimmed">
          If this repository contains work that you’d like to showcase to
          potential employers, please describe in a technical and quantifiable
          way what your contribution has been.
        </Text>
      </div>
      <hr className="border-t border-white/10" />
      <div className="flex flex-col gap-4 justify-center p-6">
        <div className="flex items-center justify-between w-full -mt-4">
          <Heading size="md" fw="semibold">
            {name}
          </Heading>
          <Heading size="sm" fw="semibold">
            {username}
          </Heading>
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex justify-between w-full gap-12">
          <Text size="sm" color="dimmed">
            {description}
          </Text>
          <div className="min-w-[120px] text-right">
            <Text size="sm" color="dimmed">
              {`${contribution.count} Contributions`}
            </Text>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <Textarea
            autosize
            inputWrapperOrder={['input', 'description']}
            descriptionProps={{
              className: 'text-right pt-2 pr-2',
            }}
            w="98%"
            minRows={10}
            classNames={{
              input: cn(
                'rounded-lg bg-dark-gray text-white/60 focus:border-white p-6',
              ),
            }}
            value={contributionSummary}
            description={`${500 - contributionSummary.length} characters left`}
            onChange={(e) => {
              const { value } = e.currentTarget;

              if (value.length <= 500) {
                setContributionSummary(value);
              }
            }}
          />
        </div>

        <div className="flex items-center justify-center pt-4 w-full gap-8">
          <Button
            variant="primary"
            className="px-8"
            isDisabled={disableSave}
            onClick={onClickSave}
          >
            Save
          </Button>
          <Button
            variant="outline"
            className="px-8 bg-darker-gray"
            isDisabled={disableSave}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileRightPanelYourContribution);
