import { useAccount } from 'wagmi';

import {
  usePairedTermsContext,
  usePairedTermsStore,
} from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const PairedTermsActions = () => {
  const { address } = useAccount();

  const origin = usePairedTermsStore((state) => state.origin);
  const destinationTerms = usePairedTermsStore(
    (state) => state.destinationTerms,
  );

  const { mutatePairedTerms } = usePairedTermsContext();

  const onSubmit = () => {
    //
    mutatePairedTerms({
      originTerm: origin,
      pairedTermList: destinationTerms,
      creatorWallet: address ?? '',
    });
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

export default PairedTermsActions;
