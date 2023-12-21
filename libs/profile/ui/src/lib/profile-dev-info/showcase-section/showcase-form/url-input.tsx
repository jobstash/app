import { TextInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileShowcaseFormContext } from '@jobstash/profile/state';

const UrlInput = () => {
  const { currentShowcase, onChangeUrl, disabled } =
    useProfileShowcaseFormContext();

  return (
    <TextInput
      disabled={disabled.urlInput}
      placeholder="Enter URL Link"
      size="lg"
      classNames={{
        input: cn(
          'rounded-xl bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
        ),
      }}
      value={currentShowcase.url}
      onChange={onChangeUrl}
    />
  );
};

export default UrlInput;
