import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-custom.css';

import { AgGridReact } from 'ag-grid-react';

import { useOrgListTable } from './use-org-list-table';

export const OrgListTable = () => {
  const {
    isPending,
    gridRef,
    rowData,
    getRowId,
    columnDefs,
    onFocus,
    onBlur,
    onCellEditingStopped,
    onSelectionChanged,
  } = useOrgListTable();

  if (isPending) return <p>Loading table ...</p>;

  return (
    <div
      className="ag-theme-quartz w-full"
      style={{ height: 800 }}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <AgGridReact
        ref={gridRef}
        stopEditingWhenCellsLoseFocus
        undoRedoCellEditing
        reactiveCustomComponents
        rowMultiSelectWithClick
        rowData={rowData}
        rowSelection="multiple"
        getRowId={getRowId}
        columnDefs={columnDefs}
        rowHeight={50}
        onCellEditingStopped={onCellEditingStopped}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
};
