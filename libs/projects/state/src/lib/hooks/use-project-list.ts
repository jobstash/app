import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';

import { type ProjectInfo } from '@jobstash/shared/core';
import { createProjectsFilterParamsObj } from '@jobstash/projects/utils';

import { useIsMobile } from '@jobstash/shared/state';
import { getProjectDetails } from '@jobstash/projects/data';

import { activeProjectIdAtom } from '../atoms/active-project-id-atom';
import { projectCountAtom } from '../atoms/project-count-atom';
import { projectsPrevLinkAtom } from '../atoms/projects-prev-link-atom';

import { useProjectListQuery } from './use-project-list-query';

export const useProjectList = (initProject: ProjectInfo | null) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isSuccess,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useProjectListQuery();

  // Prefetch project items
  // (react-query breaking change v5 - removed onSuccess)
  useEffect(() => {
    if (data && isSuccess) {
      const projectListItems = data.pages.flatMap((d) => d.data);
      for (const projectListItem of projectListItems) {
        const { id } = projectListItem;
        queryClient.prefetchQuery({
          queryKey: ['project-details', id],
          queryFn: () => getProjectDetails(id),
        });
      }
    }
  }, [data, isSuccess]);

  const [activeProject, setActiveProject] = useAtom(activeProjectIdAtom);

  const setProjectCountAtom = useSetAtom(projectCountAtom);
  useEffect(() => {
    if (data) {
      setProjectCountAtom(data.pages[0].total);
    }
  }, [data, setProjectCountAtom]);

  const initProjectRef = useRef<ProjectInfo | null>(null);
  const projectListItems = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);

    if (initProject) {
      result = result.filter((d) => d.id !== initProject.id);
      result.unshift(initProject);
      initProjectRef.current = initProject;
    }

    if (initProjectRef.current) {
      result = result.filter((d) => d.id !== initProjectRef.current?.id);
      result.unshift(initProjectRef.current);
    }

    return result;
  }, [data, initProject]);

  const setActiveRef = useRef(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (
      projectListItems.length > 0 &&
      !setActiveRef.current &&
      !activeProject &&
      !isMobile
    ) {
      setActiveRef.current = true;
      setActiveProject(projectListItems[0].id);
    }
  }, [activeProject, isMobile, projectListItems, setActiveProject]);

  const { asPath, push, query } = useRouter();

  const [projectsPrevLink, setPrevLink] = useAtom(projectsPrevLinkAtom);
  useEffect(() => {
    if (projectListItems.length > 0) {
      setPrevLink(asPath);
    }
  }, [asPath, projectListItems.length, setPrevLink]);

  const { ref: inViewRef, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const filterParamsObj = createProjectsFilterParamsObj(query);

  return {
    push,
    isLoading,
    error,
    projectListItems,
    projectsPrevLink,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    filterParamsObj,
  };
};
