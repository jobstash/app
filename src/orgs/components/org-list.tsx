import { cn } from '~/shared/utils/cn';
import { reloadPage } from '~/shared/utils/reload-page';
import { InternalErrorResult } from '~/shared/components/internal-error-result';
import { VirtualWrapper } from '~/shared/components/virtual-wrapper';

import { useOrgList } from '~/orgs/hooks/use-org-list';
import { JobCardSkeleton } from '~/jobs/components/job-card/skeleton';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

import { InitOrgCard } from './init-org-card';
import { OrgCard } from './org-card';

export const OrgList = () => {
  const {
    orgs,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending: isPendingOrgs,
  } = useOrgList();
  const hasOrgs = orgs.length > 0;

  const { isPendingFilters, filterSearchParams } = useFiltersContext();

  const isPending = [isPendingFilters, isPendingOrgs].includes(true);

  const filterParamsString =
    filterSearchParams.size > 0 ? `?${filterSearchParams.toString()}` : '';

  return (
    <>
      {error && <InternalErrorResult onReset={reloadPage} />}

      {isPending ? (
        <JobCardSkeleton />
      ) : (
        isSuccess &&
        (hasOrgs ? (
          <>
            <div>
              <InitOrgCard filterParamsString={filterParamsString} />
            </div>

            <VirtualWrapper count={orgs.length}>
              {(index) => (
                <div className={cn({ 'pt-8': index > 0 })}>
                  <OrgCard
                    orgItem={orgs[index]}
                    filterParamsString={filterParamsString}
                  />
                </div>
              )}
            </VirtualWrapper>

            {hasNextPage ? (
              <div ref={inViewRef}>
                <JobCardSkeleton />
              </div>
            ) : (
              <p>TODO: No more orgs UI</p>
            )}
          </>
        ) : (
          <p>TODO: Empty UI</p>
        ))
      )}
    </>
  );
};
