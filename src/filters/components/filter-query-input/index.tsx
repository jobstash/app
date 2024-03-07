'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Kbd } from '@nextui-org/kbd';
import { Spinner } from '@nextui-org/spinner';

import { SearchInputIcon } from '~/shared/components/icons/search-input-icon';

import { useFilterQueryInput } from './use-filter-query-input';

interface Props {
  placeholder: string;
}

export const FilterQueryInput = ({ placeholder }: Props) => {
  const { onSubmit, isPending, applyQuery, value, setValue } =
    useFilterQueryInput();

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          isDisabled={isPending}
          placeholder={placeholder}
          classNames={{
            inputWrapper: ['bg-darkest-gray dark:hover:bg-darker-gray'],
          }}
          startContent={
            isPending ? (
              <Spinner size="sm" color="white" />
            ) : (
              <SearchInputIcon />
            )
          }
          endContent={
            <Button
              aria-label="Search"
              className="bg-transparent"
              onClick={applyQuery}
            >
              <Kbd keys={['enter']}>Search</Kbd>
            </Button>
          }
          value={value}
          onValueChange={setValue}
        />
      </form>
    </>
  );
};
