import { memo, useCallback, useMemo, useState } from 'react';

import { LoadingOverlay, Textarea, TextInput } from '@mantine/core';

import { type ProfileOrgReview } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useYourReviewMutation } from '@jobstash/profile/state';

import { Button, Heading, Text } from '@jobstash/shared/ui';

interface Props {
  orgReview: ProfileOrgReview;
}

const ProfileRightPanelYourReview = ({ orgReview }: Props) => {
  const { review, org } = orgReview || ({} as ProfileOrgReview);
  const { headline, pros, cons } = review;

  const [currentHeadline, setCurrentHeadline] = useState(headline ?? '');
  const [currentPros, setCurrentPros] = useState(pros ?? '');
  const [currentCons, setCurrentCons] = useState(cons ?? '');

  const disableSave = useMemo(() => {
    const prev = JSON.stringify({ headline, pros, cons });
    const next = JSON.stringify({
      headline: currentHeadline,
      pros: currentPros,
      cons: currentCons,
    });

    return prev === next;
  }, [cons, currentCons, currentHeadline, currentPros, headline, pros]);

  const { isLoading, mutate } = useYourReviewMutation();

  const onClickSave = useCallback(() => {
    mutate({
      orgId: org.id,
      review: {
        headline: currentHeadline,
        pros: currentPros,
        cons: currentCons,
      },
    });
  }, [currentCons, currentHeadline, currentPros, mutate, org.id]);

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Heading size="lg" fw="semibold">
        Your Review
      </Heading>
      <Text color="dimmed">
        By sharing your own experiences and honest feedback, you can help other
        developers make more informed decisions about where to work.
      </Text>

      <div className="py-2">
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex flex-col items-center justify-center px-[10%] gap-8 [&>*]:w-full">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Heading size="md" fw="semibold">
              Review Headline
            </Heading>
            <Heading size="md" fw="semibold">
              @0xDevoor
            </Heading>
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
              value={currentHeadline}
              onChange={(e) => {
                setCurrentHeadline(e.currentTarget.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Heading size="md" fw="semibold">
              Pros
            </Heading>
          </div>
          <div className="w-full">
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
              description={`${500 - currentPros.length} characters left`}
              value={currentPros}
              onChange={(e) => {
                setCurrentPros(e.currentTarget.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Heading size="md" fw="semibold">
              Cons
            </Heading>
          </div>
          <div className="w-full">
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
              description={`${500 - currentCons.length} characters left`}
              value={currentCons}
              onChange={(e) => {
                setCurrentCons(e.currentTarget.value);
              }}
            />
          </div>
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

export default memo(ProfileRightPanelYourReview);
