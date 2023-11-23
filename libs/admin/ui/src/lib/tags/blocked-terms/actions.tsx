import { useBlockedTermsFormContext } from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const BlockedTermsActions = () => {
  const {
    onSubmit,
    isFetchingQuery,
    isLoadingMutation,
    fetchedBlockedTerms,
    allBlockedTerms,
  } = useBlockedTermsFormContext();

  const isFetched =
    JSON.stringify(fetchedBlockedTerms) === JSON.stringify(allBlockedTerms);

  const isDisabled = [isFetchingQuery, isLoadingMutation, isFetched].includes(
    true,
  );

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 items-center">
        <Button
          variant="primary"
          className="px-6"
          isDisabled={isDisabled}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BlockedTermsActions;
