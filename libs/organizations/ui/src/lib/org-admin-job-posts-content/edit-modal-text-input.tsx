import { Input, InputProps } from '@nextui-org/react';

import { FormKey, FormValue, HandleFieldChange } from './types';

interface Props extends InputProps {
  formKey: FormKey;
  formValue: FormValue;
  handleFieldChange: HandleFieldChange;
}

export const EditModalTextInput = ({
  formKey,
  formValue,
  handleFieldChange,
  ...props
}: Props) => (
  <Input
    radius="sm"
    classNames={{
      inputWrapper: 'bg-content2 rounded-md',
    }}
    value={(formValue as string) || ''}
    onChange={(e) => handleFieldChange(formKey, e.target.value)}
    {...props}
  />
);
