import { useAccount } from 'wagmi';

import {
  useBlockedTermsContext,
  useBlockedTermsStore,
} from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const BlockedTermsActions = () => {
  const { address } = useAccount();
  const blockedTerms = useBlockedTermsStore((state) => state.blockedTerms);

  const { mutateSetBlockedTerms } = useBlockedTermsContext();

  const onSubmit = () => {
    mutateSetBlockedTerms({
      creatorWallet: address ?? '',
      technologyNameList: blockedTerms,
    });
  };

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 items-center">
        <Button variant="outline" className="px-6">
          Reset
        </Button>
        <Button variant="primary" className="px-6" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BlockedTermsActions;
