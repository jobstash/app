import { useRef } from 'react';

import { Select } from '@mantine/core';

import { useBlockedTermsStore } from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

const BlockedTermsInput = () => {
  const { options, blockTerm } = useBlockedTermsStore((state) => ({
    options: state.options,
    blockTerm: state.blockTerm,
  }));

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (blockedTerm: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    blockTerm(blockedTerm);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="w-1/3 flex justify-end">
        <Heading size="sm" fw="semibold">
          Block Term
        </Heading>
      </div>
      <div className="w-full">
        <Select
          ref={selectRef}
          searchable
          data={options}
          maxDropdownHeight={320}
          nothingFound="Nothing found"
          placeholder="Select term to block"
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
      </div>
    </div>
  );
};

export default BlockedTermsInput;
