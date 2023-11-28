import { createColumnHelper } from '@tanstack/react-table';

import { type JobsUpdateableFields } from '@jobstash/admin/core';
import { jobSeniorityMapping } from '@jobstash/jobs/core';

import { Heading, Text } from '@jobstash/shared/ui';

import TableActions from './table-actions/table-actions';
import ListCell from './list-cell';
import NumberCell from './number-cell';
import SelectCell from './select-cell';
import TextCell from './text-cell';
import TextareaCell from './textarea-cell';

const columnHelper = createColumnHelper<JobsUpdateableFields>();

export const columns = [
  columnHelper.accessor('shortUUID', {
    cell: (info) => <Text>{info.getValue()}</Text>,
    header: () => <Heading size="label">ID</Heading>,
    size: 80,
  }),
  columnHelper.accessor('title', {
    cell: TextCell,
    header: () => <Heading size="label">Title</Heading>,
  }),
  columnHelper.accessor('url', {
    cell: TextCell,
    header: () => <Heading size="label">URL</Heading>,
  }),
  columnHelper.accessor('summary', {
    cell: TextareaCell,
    header: () => <Heading size="label">Summary</Heading>,
  }),
  columnHelper.accessor('description', {
    cell: TextareaCell,
    header: () => <Heading size="label">Description</Heading>,
  }),
  columnHelper.accessor('requirements', {
    cell: ListCell,
    header: () => <Heading size="label">Requirements</Heading>,
  }),
  columnHelper.accessor('responsibilities', {
    cell: ListCell,
    header: () => <Heading size="label">Responsibilities</Heading>,
  }),
  columnHelper.accessor('benefits', {
    cell: ListCell,
    header: () => <Heading size="label">Benefits</Heading>,
  }),
  columnHelper.accessor('location', {
    cell: TextCell,
    header: () => <Heading size="label">Location</Heading>,
  }),
  columnHelper.accessor('locationType', {
    cell: (props) => <SelectCell options={['REMOTE', 'ONSITE']} {...props} />,
    header: () => <Heading size="label">Location Type</Heading>,
    size: 160,
  }),
  columnHelper.accessor('classification', {
    cell: TextCell,
    header: () => <Heading size="label">Classification</Heading>,
    size: 160,
  }),
  columnHelper.accessor('seniority', {
    cell: (props) => (
      <SelectCell
        options={Object.entries(jobSeniorityMapping).map(([k, v]) => ({
          label: k,
          value: v,
        }))}
        {...props}
      />
    ),
    header: () => <Heading size="label">Seniority</Heading>,
    size: 140,
  }),
  columnHelper.accessor('commitment', {
    cell: (props) => (
      <SelectCell options={['PART_TIME', 'FULL_TIME']} {...props} />
    ),
    header: () => <Heading size="label">Commitment</Heading>,
    size: 160,
  }),
  columnHelper.accessor('paysInCrypto', {
    cell: (props) => <SelectCell options={['true', 'false']} {...props} />,
    header: () => <Heading size="label">Pays In Crypto</Heading>,
    size: 160,
  }),
  columnHelper.accessor('offersTokenAllocation', {
    cell: (props) => <SelectCell options={['true', 'false']} {...props} />,
    header: () => <Heading size="label">Offers Token Allocation</Heading>,
    size: 160,
  }),
  columnHelper.accessor('salary', {
    cell: NumberCell,
    header: () => <Heading size="label">Salary</Heading>,
    size: 160,
  }),
  columnHelper.accessor('minimumSalary', {
    cell: NumberCell,
    header: () => <Heading size="label">Minimum Salary</Heading>,
    size: 160,
  }),
  columnHelper.accessor('maximumSalary', {
    cell: NumberCell,
    header: () => <Heading size="label">Maximum Salary</Heading>,
    size: 160,
  }),
  columnHelper.accessor('culture', {
    cell: TextareaCell,
    header: () => <Heading size="label">Culture</Heading>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: TableActions,
    header: () => <p>Actions</p>,
    size: 120,
  }),
];
