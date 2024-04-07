'use client';

import { cn } from '~/shared/utils/cn';
import { reloadPage } from '~/shared/utils/reload-page';
import { InternalErrorResult } from '~/shared/components/internal-error-result';
import { VirtualWrapper } from '~/shared/components/virtual-wrapper';

import { useProjectList } from '~/projects/hooks/use-project-list';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

import { ProjectCard } from './project-card';

export const ProjectList = () => {
  const {
    projects,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending: isPendingList,
  } = useProjectList();
  const hasProjects = projects.length > 0;

  const { isPendingFilters, filterSearchParams } = useFiltersContext();

  const isPending = [isPendingFilters, isPendingList].includes(true);

  const filterParamsString =
    filterSearchParams.size > 0 ? `${filterSearchParams.toString()}` : '';

  return (
    <>
      {error && <InternalErrorResult onReset={reloadPage} />}

      {isPending ? (
        <p>Card Skeleton</p>
      ) : isSuccess && hasProjects ? (
        <>
          <div>
            <p>Init project card</p>
            <p>{JSON.stringify({ filterParamsString })}</p>
          </div>

          <VirtualWrapper count={projects.length}>
            {(index) => (
              <div className={cn({ 'pt-8': index > 0 })}>
                <ProjectCard
                  project={projects[index]}
                  filterParamsString={filterParamsString}
                />
              </div>
            )}
          </VirtualWrapper>

          {hasNextPage ? (
            <div ref={inViewRef}>
              <p>Card Skeleton</p>
            </div>
          ) : (
            <p>TODO: No more projects UI</p>
          )}
        </>
      ) : (
        <p>Empty UI</p>
      )}
    </>
  );
};
