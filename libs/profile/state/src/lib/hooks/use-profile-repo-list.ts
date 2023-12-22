import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtom, useSetAtom } from 'jotai';

import { type ProfileRepo } from '@jobstash/profile/core';

import { useIsMobile } from '@jobstash/shared/state';

import { activeProfileRepoAtom } from '../atoms/active-profile-repo-atom';
import { profileRepoCountAtom } from '../atoms/profile-repo-count-atom';

import { useProfileRepoListQuery } from './use-profile-repo-list-query';

export const useProfileRepoList = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useProfileRepoListQuery();

  const [activeProfileRepo, setActiveProfileRepo] = useAtom(
    activeProfileRepoAtom,
  );
  const setProfileRepoCount = useSetAtom(profileRepoCountAtom);
  useEffect(() => {
    if (data) {
      setProfileRepoCount(data.pages[0].total);
    }
  }, [data, setProfileRepoCount]);

  const initProfileRepoRef = useRef<ProfileRepo | null>(null);
  const profileRepoListItems = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);
    if (initProfileRepoRef.current) {
      result = result.filter((d) => d.id !== initProfileRepoRef.current?.id);
      result.unshift(initProfileRepoRef.current);
    }

    return result;
  }, [data]);

  const setActiveRef = useRef(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (
      profileRepoListItems.length > 0 &&
      !setActiveRef.current &&
      !activeProfileRepo &&
      !isMobile
    ) {
      setActiveRef.current = true;
      setActiveProfileRepo(profileRepoListItems[0]);
    }
  }, [activeProfileRepo, isMobile, profileRepoListItems, setActiveProfileRepo]);

  const { ref: inViewRef, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return {
    isLoading,
    error,
    profileRepoListItems,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    isFetching,
  };
};
