import { forwardRef, useState } from 'react';

import { CustomCellEditorProps } from 'ag-grid-react';
import { useSetAtom } from 'jotai';

import { OrgEditPayload, OrgRowItem, UrlStatus } from '@jobstash/admin/core';

import { orgEditRowPayloadAtom } from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

interface Props extends CustomCellEditorProps<OrgRowItem> {
  rowKey: 'jobsite' | 'detectedJobsite';
}

export const JobsiteEditor = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    const {
      node,
      data: rowData,
      rowKey,
      stopEditing,
      value,
      onValueChange,
    } = props;

    const [currentValue, setCurrentValue] = useState(
      JSON.stringify(
        // Map input-value to edited value
        rowData[rowKey].map((jobsite, index) => ({
          id: jobsite.id,
          url: value[index].url ?? jobsite.url,
          type: value[index].type ?? jobsite.type,
        })),
        undefined,
        '\t',
      ),
    );

    const xxx = rowData[rowKey].map((j, i) => {
      console.log({ j, i });
      return {
        id: j.id,
        url: value[i].url,
        type: value[i].type,
      };
    });

    console.log({ xxx, rowData, currentValue, value });

    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setCurrentValue(e.target.value);
    };

    const setRowPayload = useSetAtom(orgEditRowPayloadAtom);

    const save = () => {
      try {
        const parsed = JSON.parse(currentValue);
        if (!Array.isArray(parsed)) return;

        // If parsed is empty array, no-op
        // onCellEditingStopped handler takes care of the payload
        if (parsed.length === 0) return;

        setRowPayload({ ...rowData, [rowKey + 's']: parsed } as OrgEditPayload);

        const newWebsiteStatus: UrlStatus[] = [];

        for (const url of parsed.flatMap((p) => p.url)) {
          newWebsiteStatus.push({
            url,
            status: 'pending',
            statusCode: undefined,
          });
        }

        onValueChange(newWebsiteStatus);

        console.log({ parsed });

        node.updateData({ ...rowData, [rowKey]: parsed });
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

JobsiteEditor.displayName = 'JobsiteEditor';
