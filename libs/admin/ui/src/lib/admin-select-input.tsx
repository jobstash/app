import { forwardRef } from 'react';

import { Select, type SelectProps } from '@mantine/core';

interface Props {
  data: SelectProps['data'];
  placeholder: SelectProps['placeholder'];
  isDisabled?: boolean;
  value: SelectProps['value'];
  onChange: SelectProps['onChange'];
}

const AdminSelectInput = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { data, placeholder, isDisabled, value, onChange } = props;

    // Have to include value as option, otherwise it'll not show on existing terms
    const options = isDisabled && value ? [value, ...data] : data;

    return (
      <Select
        ref={ref}
        searchable
        data={options}
        maxDropdownHeight={320}
        nothingFound="Nothing found"
        placeholder={placeholder}
        size="lg"
        classNames={{
          input:
            'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
        }}
        disabled={isDisabled}
        value={value}
        onChange={onChange}
      />
    );
  },
);

AdminSelectInput.displayName = 'AdminSelectInput';

export default AdminSelectInput;
