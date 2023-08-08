import { memo, useCallback, useMemo, useState } from 'react';

import { LoadingOverlay, Rating } from '@mantine/core';

import {
  type ProfileOrgReview,
  type ProfileOrgReviewRating,
} from '@jobstash/profile/core';

import { useRatingMutation } from '@jobstash/profile/state';

import { Button, Heading, Text } from '@jobstash/shared/ui';

interface Props {
  orgReview: ProfileOrgReview;
}

const ratingKeyMap = {
  management: 'Management',
  careerGrowth: 'Career Growth',
  benefits: 'Benefits',
  workLifeBalance: 'Work/Life Balance',
  cultureValues: 'Culture & Values',
  diversityInclusion: 'Diversity & Inclusion',
  interviewProcess: 'Interview Process',
};

const ProfileRightPanelRating = ({ orgReview }: Props) => {
  const { rating, org } = orgReview || ({} as ProfileOrgReview);
  const {
    management,
    careerGrowth,
    benefits,
    workLifeBalance,
    cultureValues,
    diversityInclusion,
    interviewProcess,
  } = rating;

  const [currentRating, setCurrentRating] = useState<
    Omit<ProfileOrgReviewRating, 'overall'>
  >({
    management,
    careerGrowth,
    benefits,
    workLifeBalance,
    cultureValues,
    diversityInclusion,
    interviewProcess,
  });

  const disableActions = useMemo(
    () =>
      JSON.stringify({
        management,
        careerGrowth,
        benefits,
        workLifeBalance,
        cultureValues,
        diversityInclusion,
        interviewProcess,
      }) === JSON.stringify(currentRating),
    [
      benefits,
      careerGrowth,
      cultureValues,
      currentRating,
      diversityInclusion,
      interviewProcess,
      management,
      workLifeBalance,
    ],
  );

  const { isLoading, mutate } = useRatingMutation();

  const onClickSave = useCallback(() => {
    mutate({
      orgId: org.id,
      rating: currentRating,
    });
  }, [currentRating, mutate, org.id]);

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Heading size="lg" fw="semibold">
        Rating
      </Heading>
      <Text color="dimmed">
        Provide valuable insight into the company&#39;s work culture, leadership
        style, and career opportunities and help others find the perfect fit.
      </Text>

      <div className="py-2 pb-4">
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex flex-col gap-8">
        {Object.keys(currentRating).map((key) => (
          <div key={key} className="flex gap-8 items-center">
            <div className="flex justify-end w-[30%]">
              <Text size="lg">
                {ratingKeyMap[key as keyof typeof ratingKeyMap]}
              </Text>
            </div>
            <div className="w-[70%]">
              <Rating
                size="xl"
                value={currentRating[key as keyof typeof currentRating] ?? 0}
                onChange={(v) =>
                  setCurrentRating((prev) => ({ ...prev, [key]: v }))
                }
              />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center pt-4 w-full gap-8">
          <Button
            variant="primary"
            className="px-8"
            isDisabled={disableActions}
            onClick={onClickSave}
          >
            Save & Next
          </Button>

          <Button
            variant="outline"
            className="px-8 bg-darker-gray"
            isDisabled={disableActions}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileRightPanelRating);
