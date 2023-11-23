import { useRef } from 'react';

import { useBlockedTermsFormContext } from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

import AdminSelectInput from '../../admin-select-input';

const BlockedTermsInput = () => {
  const { blockTerm, options } = useBlockedTermsFormContext();

  const onChange = (term: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    blockTerm(term);
  };

  const selectRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex items-center gap-6">
      <div className="w-1/3 flex justify-end">
        <Heading size="sm" fw="semibold">
          Block Term
        </Heading>
      </div>
      <div className="w-full">
        <AdminSelectInput
          ref={selectRef}
          data={options}
          placeholder="Select term to block"
          value=""
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default BlockedTermsInput;
