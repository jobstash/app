import { useRef } from 'react';

import { Select } from '@mantine/core';

import { usePairedTermsStore } from '@jobstash/admin/state';

const DestinationInput = () => {
  const destinationOptions = usePairedTermsStore(
    (store) => store.destinationOptions,
  );
  const origin = usePairedTermsStore((store) => store.origin);
  const addDestinationTerm = usePairedTermsStore(
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
        itemsWrapper: 'bg-dark',
        item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
      }}
      value=""
      onChange={onChange}
    />
  );
};

export default DestinationInput;
