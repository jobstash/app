import { type ReactNode, useState } from 'react';

import { Menu } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { Button, FilterIcon } from '@jobstash/shared/ui';

interface Props {
  isSorted: null | 'asc' | 'desc';
  isSortable: boolean;
  children: ReactNode;
  clearSorting: () => void;
  toggleSorting: (desc?: boolean, isMulti?: boolean) => void;
}

const TableHeaderWrapper = (props: Props) => {
  const { isSorted, isSortable, children, clearSorting, toggleSorting } = props;

  const isAscending = isSorted === 'asc';
  const isDescending = isSorted === 'desc';
  const isClear = isSorted === null;

  const sortAscending = () => {
    if (!isAscending) toggleSorting(false);
  };

  const sortDescending = () => {
    if (!isDescending) toggleSorting(true);
  };

  const [showSort, setShowSort] = useState(false);

  return (
    <div
      className={cn('flex items-center gap-2 font-bold text-white text-md')}
      style={{ minHeight: '50px' }}
      onMouseEnter={() => setShowSort(true)}
      onMouseLeave={() => setShowSort(false)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          {children}
          <div>
            {isAscending && ' 🔼'}
            {isDescending && ' 🔽'}
          </div>
        </div>

        <div className="flex gap-1 items-center">
          {isSortable && showSort && (
            <Menu>
              <Menu.Target>
                <Button isIcon>
                  <FilterIcon />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {!isAscending && (
                  <Menu.Item icon={<AscendingIcon />} onClick={sortAscending}>
                    Ascending
                  </Menu.Item>
                )}
                {!isDescending && (
                  <Menu.Item icon={<DesendingIcon />} onClick={sortDescending}>
                    Descending
                  </Menu.Item>
                )}
                {!isClear && (
                  <Menu.Item icon={<RemoveSortIcon />} onClick={clearSorting}>
                    Clear
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHeaderWrapper;

const AscendingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M18.5 17.25a.75.75 0 01-1.5 0V7.56l-2.22 2.22a.75.75 0 11-1.06-1.06l3.5-3.5a.75.75 0 011.06 0l3.5 3.5a.75.75 0 01-1.06 1.06L18.5 7.56v9.69zm-15.75.25a.75.75 0 010-1.5h9.5a.75.75 0 010 1.5h-9.5zm0-5a.75.75 0 010-1.5h5.5a.75.75 0 010 1.5h-5.5zm0-5a.75.75 0 010-1.5h3.5a.75.75 0 010 1.5h-3.5z" />
  </svg>
);

const DesendingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M18.5 16.44V6.75a.75.75 0 00-1.5 0v9.69l-2.22-2.22a.75.75 0 10-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 10-1.06-1.06l-2.22 2.22zM2 7.25a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5A.75.75 0 012 7.25zm0 5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm0 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z" />
  </svg>
);

const RemoveSortIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M3 13h12v-2H3m0-5v2h18V6M3 18h6v-2H3v2m19.54-1.12L20.41 19l2.13 2.12-1.42 1.42L19 20.41l-2.12 2.13-1.41-1.42L17.59 19l-2.12-2.12 1.41-1.41L19 17.59l2.12-2.13 1.42 1.42" />
  </svg>
);
