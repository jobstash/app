import { useMemo } from 'react';

import { usePairedTermsFormContext } from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const PairedTermsActions = () => {
  const { origin, destination, initDestination, mutate } =
    usePairedTermsFormContext();

  const onSubmit = () => {
    if (origin) {
      mutate({
        originTag: origin,
        pairedTagList: destination,
      });
    }
  };

  const isDisabled = useMemo(
    () =>
      JSON.stringify(destination.sort()) ===
      JSON.stringify(initDestination.sort()),
    [destination, initDestination],
  );

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 items-center">
        <Button
          isDisabled={isDisabled}
          variant="primary"
          className="px-6"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PairedTermsActions;
