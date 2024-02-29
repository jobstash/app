import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEventHandler, useRef } from 'react';

import {
  LoadingOverlay,
  NumberInput as BaseNumberInput,
  Textarea as BaseTextarea,
  TextInput as BaseTextInput,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

import { cn, notifError, notifSuccess } from '@jobstash/shared/utils';

import { Button, Text } from '@jobstash/shared/ui';

const TextInput = ({
  name,
  label,
  placeholder,
  isNumber,
}: {
  name: string;
  label: string;
  placeholder: string;
  isNumber?: boolean;
}) =>
  isNumber ? (
    <BaseNumberInput
      size="lg"
      radius="md"
      name={name}
      label={label}
      placeholder={placeholder}
      styles={{
        input: {
          background: 'rgba(255, 255, 255, 0.1)',
          fontSize: 16,
          border: 'transparent',
        },
      }}
      classNames={{
        input: 'py-7 bg-white/10',
      }}
    />
  ) : (
    <BaseTextInput
      size="lg"
      radius="md"
      name={name}
      label={label}
      placeholder={placeholder}
      styles={{
        input: {
          background: 'rgba(255, 255, 255, 0.1)',
          fontSize: 16,
          border: 'transparent',
        },
      }}
      classNames={{
        input: 'py-7 bg-white/10',
      }}
    />
  );

const Textarea = ({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
}) => (
  <BaseTextarea
    size="lg"
    radius="md"
    name={name}
    label={label}
    placeholder={placeholder}
    minRows={4}
    styles={{
      input: {
        background: 'rgba(255, 255, 255, 0.1)',
        fontSize: 16,
        border: 'transparent',
      },
    }}
    classNames={{
      input: 'py-3 bg-white/10',
    }}
  />
);

const JobSubmission = () => {
  const formRef = useRef(null);

  const router = useRouter();

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: (data: Record<string, string | number>) =>
      fetch('api/job-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    onSuccess() {
      notifSuccess({ message: 'Job details have been submitted' });
      router.push('/');
    },
    onError() {
      notifError();
    },
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = new FormData(formRef.current!);

    const result: Record<string, string | number> = {};

    // eslint-disable-next-line unicorn/no-array-for-each
    data.forEach((v, k) => {
      if (v) {
        result[k] = v as string | number;
      }
    });

    mutate(result);
  };

  return (
    <div>
      <div className="flex w-full justify-center py-14">
        <div className="flex flex-col gap-4 items-center">
          <Image
            priority
            width="202"
            height="32"
            src="/JobStash.svg"
            alt="Job Stash"
          />
          <Text size="lg" color="dimmed">
            Put some text in here related to this job-submission form
          </Text>
        </div>
      </div>
      <form
        ref={formRef}
        className={cn(
          'pb-20 relative',
          // {
          //   'opacity-40  pointer-events-none': isPending,
          // }
        )}
        onSubmit={submit}
      >
        <LoadingOverlay visible={isPending} />
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen text-center md:px-[10%]">
          {/* LEFT */}
          <div className="text-left p-8">
            <div className="flex flex-col gap-8">
              <TextInput
                name="title"
                label="Title"
                placeholder="Senior Frontend Engineer"
              />
              <TextInput
                name="applyUrl"
                label="Apply URL"
                placeholder="https://jobstash.xyz/careers/123456"
              />
              <TextInput
                name="location"
                label="Location"
                placeholder="Remote / New York"
              />
              <Textarea
                name="role"
                label="Job Description"
                placeholder="You'll collaborate with cross-functional teams to design and develop TypeScript based applications using React, React Native, Next.js and/or Node.js. You'll write highly performant, clean, simple, and maintainable code, and take responsibility for creating highly scalable UI Components and/or backend modules. "
              />
              <TextInput
                name="seniority"
                label="Seniority"
                placeholder="Lead, Senior, Junior, Intern, etc"
              />
              <TextInput
                name="salary"
                label="Salary"
                placeholder="$60,000 - $80,000"
              />
              <TextInput
                name="commitment"
                label="Commitment"
                placeholder="Part-time / Full-time"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-left p-8">
            <div className="flex flex-col gap-8">
              <TextInput
                name="timeZone"
                label="Time Zone"
                placeholder="GMT+2"
              />
              <Textarea
                name="techStack"
                label="Tech Stack"
                placeholder="Typescript, React, NextJS, TailwindCSS, MUI, Redux, GraphQL, NodeJS, Docker, GCP, Github Actions"
              />
              <Textarea
                name="benefits"
                label="Benefits"
                placeholder="Two weeks paid vacation, 12 weeks maternity/paternity leave, 7 year post termination option exercise window, 100% coverage of medical/vision/dental benefits, Commuter benefits, Fertility support, Learning & Development budget, Deep crypto education"
              />
              <Textarea
                name="team"
                label="About Team"
                placeholder="You'll be working alongside a talented team of individuals at Birthday Research, Cake Group's Blockchain Research and Development arm. The team is focused on cryptographic research, deep blockchain consensus development, and smart contracts development."
              />
              <Textarea
                name="culture"
                label="Work Culture"
                placeholder="Culture is defined by 7 team principles: Integrity, Resourcefulness, Ownership, Meritocratic Decision-making, Customer Obsession, Radical Candour, and Passion. These principles guide the company, its people, and their work. The company prides itself on its culture, which has been instrumental to its success."
              />
              <Textarea
                name="otherSkills"
                label="Other Skills"
                placeholder="Good communication skills, Agile Methodology, etc"
              />
            </div>
          </div>
        </div>
        {/* SUBMIT */}
        <div className="flex justify-end md: px-[10%]">
          <div className="px-8">
            <Button type="submit" isDisabled={isPending}>
              {isPending ? 'Loading' : isSuccess ? 'Redirecting' : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobSubmission;
