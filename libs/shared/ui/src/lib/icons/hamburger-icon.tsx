import { memo } from 'react';

const HamburgerIcon = () => (
  <svg
    width="24"
    height="11"
    viewBox="0 0 24 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 10.4062H23C23.5523 10.4062 24 9.95853 24 9.40625C24 8.85396 23.5523 8.40625 23 8.40625H1C0.447715 8.40625 0 8.85396 0 9.40625C0 9.95853 0.447715 10.4062 1 10.4062Z"
      fill="#F9FAFB"
    />
    <path
      d="M1 2.40625H23C23.5523 2.40625 24 1.95853 24 1.40625C24 0.853965 23.5523 0.40625 23 0.40625H1C0.447715 0.40625 0 0.853965 0 1.40625C0 1.95853 0.447715 2.40625 1 2.40625Z"
      fill="#F9FAFB"
    />
  </svg>
);

export default memo(HamburgerIcon);
