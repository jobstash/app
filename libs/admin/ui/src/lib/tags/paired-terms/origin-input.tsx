import { useRef } from 'react';

import {
  usePairedTermsContext,
  usePairedTermsFormContext,
  useTagsContext,
} from '@jobstash/admin/state';

import AdminSelectInput from '../../admin-select-input';

const OriginInputX = () => {
  const { mappedTags } = useTagsContext();
  const { existingPairedTerms } = usePairedTermsContext();

  const { origin, initOrigin, onChangeOrigin } = usePairedTermsFormContext();

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (value: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    onChangeOrigin(value);
  };

  const hasInitOrigin = Boolean(initOrigin);

  const originOptions = hasInitOrigin
    ? mappedTags
    : mappedTags.filter((t) => !existingPairedTerms.includes(t));

  return (
    <AdminSelectInput
      ref={selectRef}
      isDisabled={hasInitOrigin}
      data={originOptions}
      placeholder="Select Origin Term"
      value={origin}
      onChange={onChange}
    />
  );
};

export default OriginInputX;
