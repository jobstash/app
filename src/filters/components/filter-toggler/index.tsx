'use client';

import { Button } from '@nextui-org/react';

import { FilterIcon } from '~/shared/components/icons/filter-icon';
import { PrimaryButton } from '~/shared/components/primary-button';

import { useFilterToggler } from './use-filter-toggler';

interface Props {
  children: React.ReactNode;
  countSection: React.ReactNode;
}

export const FilterToggler = (props: Props) => {
  const { children, countSection } = props;

  const {
    initializedFilters,
    isPendingFilters,
    toggleStyle,
    buttonText,
    toggleOpen,
    isOpen,
    applyFilters,
    clearFilters,
    isDisabledApply,
    isDisabledClear,
  } = useFilterToggler();

  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          startContent={
            initializedFilters && !isPendingFilters && <FilterIcon />
          }
          style={toggleStyle}
          onClick={toggleOpen}
          isLoading={!initializedFilters || isPendingFilters}
        >
          {buttonText}
        </Button>
        {countSection}
      </div>

      {isOpen && (
        <>
          {children}

          <div className="flex gap-4">
            <PrimaryButton
              text="Apply Filters"
              classNames={{
                button: 'cursor-pointer',
              }}
              onClick={applyFilters}
              isDisabled={isDisabledApply}
            />
            <Button onClick={clearFilters} isDisabled={isDisabledClear}>
              Clear Filters
            </Button>
          </div>
        </>
      )}
    </>
  );
};
