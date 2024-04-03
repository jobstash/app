import { useCandidateOrgReviews } from './use-candidate-org-reviews';

export const useCandidateOrgReview = (orgId: string) => {
  const { data, isPending } = useCandidateOrgReviews();

  const result = (data ?? []).find(({ org }) => org.orgId === orgId);

  const org = result?.org ?? null;
  const review = result?.review ?? null;
  const rating = result?.rating ?? null;
  const hasReview = !!review;
  const hasRating = rating
    ? Object.values(rating).some((v) => typeof v === 'number')
    : false;
  const hasReviewed = hasReview || hasRating;

  return {
    isPending,
    org,
    review,
    rating,
    hasReview,
    hasRating,
    hasReviewed,
  };
};
