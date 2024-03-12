import { memo } from 'react';

export const MainnetIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="cyan"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      color="cyan"
    />
  </svg>
));

MainnetIcon.displayName = 'MainnetIcon';
