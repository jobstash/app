import { useRef } from 'react';

import {
  usePreferredTermsFormContext,
  useTagsContext,
} from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const PrimaryTermInput = () => {
  const { mappedTags: tags } = useTagsContext();
  const { primaryTerm, onChangePrimaryTerm } = usePreferredTermsFormContext();

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
