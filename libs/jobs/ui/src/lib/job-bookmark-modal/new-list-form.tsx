import { useState } from 'react';

import { Button, cn, Input, Switch } from '@nextui-org/react';
import { EarthIcon } from 'lucide-react';

import { notifSuccess } from '@jobstash/shared/utils';

import { useCreateJobFolder } from '@jobstash/jobs/state';

import { Heading } from '@jobstash/shared/ui';

interface Props {
  toggleContent: () => void;
  currentJobId: string | undefined;
}

export const NewListForm = ({ toggleContent, currentJobId }: Props) => {
  const { mutate, isPending } = useCreateJobFolder();

  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const onCreate = () => {
    if (currentJobId) {
      mutate(
        {
          jobs: [currentJobId],
          name,
          isPublic,
        },
        {
          onSuccess() {
            notifSuccess({
              title: 'Job Post Saved',
              message: `Job post has been added to "${name}"`,
            });
            toggleContent();
          },
        },
      );
    }
  };

  const isDisabledCreate = !name || isPending;

  return (
    <div className="flex flex-col gap-4">
      <Input
        size="lg"
        radius="sm"
        label="Name"
        isDisabled={isPending}
        classNames={{
          inputWrapper: 'bg-content2 rounded-md',
        }}
        value={name}
        onValueChange={setName}
      />
      <Switch
        color="secondary"
        classNames={{
          base: cn(
            'inline-flex flex-row-reverse w-full max-w-full bg-content2 items-center',
            'justify-between cursor-pointer rounded-md gap-2 px-4 py-2.5 border-2 border-transparent',
          ),
          wrapper: 'p-0 h-4 overflow-visible',
          thumb: cn(
            'w-6 h-6 border-2 shadow-lg',
            'group-data-[selected=true]:ml-6',
            'group-data-[pressed=true]:w-7',
            'group-data-[selected]:group-data-[pressed]:ml-4',
          ),
        }}
        isDisabled={isPending}
        isSelected={isPublic}
        onValueChange={setIsPublic}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <EarthIcon className="w-4 h-4 fill-gray-700" />
            <Heading size="sm">Visible for everyone</Heading>
          </div>
          <p className="text-sm text-default-400">
            Enable public sharing or restrict to private.
          </p>
        </div>
      </Switch>

      <div className="flex justify-center w-full gap-4 pt-4">
        <Button
          fullWidth
          disableRipple
          variant="light"
          isDisabled={isPending}
          onClick={toggleContent}
        >
          Cancel
        </Button>
        <Button fullWidth isDisabled={isDisabledCreate} onClick={onCreate}>
          Create List
        </Button>
      </div>
    </div>
  );
};
