import { useMemo } from 'react';

import { Input, Switch, Textarea, Tooltip } from '@nextui-org/react';

const TOOLTIP_TEXT =
  'This field is read-only and is currently locked for modification';

interface OrgField {
  label: string;
  value: string | boolean | string[] | null;
  placeholder?: string;
  kind?: 'text' | 'textarea' | 'list' | 'boolean' | 'number';
  disabledLabels?: string[];
  onChange: (value: string | boolean | number) => void;
}

export const FormInputMapper = ({
  label,
  value,
  placeholder = 'N/A',
  kind = 'text',
  disabledLabels,
  onChange,
}: OrgField) => {
  const isDisabled = disabledLabels?.includes(label);

  const content = useMemo(() => {
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
          isDisabled={isDisabled}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }

    if (kind === 'boolean') {
      return (
        <Switch
          color="secondary"
          isSelected={value as boolean}
          isDisabled={isDisabled}
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
          isDisabled={isDisabled}
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
          value={(value as string) || ''}
          variant="bordered"
          radius="sm"
          isDisabled={isDisabled}
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
        isDisabled={isDisabled}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }, [isDisabled, kind, label, onChange, placeholder, value]);

  return (
    <Tooltip isDisabled={!isDisabled} content={TOOLTIP_TEXT}>
      <div>{content}</div>
    </Tooltip>
  );
};
