import { Select } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileShowcaseContext } from '@jobstash/profile/state';

const LabelInput = () => {
  const { editedShowcase, isLoading, setEditedShowcase, options, addOption } =
    useProfileShowcaseContext();

  // Label input handler
  const onChangeLabel = (v: string | null) => {
    setEditedShowcase({ ...editedShowcase, label: v ?? '' });
  };

  // Add new label
  const onCreateLabel = (v: string) => {
    addOption(v);
    return v;
  };

  return (
    <Select
      searchable
      creatable
      withinPortal
      data={options}
      placeholder={isLoading.mutation ? editedShowcase.label : 'Select ...'}
      getCreateLabel={(query) => `+ Create "${query}"`}
      size="lg"
      classNames={{
        input: cn(
          'cursor-pointer rounded-xl bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
        ),
        itemsWrapper: 'bg-dark-gray',
        item: '[&[data-hovered]]:bg-gray [&[data-selected]]:bg-gray',
      }}
      disabled={isLoading.mutation}
      value={editedShowcase.label}
      onCreate={onCreateLabel}
      onChange={onChangeLabel}
    />
  );
};

export default LabelInput;
