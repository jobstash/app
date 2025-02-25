import { Textarea, TextAreaProps } from '@heroui/input';

import { FormKey, FormValue, HandleFieldChange } from './types';

interface Props extends TextAreaProps {
  formKey: FormKey;
  formValue: FormValue;
  handleFieldChange: HandleFieldChange;
}

export const EditModalTextarea = ({
  formKey,
  formValue,
  handleFieldChange,
  ...props
}: Props) => (
  <Textarea
    radius="sm"
    classNames={{
      inputWrapper: 'bg-content2 rounded-md',
    }}
    value={(formValue as string) || ''}
    onChange={(e) => handleFieldChange(formKey, e.target.value)}
    {...props}
  />
);
