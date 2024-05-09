import React, { useState } from 'react';

import { Chip, Divider, Selection } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';

import { Heading } from '@jobstash/shared/ui';

import { orgData } from './org-data';

export const OrgHighlights = () => {
  const [values, setValues] = useState<Selection>(new Set([]));

  const onRemove = (value: React.Key) => {
    setValues((prev) => {
      const newValues = new Set(prev);
      newValues.delete(value.toString());

      return newValues;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading size="sm">Pick orgs for which to highlight candidates:</Heading>
      <div className="pl-4 flex flex-col gap-4 max-w-4xl">
        <Select
          className="w-96"
          size="md"
          selectionMode="multiple"
          label="Select Organizations"
          selectedKeys={values}
          onSelectionChange={setValues}
        >
          {orgData.map((org) => (
            <SelectItem key={org.name} value={org.name}>
              {org.name}
            </SelectItem>
          ))}
        </Select>

        {[...values].length > 0 && (
          <>
            <Divider />

            <div className="flex gap-3 items-center flex-wrap">
              {[...values].map((value) => (
                <Chip
                  key={value}
                  size="lg"
                  radius="sm"
                  variant="faded"
                  // ClassNames={{
                  //   base: 'px-3 py-5',
                  // }}
                  onClose={() => onRemove(value)}
                >
                  {value}
                </Chip>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
