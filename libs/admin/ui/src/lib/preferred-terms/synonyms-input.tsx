import { useRef } from 'react';

import { usePreferredTermsFormContext } from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const SynonymsInput = () => {
  const { primaryTerm, synonymOptions, addSynonym } =
    usePreferredTermsFormContext();

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (term: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    addSynonym(term);
  };

  return (
    <AdminSelectInput
      ref={selectRef}
      data={synonymOptions}
      placeholder="Select multiple synonym terms"
      isDisabled={!primaryTerm}
      value=""
      onChange={onChange}
    />
  );
};

export default SynonymsInput;
