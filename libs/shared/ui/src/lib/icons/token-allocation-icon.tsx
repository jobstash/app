import { memo } from 'react';

const TokenAllocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    className="stroke-2 fill-white"
  >
    <circle cx="26.67" cy="32.67" r="2.67" />
    <circle cx="37.33" cy="43.33" r="2.67" />
    <line x1="37.33" y1="30" x2="26.67" y2="46" />
    <rect x="8" y="24" width="48" height="28" />
    <line x1="12" y1="18" x2="52" y2="18" />
    <line x1="16" y1="12" x2="48" y2="12" />
  </svg>
);

export default memo(TokenAllocationIcon);
