import { type ChangeEventHandler } from 'react';

import { TextInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileShowcaseContext } from '@jobstash/profile/state';

const UrlInput = () => {
  const { isLoading, editedShowcase, setEditedShowcase } =
    useProfileShowcaseContext();

  const onChangeUrl: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditedShowcase({ ...editedShowcase, url: e.currentTarget.value });
  };

  return (
    <TextInput
      placeholder={isLoading.mutation ? editedShowcase.url : 'Enter URL Link'}
      size="lg"
      classNames={{
        input: cn(
          'rounded-xl bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
        ),
      }}
      disabled={isLoading.mutation || !editedShowcase.label}
      value={editedShowcase.url}
      onChange={onChangeUrl}
    />
  );
};

export default UrlInput;
