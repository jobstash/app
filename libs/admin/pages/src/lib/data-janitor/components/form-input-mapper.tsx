import { Input, Textarea } from '@nextui-org/react';

interface OrgField {
  label: string;
  value: string | string[];
  placeholder?: string;
  kind?: 'text' | 'textarea' | 'list' | 'jobsite';
  onChange: (value: string) => void;
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
        value={value ? (Array.isArray(value) ? value.join(', ') : value) : ''}
        variant="bordered"
        radius="sm"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (kind === 'textarea') {
    return (
      <Textarea
        label={label}
        placeholder={placeholder}
        value={value as string}
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
        value={value as string}
        variant="bordered"
        radius="sm"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={value as string}
      variant="bordered"
      radius="sm"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
