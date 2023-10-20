import { TextInput, Tooltip } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileShowcaseFormContext } from '@jobstash/profile/state';

const UrlInput = () => {
  const { currentShowcase, onChangeUrl, errors, disabled } =
    useProfileShowcaseFormContext();

  const hasError = Boolean(errors.url);

  return (
    <Tooltip label={errors.url} opened={hasError} color="dark">
      <TextInput
        error={hasError}
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
    </Tooltip>
  );
};

export default UrlInput;
