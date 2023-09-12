import { useRef } from 'react';

import { useTechnologiesStore } from '@jobstash/admin/state';

import AdminSelectInput from '../admin-select-input';

const OriginInput = () => {
  const technologies = useTechnologiesStore((store) => store.technologies);
  const origin = useTechnologiesStore((store) => store.origin);
  const onChangeOrigin = useTechnologiesStore((store) => store.onChangeOrigin);

  const selectRef = useRef<HTMLInputElement | null>(null);

  const onChange = (origin: string) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    onChangeOrigin(origin);
  };

  return (
    <AdminSelectInput
      ref={selectRef}
      data={technologies}
      placeholder="Select origin term"
      value={origin}
      onChange={onChange}
    />
  );
};

export default OriginInput;
