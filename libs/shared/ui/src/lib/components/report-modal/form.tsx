import { useRef, useState } from 'react';

import { Textarea, TextInput } from '@mantine/core';
import { UseMutateFunction } from '@tanstack/react-query';

import { cn } from '@jobstash/shared/utils';

import Button from '../../base/button/button';
import Heading from '../../base/heading';
import Text from '../../base/text';

import ReportModalDropzone from './dropzone';

interface Props {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, Record<string, unknown>, unknown>;
}

const ReportModalForm = ({ isLoading, mutate }: Props) => {
  const ref = useRef(null);

  const [attachments, setAttachments] = useState<{ path: string }[]>([]);

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (ref.current) {
      const formData = new FormData(ref.current);

      const payload = {};

      // eslint-disable-next-line unicorn/no-array-for-each
      formData.forEach((v, k) => {
        Object.assign(payload, { [k]: v });
      });

      Object.assign(payload, { attachments });

      mutate(payload);
    }
  };

  return (
    <form
      ref={ref}
      className={cn('flex flex-col gap-6 pt-0 p-2 relative', {
        'opacity-70 pointer-events-none': isLoading,
      })}
      onSubmit={submit}
    >
      <TextInput
        name="subject"
        label={
          <Heading size="sm" fw="semibold">
            Subject
          </Heading>
        }
        placeholder={subjectPlaceholder}
        size="lg"
        classNames={{
          label: 'pb-2',
          input: inputClassName,
        }}
        disabled={isLoading}
      />

      <Textarea
        autosize
        name="description"
        label={
          <Heading size="sm" fw="semibold">
            Description
          </Heading>
        }
        descriptionProps={{
          className: 'text-right pt-2 pr-2',
        }}
        minRows={3}
        classNames={{
          label: 'pb-2',
          input: inputClassName,
        }}
        placeholder={textareaPlaceholder}
        disabled={isLoading}
      />

      <ReportModalDropzone
        isDisabled={isLoading}
        attachments={attachments}
        setAttachments={setAttachments}
      />

      <div>
        <Button type="submit" variant="primary" isDisabled={isLoading}>
          <Text fw="semibold">Submit Report</Text>
        </Button>
      </div>
    </form>
  );
};

export default ReportModalForm;

const inputClassName =
  'rounded-lg bg-dark text-md text-white/60 focus:border-white/30 p-4';
const subjectPlaceholder = 'Incorrect data';
const textareaPlaceholder =
  "Detail the report's content, emphasizing any inconsistencies or inaccuracies in the data. Note flawed findings and areas that require validation or correction.";
