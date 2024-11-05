import { ChangeEventHandler, useState } from 'react';

import { Button, Chip, Divider } from '@nextui-org/react';

import { JOBSITE_TYPES, OnChangeJobsite } from '@jobstash/admin/core';
import { Jobsite } from '@jobstash/shared/core';
import { capitalize, cn } from '@jobstash/shared/utils';

import { useCreateProjectJobsite } from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

import { JobsiteFormFields } from './jobsite-form-fields';
import { JobsiteModal } from './jobsite-modal';

interface Props {
  id: string;
  value: Jobsite[];
  isPending: boolean;
  onChangeJobsite: OnChangeJobsite;
  onSubmit: (onSuccess?: () => void) => void;
}

export const ProjectJobsitesForm = ({
  id,
  value,
  isPending,
  onChangeJobsite,
  onSubmit,
}: Props) => (
  <div className="flex flex-col gap-4 pb-8">
    <div className="flex gap-4 items-center">
      {value.length > 0 && <Heading size="md">Jobsites:</Heading>}
      <JobsiteModal id={id} useCreateJobsite={useCreateProjectJobsite} />
    </div>
    {value.map((jobsite, index) => (
      <div key={jobsite.id} className="space-y-4 pl-4 max-w-sm">
        <Divider />
        <JobsiteItem
          jobsite={jobsite}
          isPending={isPending}
          onChangeJobsite={onChangeJobsite}
          onSubmit={onSubmit}
        />
        {index === value.length - 1 && <Divider />}
      </div>
    ))}
  </div>
);

interface JobsiteItemProps {
  jobsite: Jobsite;
  isPending: boolean;
  onChangeJobsite: OnChangeJobsite;
  onSubmit: (onSuccess?: () => void) => void;
}

const JobsiteItem = ({
  jobsite,
  isPending,
  onChangeJobsite,
  onSubmit,
}: JobsiteItemProps) => {
  const { id, url, type } = jobsite;

  const [prevState, setPrevState] = useState(jobsite);
  const [isEditing, setIsEditing] = useState(false);

  const onChangeUrl: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    const updatedJobsite = {
      ...jobsite,
      url: value,
    };

    onChangeJobsite('jobsites', updatedJobsite);
  };

  const onChangeJobsiteType = (selectedKey: string) => {
    const updatedJobsite = {
      ...jobsite,
      type: selectedKey,
    };

    onChangeJobsite('jobsites', updatedJobsite);
  };

  const onSave = () => {
    onSubmit(() => setIsEditing(false));
  };

  const onEdit = () => {
    setPrevState(jobsite);
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    onChangeJobsite('jobsites', prevState);
  };

  const isDisabledSave =
    isPending || url.length === 0 || !JOBSITE_TYPES.includes(type);

  return (
    <div key={id} className={cn('flex flex-col pb-4', { 'gap-4': isEditing })}>
      {isEditing ? (
        <JobsiteFormFields
          formState={jobsite}
          isDisabled={isPending}
          onChangeUrl={onChangeUrl}
          onChangeJobsiteType={onChangeJobsiteType}
        />
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span>URL: </span>
            <Heading size="sm">{url}</Heading>
          </div>

          <div className="flex items-center gap-2">
            <span>Type: </span>
            <Heading size="sm">{capitalize(type)}</Heading>

            <Chip
              size="sm"
              className="hover:cursor-pointer select-none"
              radius="sm"
              onClick={onEdit}
            >
              Edit
            </Chip>
          </div>
        </>
      )}

      {isEditing && (
        <div className="flex items-center gap-2">
          <Button size="sm" isDisabled={isDisabledSave} onClick={onSave}>
            Save
          </Button>
          <Button size="sm" isDisabled={isPending} onClick={onCancelEdit}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};
