import { useRef } from 'react';

import { useTagsStore } from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const SynonymsInput = () => {
  const primaryTerm = useTagsStore((state) => state.primaryTerm);
  const synonymsOptions = useTagsStore((state) => state.synonymsOptions);
  const addSynonym = useTagsStore((state) => state.addSynonym);

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
      data={synonymsOptions}
      placeholder="Select multiple synonym terms"
      isDisabled={!primaryTerm}
      value=""
      onChange={onChange}
    />
  );
};

export default SynonymsInput;
