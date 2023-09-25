import { useRef } from 'react';

import { useTechnologiesStore } from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const PrimaryTermInput = () => {
  const technologies = useTechnologiesStore((state) => state.technologies);
  const primaryTerm = useTechnologiesStore((state) => state.primaryTerm);
  const onChangePrimaryTerm = useTechnologiesStore(
    (state) => state.onChangePrimaryTerm,
  );

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (v: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    onChangePrimaryTerm(v);
  };

  return (
    <AdminSelectInput
      ref={selectRef}
      data={technologies}
      placeholder="Select primary term"
      value={primaryTerm}
      onChange={onChange}
    />
  );
};

export default PrimaryTermInput;
