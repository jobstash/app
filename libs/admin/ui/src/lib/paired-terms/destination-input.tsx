import { useRef } from 'react';

import { useTechnologiesStore } from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const DestinationInput = () => {
  const destinationOptions = useTechnologiesStore(
    (store) => store.destinationOptions,
  );
  const origin = useTechnologiesStore((store) => store.origin);
  const addDestinationTerm = useTechnologiesStore(
    (store) => store.addDestinationTerm,
  );

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (term: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    addDestinationTerm(term);
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

export default DestinationInput;
