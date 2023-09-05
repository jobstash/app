import { useAccount } from 'wagmi';

import {
  usePairedTermsMutation,
  useTechnologiesStore,
} from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const PairedTermsActions = () => {
  const { address } = useAccount();

  const origin = useTechnologiesStore((state) => state.origin);
  const destinationTerms = useTechnologiesStore(
    (state) => state.destinationTerms,
  );

  const { mutatePairedTerms } = usePairedTermsMutation();

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
