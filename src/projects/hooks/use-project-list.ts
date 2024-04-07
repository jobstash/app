import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtom } from 'jotai';

import { HREFS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';
import { initPathAtom } from '~/shared/atoms/init-path-atom';

import { projectQueryKeys } from '~/projects/core/query-keys';
import { initProjectAtom } from '~/projects/atoms/init-project-atom';
import { projectTotalCountAtom } from '~/projects/atoms/project-total-count-atom';
import { getProjectDetails } from '~/projects/api/get-project-details';

import { useProjectListQuery } from './use-project-list-query';

export const useProjectList = () => {
  const queryClient = getQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isPending,
    isFetching,
  } = useProjectListQuery();

  // Sync total count
  const [totalCount, setTotalCount] = useAtom(projectTotalCountAtom);
  useEffect(() => {
    const currentTotal = data?.pages[0].total ?? 0;
    if (data && currentTotal !== totalCount) {
      setTotalCount(currentTotal);
    }
  }, [data, setTotalCount, totalCount]);

  // Prefetch project details
  useEffect(() => {
    if (isSuccess && data) {
      const items = data.pages.flatMap((d) => d.data);
      for (const item of items) {
        const { id } = item;
        queryClient.prefetchQuery({
          queryKey: projectQueryKeys.details(id),
          queryFn: () => getProjectDetails({ projectId: id }),
        });
      }
    }
  }, [data, isSuccess, queryClient]);

  // Next page fetch on scroll
  const { ref: inViewRef } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && !error && !isFetching) fetchNextPage();
    },
  });

  const [initPath] = useAtom(initPathAtom);
  const isProjectListSSR = initPath === HREFS.PROJECTS_PAGE;

  const [initProject] = useAtom(initProjectAtom);
  const allProjects = data?.pages.flatMap((d) => d.data) ?? [];

  // Dedupe init-card if not list-page ssr
  const projects = !isProjectListSSR
    ? allProjects.filter((d) => d.id !== initProject?.id)
    : allProjects;

  return {
    projects,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending,
  };
};
