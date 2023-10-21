import { Select, TextInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileDevInfoContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

import DeleteItemIcon from './delete-item-icon';
import ShowcaseItemLayout from './showcase-item-layout';

interface Props {
  label: string;
  url: string;
}

const ShowcaseItem = (props: Props) => {
  const { url, label: selectedOption } = props;
  const { removeShowcase } = useProfileDevInfoContext();

  const remove = () => removeShowcase(selectedOption);

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
          searchValue={selectedOption}
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
        <Button isIcon onClick={remove}>
          <DeleteItemIcon />
        </Button>
      }
    />
  );
};

export default ShowcaseItem;
