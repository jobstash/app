import { NumberInput, Select } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

type StringOnChangeValue = string | null;
type StringOnChange = (value: StringOnChangeValue) => void;

type NumberOnChangeValue = number | '';
type NumberOnChange = (value: NumberOnChangeValue) => void;

interface Props {
  title: string;
  value: string | number | null;
  isDisabled?: boolean;
  numberInput?: boolean;
  options?: string[];
  onChange: StringOnChange | NumberOnChange;
}

const Input = (props: Props) => {
  const {
    title,
    options,
    value,
    onChange,
    numberInput = false,
    isDisabled,
  } = props;

  return (
    <div className="flex items-center gap-8">
      <div className="flex-grow justify-end text-right">
        <Heading size="sm">{title}</Heading>
      </div>
      <div className="w-[70%]">
        {numberInput ? (
          <NumberInput
            hideControls
            size="lg"
            classNames={{
              input: cn(
                'rounded-lg bg-dark-gray text-md placeholder:text-white/50 placeholder:text-md focus:border-white/40',
              ),
            }}
            value={(value as NumberOnChangeValue) ?? ''}
            disabled={isDisabled}
            onChange={onChange as NumberOnChange}
          />
        ) : (
          <Select
            data={options ?? []}
            value={value as StringOnChangeValue}
            size="lg"
            classNames={{
              input: cn(
                'rounded-lg bg-dark-gray text-md placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
              ),
              itemsWrapper: 'bg-dark-gray',
              item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
            }}
            disabled={isDisabled}
            onChange={onChange as StringOnChange}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
