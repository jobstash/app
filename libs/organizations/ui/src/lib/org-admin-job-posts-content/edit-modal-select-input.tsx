import { Autocomplete, AutocompleteProps } from '@heroui/autocomplete';
import { SelectItem } from '@heroui/select';

import { FormKey, FormValue, HandleFieldChange } from './types';

interface Props extends Omit<AutocompleteProps, 'children'> {
  formKey: FormKey;
  formValue: FormValue;
  options: string[] | { label: string; value: string }[];
  handleFieldChange: HandleFieldChange;
}

export const EditModalSelectInput = ({
  formKey,
  formValue,
  options,
  handleFieldChange,
  ...props
}: Props) => (
  <Autocomplete
    inputProps={{
      classNames: {
        inputWrapper: 'bg-content2 rounded-md',
      },
    }}
    isClearable={false}
    selectedKey={formValue as string}
    onSelectionChange={(value) =>
      handleFieldChange(formKey, value as FormValue)
    }
    {...props}
  >
    {options.map((options) => {
      const key = typeof options === 'string' ? options : options.value;
      const label = typeof options === 'string' ? options : options.label;
      return <SelectItem key={key}>{label}</SelectItem>;
    })}
  </Autocomplete>
);
