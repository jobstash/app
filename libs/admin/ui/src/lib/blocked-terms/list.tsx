import {
  useBlockedTechnologiesQuery,
  useTechnologiesStore,
} from '@jobstash/admin/state';

import { Heading, Spinner, Text } from '@jobstash/shared/ui';

import AdminTechListItem from '../admin-tech-list-item';

const BlockedTermsList = () => {
  const blockedTerms = useTechnologiesStore((state) => state.blockedTerms);
  const fetchedBlockedTerms = useTechnologiesStore(
    (state) => state.fetchedBlockedTerms,
  );
  const unblockTerm = useTechnologiesStore((state) => state.unblockTerm);
  const unblockedTerms = useTechnologiesStore((state) => state.unblockedTerms);

  const allBlockedTerms = [...blockedTerms, ...fetchedBlockedTerms].filter(
    (term) => !unblockedTerms.includes(term),
  );

  const { isFetchingBlockedTerms, isLoadingInitBlockedTerms } =
    useBlockedTechnologiesQuery();

  return (
    <div className="flex items-start gap-6">
      <div className="w-1/3 flex justify-end">
        <Heading size="sm" fw="semibold">
          List of Blocked Terms
        </Heading>
      </div>
      <div className="w-full gap-8">
        {isFetchingBlockedTerms && !isLoadingInitBlockedTerms ? (
          <Spinner />
        ) : (
          <div className="flex gap-4 items-center flex-wrap">
            {allBlockedTerms.length > 0 ? (
              allBlockedTerms.map((tech) => (
                <AdminTechListItem
                  key={tech}
                  tech={tech}
                  onRemove={(term) => unblockTerm(term)}
                />
              ))
            ) : (
              <Text color="dimmed" size="lg">
                No blocked terms
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockedTermsList;
