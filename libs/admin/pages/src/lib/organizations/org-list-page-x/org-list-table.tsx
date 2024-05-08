import { AgGridReact } from 'ag-grid-react';

import { useOrgListTable } from './use-org-list-table';

export const OrgListTable = () => {
  const { gridRef, getRowId, rowData, columnDefs, onSelectionChanged } =
    useOrgListTable();

  if (!rowData) return <p>Loading table ...</p>;

  return (
    <AgGridReact
      ref={gridRef}
      debug
      undoRedoCellEditing
      reactiveCustomComponents
      rowMultiSelectWithClick
      stopEditingWhenCellsLoseFocus
      getRowId={getRowId}
      rowData={rowData}
      rowSelection="multiple"
      rowHeight={50}
      columnDefs={columnDefs}
      onSelectionChanged={onSelectionChanged}
    />
  );
};
