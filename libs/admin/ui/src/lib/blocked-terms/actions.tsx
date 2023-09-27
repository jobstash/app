import {
  useBlockedTermsFormContext,
  useBlockedTermsMutationContext,
} from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const BlockedTermsActions = () => {
  const { currentBlockedTerms, currentUnblockedTerms } =
    useBlockedTermsFormContext();

  const { mutateSetBlockedTerms, mutateUnsetBlockedTerms } =
    useBlockedTermsMutationContext();

  const onSubmit = () => {
    if (currentBlockedTerms.length > 0) {
      mutateSetBlockedTerms({
        technologyNameList: currentBlockedTerms,
      });
    }

    if (currentUnblockedTerms.length > 0) {
      mutateUnsetBlockedTerms({
        technologyNameList: currentUnblockedTerms,
      });
    }
  };

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 items-center">
        <Button variant="primary" className="px-6" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BlockedTermsActions;
