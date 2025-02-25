import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { Select, TextInput } from '@mantine/core';

import { UserShowcase } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { useProfileShowcaseContext } from '@jobstash/profile/state';

import DeleteItemIcon from './delete-item-icon';
import ShowcaseItemLayout from './showcase-item-layout';

interface Props {
  showcase: UserShowcase;
}

const ShowcaseItem = ({ showcase }: Props) => {
  const { id, url, label } = showcase;
  const { isLoading, removeShowcase, updatedId } = useProfileShowcaseContext();

  const remove = () => removeShowcase(id);

  return (
    <ShowcaseItemLayout
      labelInput={
        <Select
          disabled
          data={[]}
          size="lg"
          classNames={{
            input: cn(
              'cursor-pointer rounded-xl bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
            ),
          }}
          searchValue={label}
        />
      }
      urlInput={
        <TextInput
          disabled
          placeholder="Enter document URL"
          size="lg"
          classNames={{
            input: cn(
              'cursor-pointer rounded-xl bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
            ),
          }}
          value={url}
        />
      }
      iconButton={
        <Button isIconOnly isDisabled={isLoading.mutation} onClick={remove}>
          {id === updatedId ? (
            <Spinner size="sm" color="white" />
          ) : (
            <DeleteItemIcon />
          )}
        </Button>
      }
    />
  );
};

export default ShowcaseItem;
