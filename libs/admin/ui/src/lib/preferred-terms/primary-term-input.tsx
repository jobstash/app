import { useRef } from 'react';

import {
  usePreferredTermsContext,
  usePreferredTermsFormContext,
} from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const PrimaryTermInput = () => {
  const { primaryTermOptions } = usePreferredTermsContext();
  const { primaryTerm, onChangePrimaryTerm, isExisting } =
    usePreferredTermsFormContext();

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
      data={primaryTermOptions}
      placeholder="Select primary term"
      value={primaryTerm}
      isDisabled={isExisting}
      onChange={onChange}
    />
  );
};

export default PrimaryTermInput;
