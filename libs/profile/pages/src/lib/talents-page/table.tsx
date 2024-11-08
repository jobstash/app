import { AgGridReact } from 'ag-grid-react';

import { UserAvailableForWork } from '@jobstash/shared/core';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';

import { useTalentsTable } from './use-talents-table';
import { SearchInput } from 'libs/profile/pages/src/lib/talents-page/search-input';

interface Props {
  rowData: UserAvailableForWork[] | undefined;
}

export const DevTalentsTable = ({ rowData }: Props) => {
  const {
    gridRef,
    getRowId,
    columnDefs,
    onChangeQuickFilter,
    //
    // onCellEditingStopped,
  } = useTalentsTable();
  return (
    <div className="flex flex-col gap-4 p-8">
      <SearchInput onChangeFilter={onChangeQuickFilter} />
      <div className="ag-theme-quartz w-full" style={{ height: 680 }}>
        <AgGridReact
          ref={gridRef}
          undoRedoCellEditing
          enableCellTextSelection
          ensureDomOrder
          suppressRowClickSelection
          undoRedoCellEditingLimit={5}
          getRowId={getRowId}
          rowData={rowData}
          rowSelection="multiple"
          columnDefs={columnDefs}
          defaultColDef={{
            cellRenderer: EmptyCellPlaceholder,
            sortable: false,
          }}
          //
          // onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
};
