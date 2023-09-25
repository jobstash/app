import {
  usePairedTermsMutation,
  useTechnologiesStore,
} from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const PairedTermsActions = () => {
  const origin = useTechnologiesStore((state) => state.origin);
  const destinationTerms = useTechnologiesStore(
    (state) => state.destinationTerms,
  );

  const { mutate } = usePairedTermsMutation();

  const onSubmit = () => {
    //
    mutate({
      originTerm: origin,
      pairedTermList: destinationTerms,
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
