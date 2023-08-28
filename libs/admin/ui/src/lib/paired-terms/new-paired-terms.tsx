import { useRef } from 'react';

import { Select } from '@mantine/core';

import { usePairedTermsStore } from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

import PairedTermsContentWrapper from './content-wrapper';

const NewPairedTerms = () => {
  const origins = usePairedTermsStore((store) => store.origins);

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (term: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    console.log('TODO: ');
  };

  return (
    <PairedTermsContentWrapper>
      {/* NewPairedTermInput */}
      <div className="flex items-center gap-6">
        <div className="w-1/3 flex justify-end">
          <Heading size="sm" fw="semibold">
            Origin
          </Heading>
        </div>
        <div className="w-full">
          <Select
            ref={selectRef}
            searchable
            data={origins}
            maxDropdownHeight={320}
            nothingFound="Nothing found"
            placeholder="Type here ..."
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
    </PairedTermsContentWrapper>
  );
};

export default NewPairedTerms;
