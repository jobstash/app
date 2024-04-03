'use client';

import { useRouter } from 'next/navigation';

import { Spinner } from '@nextui-org/react';

import { useRoleFn } from '~/shared/hooks/use-role-fn';
import { PrimaryButton } from '~/shared/components/primary-button';

import { CHECK_WALLET_ROLES } from '~/users/core/constants';
import { useCandidateOrgReview } from '~/users/hooks/use-candidate-org-review';

interface Props {
  orgId: string;
}

export const ReviewButton = ({ orgId }: Props) => {
  const router = useRouter();

  const { isAuthd, authdFn } = useRoleFn({
    role: CHECK_WALLET_ROLES.DEV,
    fn: () => router.push('/profile/reviews'),
  });

  const { hasReviewed, isPending } = useCandidateOrgReview(orgId);

  const text = isAuthd
    ? hasReviewed
      ? BUTTON_TEXT.REVIEWED
      : BUTTON_TEXT.NO_REVIEW
    : BUTTON_TEXT.ANON;

  const content =
    isAuthd && isPending ? (
      <Spinner color="white" size="sm" />
    ) : (
      <PrimaryButton text={text} onClick={authdFn} />
    );

  return (
    <div style={{ minHeight: 40 }} className="flex items-center">
      {content}
    </div>
  );
};

const BUTTON_TEXT = {
  ANON: 'Leave a Review',
  REVIEWED: 'Edit Review',
  NO_REVIEW: 'Review Organization',
} as const;
