import { memo } from 'react';

export const ActionsIcon = memo(() => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    viewBox="0 0 24 24"
    className="h-6 w-6"
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
));

ActionsIcon.displayName = 'ActionsIcon';
