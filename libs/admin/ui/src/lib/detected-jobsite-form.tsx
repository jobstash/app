import { ChangeEventHandler, useState } from 'react';

import { Button, Chip, Divider } from '@nextui-org/react';
import { UseMutationResult } from '@tanstack/react-query';

import { JOBSITE_TYPES, OnChangeJobsite } from '@jobstash/admin/core';
import { Jobsite } from '@jobstash/shared/core';
import { capitalize, cn } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

import { JobsiteFormFields } from './jobsite-form-fields';

interface Props<R, P> {
  value: Jobsite[];
  isPending: boolean;
  useActivateJobsite: () => UseMutationResult<R, Error, P, unknown>;
  onChangeJobsite: OnChangeJobsite;
  onSubmit: (onSuccess?: () => void) => void;
}

export const DetectedJobsitesForm = <R, P>({
  value,
  isPending,
  useActivateJobsite,
  onChangeJobsite,
  onSubmit,
}: Props<R, P>) =>
  value.length > 0 ? (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex gap-4 items-center">
        {value.length > 0 && <Heading size="md">Detected Jobsites:</Heading>}
      </div>
      {value.map((jobsite, index) => (
        <div key={jobsite.id} className="space-y-4 pl-4 max-w-sm">
          <Divider />
          <DetectedJobsiteItem
            jobsite={jobsite}
            isPending={isPending}
            useActivateJobsite={useActivateJobsite}
            onChangeJobsite={onChangeJobsite}
            onSubmit={onSubmit}
          />
          {index === value.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  ) : null;

interface ItemProps<R, P> {
  jobsite: Jobsite;
  isPending: boolean;
  useActivateJobsite: () => UseMutationResult<R, Error, P, unknown>;
  onChangeJobsite: OnChangeJobsite;
  onSubmit: (onSuccess?: () => void) => void;
}

const DetectedJobsiteItem = <R, P>({
  jobsite,
  isPending,
  useActivateJobsite,
  onChangeJobsite,
  onSubmit,
}: ItemProps<R, P>) => {
  const { id: jobsiteId, url, type } = jobsite;

  const [prevState, setPrevState] = useState(jobsite);
  const [isEditing, setIsEditing] = useState(false);

  const onChangeUrl: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    const updatedJobsite = {
      ...jobsite,
      url: value,
    };

    onChangeJobsite('detectedJobsites', updatedJobsite);
  };

  const onChangeJobsiteType = (selectedKey: string) => {
    const updatedJobsite = {
      ...jobsite,
      type: selectedKey,
    };

    onChangeJobsite('detectedJobsites', updatedJobsite);
  };

  const onSave = () => {
    onSubmit(() => setIsEditing(false));
  };

  const onEdit = () => {
    setPrevState(jobsite);
    setIsEditing(true);
  };

  const onDelete = () => {
    onChangeJobsite('detectedJobsites', jobsite, 'delete');
    onSubmit(() => setIsEditing(false));
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    onChangeJobsite('jobsites', prevState);
  };

  const { mutate: activateJobsite, isPending: isPendingActivation } =
    useActivateJobsite();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onActivate = () => {
    console.log('TODO');
  };

  const isDisabledSave =
    isPending || url.length === 0 || !JOBSITE_TYPES.includes(type);

  return (
    <div
      className={cn(
        'flex flex-col pb-4',
        { 'gap-4': isEditing },
        { 'opacity-40 pointer-events-none': isPending },
      )}
    >
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

            <Chip
              size="sm"
              className={cn('hover:cursor-pointer select-none', {
                'opacity-40 pointer-events-none': isPendingActivation,
              })}
              radius="sm"
              onClick={onActivate}
            >
              Activate
            </Chip>
          </div>
        </>
      )}

      {isEditing && (
        <div className="flex items-center justify-between max-w-xs">
          <div className="flex items-center gap-2">
            <Button size="sm" isDisabled={isDisabledSave} onClick={onSave}>
              Save
            </Button>
            <Button
              variant="light"
              size="sm"
              isDisabled={isPending}
              onClick={onCancelEdit}
            >
              Cancel
            </Button>
          </div>
          <Button
            size="sm"
            isDisabled={isPending}
            color="danger"
            variant="light"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
