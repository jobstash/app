import { useAccount } from 'wagmi';

import {
  useBlockedTermsContext,
  useBlockedTermsStore,
} from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const BlockedTermsActions = () => {
  const { address } = useAccount();
  const blockedTerms = useBlockedTermsStore((state) => state.blockedTerms);
  const unblockedTerms = useBlockedTermsStore((state) => state.unblockedTerms);

  const { mutateSetBlockedTerms, mutateUnsetBlockedTerms } =
    useBlockedTermsContext();

  const onSubmit = () => {
    const creatorWallet = address ?? '';
    if (blockedTerms.length > 0) {
      mutateSetBlockedTerms({
        creatorWallet,
        technologyNameList: blockedTerms,
      });
    }

    if (unblockedTerms.length > 0) {
      mutateUnsetBlockedTerms({
        creatorWallet: address ?? '',
        technologyNameList: unblockedTerms,
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
