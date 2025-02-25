import { ChangeEventHandler } from 'react';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Input } from '@heroui/input';

import { JOBSITE_TYPES } from '@jobstash/admin/core';
import { Jobsite } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

interface Props {
  formState: Omit<Jobsite, 'id'>;
  isDisabled: boolean;
  onChangeUrl: ChangeEventHandler<HTMLInputElement>;
  onChangeJobsiteType: (selectedKey: string) => void;
}

export const JobsiteFormFields = ({
  formState: { url, type },
  isDisabled,
  onChangeUrl,
  onChangeJobsiteType,
}: Props) => (
  <>
    <Input
      size="sm"
      label="Url"
      placeholder="Enter jobsite url"
      radius="sm"
      className="max-w-xs"
      isDisabled={isDisabled}
      value={url}
      onChange={onChangeUrl}
    />
    <Autocomplete
      size="sm"
      label="Jobsite Type"
      radius="sm"
      className="max-w-xs"
      isDisabled={isDisabled}
      selectedKey={type}
      onSelectionChange={(key) => onChangeJobsiteType((key as string) ?? '')}
    >
      {JOBSITE_TYPES.map((type) => (
        <AutocompleteItem key={type}>{capitalize(type)}</AutocompleteItem>
      ))}
    </Autocomplete>
  </>
);
