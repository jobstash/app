import { useRef } from 'react';

import { Select } from '@mantine/core';

import { useTechnologiesStore } from '@jobstash/admin/state';

const OriginInput = () => {
  const technologies = useTechnologiesStore((store) => store.technologies);
  const origin = useTechnologiesStore((store) => store.origin);
  const onChangeOrigin = useTechnologiesStore((store) => store.onChangeOrigin);

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (origin: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    onChangeOrigin(origin);
  };

  return (
    <Select
      ref={selectRef}
      searchable
      data={technologies}
      maxDropdownHeight={320}
      nothingFound="Nothing found"
      placeholder="Select origin term"
      size="lg"
      classNames={{
        input:
          'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
        itemsWrapper: 'bg-dark',
        item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
      }}
      value={origin}
      onChange={onChange}
    />
  );
};

export default OriginInput;
