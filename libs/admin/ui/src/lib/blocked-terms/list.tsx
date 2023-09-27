import {
  useBlockedTermsContext,
  useBlockedTermsFormContext,
} from '@jobstash/admin/state';

import { Heading, Spinner, Text } from '@jobstash/shared/ui';

import AdminTechListItem from '../admin-tech-list-item';

const BlockedTermsList = () => {
  const {
    isFetching: isFetchingBlockedTerms,
    isLoading: isLoadingInitBlockedTerms,
  } = useBlockedTermsContext();
  const { unblockTerm, allBlockedTerms } = useBlockedTermsFormContext();

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
