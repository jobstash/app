import {
  useBlockedTermsContext,
  useBlockedTermsStore,
} from '@jobstash/admin/state';

import { Heading, Spinner, Text } from '@jobstash/shared/ui';

import AdminTechListItem from '../admin-tech-list-item';

const BlockedTermsList = () => {
  const blockedTerms = useBlockedTermsStore((state) => state.blockedTerms);
  const fetchedBlockedTerms = useBlockedTermsStore(
    (state) => state.fetchedBlockedTerms,
  );
  const unblockTerm = useBlockedTermsStore((state) => state.unblockTerm);
  const unblockedTerms = useBlockedTermsStore((state) => state.unblockedTerms);

  const allBlockedTerms = [...blockedTerms, ...fetchedBlockedTerms].filter(
    (term) => !unblockedTerms.includes(term),
  );

  const { isFetchingBlockedTerms, isLoading } = useBlockedTermsContext();

  return (
    <div className="flex items-start gap-6">
      <div className="w-1/3 flex justify-end">
        <Heading size="sm" fw="semibold">
          List of Blocked Terms
        </Heading>
      </div>
      <div className="w-full gap-8">
        {isFetchingBlockedTerms && !isLoading ? (
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
