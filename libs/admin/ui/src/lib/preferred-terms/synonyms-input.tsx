import { useRef } from 'react';

import { useTechnologiesStore } from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const SynonymsInput = () => {
  const primaryTerm = useTechnologiesStore((state) => state.primaryTerm);
  const synonymsOptions = useTechnologiesStore(
    (state) => state.synonymsOptions,
  );
  const addSynonym = useTechnologiesStore((state) => state.addSynonym);

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
