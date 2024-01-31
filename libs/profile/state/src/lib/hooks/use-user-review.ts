import { useProfileOrgReviewListQuery } from './use-profile-org-review-list-query';

export const useUserReview = (orgId: string) => {
  const { data, isLoading } = useProfileOrgReviewListQuery();

  const result = (data ?? []).find(({ org }) => org.orgId === orgId);

  if (result) {
    const { org, review, rating } = result;
    const hasReview = Boolean(review.title);
    const hasRating = Object.values(rating).some((v) => typeof v === 'number');
    const hasReviewed = hasReview || hasRating;

    return {
      isLoading,
      org,
      review,
      rating,
      hasRating,
      hasReview,
      hasReviewed,
    };
  }

  return {
    isLoading,
    org: null,
    review: null,
    rating: null,
    hasRating: false,
    hasReview: false,
    hasReviewed: false,
  };
};
