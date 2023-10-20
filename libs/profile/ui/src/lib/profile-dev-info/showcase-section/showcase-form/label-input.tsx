import { Select, Tooltip } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileShowcaseFormContext } from '@jobstash/profile/state';

const LabelInput = () => {
  const { currentShowcase, options, onCreateLabel, onChangeLabel, errors } =
    useProfileShowcaseFormContext();

  const hasError = Boolean(errors.label);

  return (
    <Tooltip label={errors.label} opened={hasError} color="dark">
      <Select
        key={currentShowcase.label}
        searchable
        creatable
        error={hasError}
        data={options}
        placeholder="Select ..."
        getCreateLabel={(query) => `+ Create "${query}"`}
        size="lg"
        classNames={{
          input: cn(
            'cursor-pointer rounded-xl bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
          ),
          itemsWrapper: 'bg-dark-gray',
          item: '[&[data-hovered]]:bg-gray [&[data-selected]]:bg-gray',
        }}
        value={currentShowcase.label}
        onCreate={onCreateLabel}
        onChange={onChangeLabel}
      />
    </Tooltip>
  );
};

export default LabelInput;
