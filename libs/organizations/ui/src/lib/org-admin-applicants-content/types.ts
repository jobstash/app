import { CustomCellRendererProps } from 'ag-grid-react';

import { JobApplicant } from '@jobstash/jobs/core';

export type CellProps = CustomCellRendererProps<JobApplicant>;
