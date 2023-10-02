import { useState } from 'react';

import { Select } from '@mantine/core';

import { CaretDownIcon } from '@jobstash/shared/ui';

const searchOptions = ['Job Postings', 'Organizations', 'dApp Projects'];

const HomeSearchSelection = () => {
  const [value, setValue] = useState(searchOptions[0]);

  return (
    <Select
      withinPortal
      data={searchOptions}
      defaultValue={searchOptions[0]}
      value={value}
      size="lg"
      rightSectionWidth={20}
      rightSection={<CaretDownIcon />}
      color="red"
      classNames={{
        input: 'bg-transparent border-none text-lg w-36 pl-4',
        dropdown: 'bg-darker-gray',
        item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray [&[data-hovered]&[data-selected]]:bg-dark-gray text-md',
        rightSection: 'pointer-events-none',
      }}
      dropdownPosition="bottom"
      onChange={(v) => setValue(v ?? searchOptions[0])}
    />
  );
};

export default HomeSearchSelection;
