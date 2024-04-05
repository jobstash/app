import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';

import { type OrgListItem } from '@jobstash/organizations/core';
import { createOrgsFilterParamsObj } from '@jobstash/organizations/utils';
import { getLSMwVersion } from '@jobstash/shared/utils';

import { useIsMobile } from '@jobstash/shared/state';
import { getOrgDetails } from '@jobstash/organizations/data';

import { activeOrgIdAtom } from '../state/active-org-atom';
import { orgCountAtom } from '../state/org-count-atom';
import { orgsPrevLinkAtom } from '../state/orgs-prev-link-atom';

import { useOrgListQuery } from './use-org-list-query';

export const useOrgList = (initOrg: OrgListItem | null) => {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isSuccess,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useOrgListQuery();

  const mwVersion = getLSMwVersion();

  // Prefetch org items
  // (react-query breaking change v5 - removed onSuccess)
  useEffect(() => {
    if (data && isSuccess) {
      const orgListItems = data.pages.flatMap((d) => d.data);
      for (const orgListItem of orgListItems) {
        const { orgId } = orgListItem;
        queryClient.prefetchQuery({
          queryKey: [mwVersion, 'org-details', orgId],
          queryFn: () => getOrgDetails({ orgId }),
        });
      }
    }
  }, [data, isSuccess, mwVersion, queryClient]);

  const [activeOrgId, setActiveOrgId] = useAtom(activeOrgIdAtom);

  const setOrgCountAtom = useSetAtom(orgCountAtom);
  useEffect(() => {
    if (data) {
      setOrgCountAtom(data.pages[0].total);
    }
  }, [data, setOrgCountAtom]);

  const initOrgRef = useRef<OrgListItem | null>(null);
  const orgListItems = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);

    if (initOrg) {
      result = result.filter((d) => d.orgId !== initOrg.orgId);
      result.unshift(initOrg);
      initOrgRef.current = initOrg;
    }

    if (initOrgRef.current) {
      result = result.filter((d) => d.orgId !== initOrgRef.current?.orgId);
      result.unshift(initOrgRef.current);
    }

    return result;
  }, [data, initOrg]);

  const setActiveRef = useRef(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (
      orgListItems.length > 0 &&
      !setActiveRef.current &&
      !activeOrgId &&
      !isMobile
    ) {
      setActiveRef.current = true;
      setActiveOrgId(orgListItems[0].orgId);
    }
  }, [activeOrgId, isMobile, orgListItems, setActiveOrgId]);

  const { asPath, push, query } = useRouter();

  const [orgsPrevLink, setPrevLink] = useAtom(orgsPrevLinkAtom);
  useEffect(() => {
    if (orgListItems.length > 0) {
      setPrevLink(asPath);
    }
  }, [asPath, orgListItems.length, setPrevLink]);

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
    orgListItems,
    orgsPrevLink,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    filterParamsObj,
  };
};
