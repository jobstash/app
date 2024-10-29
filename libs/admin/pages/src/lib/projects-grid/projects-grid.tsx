import { AgGridReact } from 'ag-grid-react';

import { useProjectsGrid } from './use-projects-grid';

export const ProjectsGrid = () => {
  const {
    gridRef,
    getRowId,
    rowData,
    columnDefs,
    onSelectionChanged,
    onCellEditingStopped,
  } = useProjectsGrid();

  if (!rowData) return <p>Loading table ...</p>;

  return (
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
      rowHeight={50}
      columnDefs={columnDefs}
      onSelectionChanged={onSelectionChanged}
      onCellEditingStopped={onCellEditingStopped}
    />
  );
};
