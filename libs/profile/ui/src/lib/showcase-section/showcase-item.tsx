import { Select, TextInput } from '@mantine/core';

import { ProfileShowcase } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useProfileShowcaseContext } from '@jobstash/profile/state';

import { Button, Spinner } from '@jobstash/shared/ui';

import DeleteItemIcon from './delete-item-icon';
import ShowcaseItemLayout from './showcase-item-layout';

interface Props {
  showcase: ProfileShowcase;
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
          placeholder="Enter URL Link"
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
        id === updatedId ? (
          <Spinner />
        ) : (
          <Button isIcon isDisabled={isLoading.mutation} onClick={remove}>
            <DeleteItemIcon />
          </Button>
        )
      }
    />
  );
};

export default ShowcaseItem;
