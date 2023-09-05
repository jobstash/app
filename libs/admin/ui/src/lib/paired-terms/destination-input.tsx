import { useRef } from 'react';

import { Select } from '@mantine/core';

import { useTechnologiesStore } from '@jobstash/admin/state';

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
    <Select
      ref={selectRef}
      searchable
      disabled={!origin}
      data={destinationOptions}
      maxDropdownHeight={320}
      placeholder="Select multiple destination terms"
      size="lg"
      classNames={{
        input:
          'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
      }}
      value=""
      onChange={onChange}
    />
  );
};

export default DestinationInput;
