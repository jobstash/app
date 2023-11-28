import { type CellContext } from '@tanstack/react-table';

import { type JobsUpdateableFields } from '@jobstash/admin/core';

import { useAllJobsMutation } from '@jobstash/admin/state';

import { SaveIcon, Spinner, ThrashIcon } from '@jobstash/shared/ui';

import TableActionsButton from './button';

type Props = CellContext<JobsUpdateableFields, unknown>;

const TableActions = ({ table, row }: Props) => {
  const initData = table.options.meta?.allJobs[row.index];
  const currentData = row.original;

  const { isLoading, mutate } = useAllJobsMutation();

  const isChanged = JSON.stringify(initData) !== JSON.stringify(currentData);

  const onClickSave = () => {
    if (mutate) {
      mutate(currentData);
    }
  };

  const onClickReset = () => {
    if (initData) {
      table.options.meta?.resetRow(row.index, initData);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <TableActionsButton
        isDisabled={!isChanged}
        label="Submit Changes"
        icon={<SaveIcon />}
        onClick={onClickSave}
      />

      <TableActionsButton
        isDisabled={!isChanged}
        label="Reset Row"
        icon={
          <svg viewBox="0 0 21 21" fill="currentColor" className="w-5 h-5">
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.578 6.487A8 8 0 112.5 10.5M7.5 6.5h-4v-4" />
            </g>
          </svg>
        }
        onClick={onClickReset}
      />

      <TableActionsButton isDisabled label="Delete Job" icon={<ThrashIcon />} />
    </div>
  );
};

export default TableActions;
