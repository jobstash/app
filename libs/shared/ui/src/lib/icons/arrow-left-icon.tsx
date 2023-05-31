import { memo } from 'react';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={12} fill="none">
    <path
      fill="#9CA3AF"
      fillRule="evenodd"
      d="M6.925.558a.59.59 0 0 1 0 .884L2.438 5.558a.59.59 0 0 0 0 .884l4.487 4.116a.589.589 0 0 1 0 .884.726.726 0 0 1-.963 0L1.474 7.326c-.799-.732-.799-1.92 0-2.652L5.962.558a.726.726 0 0 1 .963 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export default memo(ArrowLeftIcon);
