import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtom, useSetAtom } from 'jotai';

import { OrgPost } from '@jobstash/organizations/core';
import { createOrgsFilterParamsObj } from '@jobstash/organizations/utils';

import { useIsMobile } from '@jobstash/shared/state';

import { activeOrgAtom } from '../state/active-org-atom';
import { orgCountAtom } from '../state/org-count-atom';
import { orgsPrevLinkAtom } from '../state/orgs-prev-link-atom';

import { useOrgListQuery } from './use-org-list-query';

export const useOrgList = (initOrg: OrgPost | null) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useOrgListQuery();

  const [activeOrg, setActiveOrg] = useAtom(activeOrgAtom);

  const setOrgCountAtom = useSetAtom(orgCountAtom);
  useEffect(() => {
    if (data) {
      setOrgCountAtom(data.pages[0].total);
    }
  }, [data, setOrgCountAtom]);

  const initOrgRef = useRef<OrgPost | null>(null);
  const orgPosts = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);

    if (initOrg) {
      result = result.filter((d) => d.id !== initOrg.id);
      result.unshift(initOrg);
      initOrgRef.current = initOrg;
    }

    if (initOrgRef.current) {
      result = result.filter((d) => d.id !== initOrgRef.current?.id);
      result.unshift(initOrgRef.current);
    }

    return result;
  }, [data, initOrg]);

  const setActiveRef = useRef(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (
      orgPosts.length > 0 &&
      !setActiveRef.current &&
      !activeOrg &&
      !isMobile
    ) {
      setActiveRef.current = true;
      setActiveOrg(orgPosts[0]);
    }
  }, [activeOrg, isMobile, orgPosts, setActiveOrg]);

  const { asPath, push, query } = useRouter();

  const [orgsPrevLink, setPrevLink] = useAtom(orgsPrevLinkAtom);
  useEffect(() => {
    if (orgPosts.length > 0) {
      setPrevLink(asPath);
    }
  }, [asPath, orgPosts.length, setPrevLink]);

  const { ref: inViewRef, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const filterParamsObj = createOrgsFilterParamsObj(query);

  return {
    push,
    isLoading,
    error,
    orgPosts,
    orgsPrevLink,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    filterParamsObj,
  };
};
