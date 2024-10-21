import { Input, Switch, Textarea } from '@nextui-org/react';

interface OrgField {
  label: string;
  value: string | boolean | string[];
  placeholder?: string;
  kind?: 'text' | 'textarea' | 'list' | 'jobsite' | 'boolean' | 'number';
  onChange: (value: string | boolean | number) => void;
}

export const FormInputMapper = ({
  label,
  value,
  placeholder = 'N/A',
  kind = 'text',
  onChange,
}: OrgField) => {
  if (kind === 'list') {
    return (
      <Textarea
        label={`${label} (comma separated)`}
        placeholder={placeholder}
        value={
          value
            ? Array.isArray(value)
              ? value.join(', ')
              : (value as string) || ''
            : ''
        }
        variant="bordered"
        radius="sm"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (kind === 'boolean') {
    return (
      <Switch
        color="secondary"
        isSelected={value as boolean}
        onValueChange={(newValue) => onChange(newValue)}
      >
        {label}
      </Switch>
    );
  }

  if (kind === 'textarea') {
    return (
      <Textarea
        label={label}
        placeholder={placeholder}
        value={(value as string) || ''}
        variant="bordered"
        radius="sm"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (kind === 'jobsite') {
    return (
      <Textarea
        label={label}
        placeholder={placeholder}
        value={(value as string) || ''}
        variant="bordered"
        radius="sm"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (kind === 'number') {
    return (
      <Input
        label={label}
        type="number"
        placeholder={placeholder}
        value={(value as string) || '0'}
        variant="bordered"
        radius="sm"
        onChange={(e) => {
          const { value: inputValue } = e.target;
          const newValue = Number.isNaN(inputValue) ? 0 : Number(inputValue);
          onChange(newValue);
        }}
      />
    );
  }

  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={(value as string) || ''}
      variant="bordered"
      radius="sm"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
