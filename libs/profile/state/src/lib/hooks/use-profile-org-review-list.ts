import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtom, useSetAtom } from 'jotai';

import { type ProfileOrgReview } from '@jobstash/profile/core';

import { useIsMobile } from '@jobstash/shared/state';

import { activeProfileOrgReviewAtom } from '../atoms/active-profile-org-review-atom';
import { profileRepoCountAtom } from '../atoms/profile-repo-count-atom';

import { useProfileOrgReviewListQuery } from './use-profile-org-review-list-query';

export const useProfileOrgReviewList = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useProfileOrgReviewListQuery();

  const [activeProfileOrgReview, setActiveProfileOrgReview] = useAtom(
    activeProfileOrgReviewAtom,
  );
  const setProfileOrgReviewCount = useSetAtom(profileRepoCountAtom);
  useEffect(() => {
    if (data) {
      setProfileOrgReviewCount(data.pages[0].total);
    }
  }, [data, setProfileOrgReviewCount]);

  const initProfileOrgReviewRef = useRef<ProfileOrgReview | null>(null);
  const profileOrgReviewListItems = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);
    if (initProfileOrgReviewRef.current) {
      result = result.filter(
        (d) => d.org.id !== initProfileOrgReviewRef.current?.org.id,
      );
      result.unshift(initProfileOrgReviewRef.current);
    }

    return result;
  }, [data]);

  const setActiveRef = useRef(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (
      profileOrgReviewListItems.length > 0 &&
      !setActiveRef.current &&
      !activeProfileOrgReview &&
      !isMobile
    ) {
      setActiveRef.current = true;
      setActiveProfileOrgReview(profileOrgReviewListItems[0]);
    }
  }, [
    activeProfileOrgReview,
    isMobile,
    profileOrgReviewListItems,
    setActiveProfileOrgReview,
  ]);

  const { ref: inViewRef, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return {
    isLoading,
    error,
    profileOrgReviewListItems,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  };
};
