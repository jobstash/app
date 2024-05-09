import React, { forwardRef, useState } from 'react';

import { CustomCellEditorProps } from 'ag-grid-react';

import { UrlStatus } from '@jobstash/admin/core';

import { Button } from '@jobstash/shared/ui';

export const UrlEditor = forwardRef<HTMLDivElement, CustomCellEditorProps>(
  (props: CustomCellEditorProps, ref) => {
    const { value, onValueChange, stopEditing } = props;

    const [currentValue, setCurrentValue] = useState(
      JSON.stringify(
        (value as UrlStatus[]).map((status) => status.url),
        undefined,
        '\t',
      ),
    );

    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setCurrentValue(e.target.value);
    };

    const save = () => {
      try {
        const newWebsiteStatus: UrlStatus[] = [];
        const parsed = JSON.parse(currentValue) as string[];

        if (!Array.isArray(parsed)) return;

        for (const url of parsed) {
          newWebsiteStatus.push({
            url,
            status: 'pending',
            statusCode: undefined,
          });
        }

        onValueChange(newWebsiteStatus);
      } catch {}

      stopEditing();
    };

    const onSubmit: React.FormEventHandler = (e) => {
      e.preventDefault();
      save();
    };

    return (
      <div
        ref={ref}
        className="p-4 min-w-[300px] sm:min-w-[420px] h-80 bg-dark"
      >
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <textarea
            className="textarea p-2"
            value={currentValue}
            rows={6}
            onBlur={save}
            onChange={onChange}
          />
          <Button type="submit" size="sm">
            Save
          </Button>
        </form>
      </div>
    );
  },
);

UrlEditor.displayName = 'UrlEditor';
