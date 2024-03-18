import { Dispatch, SetStateAction } from 'react';

import { Pagination } from '@nextui-org/pagination';

interface Props {
  page: number;
  total: number;
  isDisabled: boolean;
  onChange: Dispatch<SetStateAction<number>>;
  totalApplicantCount?: number;
}

export const TablePagination = ({
  page,
  total,
  isDisabled,
  onChange,
  totalApplicantCount,
}: Props) => (
  <div className="py-2 px-2 flex justify-between items-center">
    <Pagination
      showControls
      classNames={{
        cursor: 'bg-foreground text-background',
      }}
      color="default"
      page={page}
      total={total}
      variant="light"
      isDisabled={isDisabled}
      onChange={onChange}
    />
    <span className="text-small text-default-400">
      {`Total Applicants: ${totalApplicantCount}`}
    </span>
  </div>
);
