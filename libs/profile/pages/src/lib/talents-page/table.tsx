import { AgGridReact } from 'ag-grid-react';

import { DevTalent } from '@jobstash/profile/core';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';

import { QuickFilterInput } from './quick-filter-input';
import { useTalentsTable } from './use-talents-table';

const QUICK_FILTER_PLACEHOLDER = 'Search available talents ...';

interface Props {
  rowData: DevTalent[] | undefined;
}

export const DevTalentsTable = ({ rowData }: Props) => {
  const {
    gridRef,
    getRowId,
    columnDefs,
    onCellEditingStopped,
    onChangeQuickFilter,
  } = useTalentsTable();
  return (
    <div className="flex flex-col gap-4 px-12">
      <QuickFilterInput
        placeholder={QUICK_FILTER_PLACEHOLDER}
        onChange={onChangeQuickFilter}
      />
      <div className="ag-theme-quartz w-full" style={{ height: 680 }}>
        <AgGridReact
          ref={gridRef}
          debug
          undoRedoCellEditing
          enableCellTextSelection
          ensureDomOrder
          suppressRowClickSelection
          undoRedoCellEditingLimit={5}
          getRowId={getRowId}
          rowData={rowData}
          rowSelection="multiple"
          rowHeight={120}
          columnDefs={columnDefs}
          defaultColDef={{
            cellRenderer: EmptyCellPlaceholder,
            sortable: false,
          }}
          onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
};
