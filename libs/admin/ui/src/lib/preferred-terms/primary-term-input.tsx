import { useRef } from 'react';

import { useTagsStore } from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const PrimaryTermInput = () => {
  const tags = useTagsStore((state) => state.tags);
  const primaryTerm = useTagsStore((state) => state.primaryTerm);
  const onChangePrimaryTerm = useTagsStore(
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
      data={tags}
      placeholder="Select primary term"
      value={primaryTerm}
      onChange={onChange}
    />
  );
};

export default PrimaryTermInput;
