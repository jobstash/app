import { useRef } from 'react';

import { usePairedTermsFormContext } from '@jobstash/admin/state';

import AdminSelectInput from '../../admin-select-input';

const DestinationInputX = () => {
  const { origin, destinationOptions, addDestination } =
    usePairedTermsFormContext();

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (value: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    addDestination(value);
  };

  return (
    <AdminSelectInput
      ref={selectRef}
      data={destinationOptions}
      placeholder="Select multiple destination terms"
      isDisabled={!origin}
      value=""
      onChange={onChange}
    />
  );
};

export default DestinationInputX;
