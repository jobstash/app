import { memo } from 'react';

const AddTechIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" rx="8" fill="#FFE6E2" />
    <rect
      x="1.60156"
      y="1.6001"
      width="12.8"
      height="12.8"
      rx="6.4"
      fill="#FFE6E2"
    />
    <path
      d="M8.4 4.4C8.4 4.17909 8.22091 4 8 4C7.77909 4 7.6 4.17909 7.6 4.4V7.6H4.4C4.17909 7.6 4 7.77909 4 8C4 8.22091 4.17909 8.4 4.4 8.4H7.6V11.6C7.6 11.8209 7.77909 12 8 12C8.22091 12 8.4 11.8209 8.4 11.6V8.4H11.6C11.8209 8.4 12 8.22091 12 8C12 7.77909 11.8209 7.6 11.6 7.6H8.4V4.4Z"
      fill="#161618"
      stroke="black"
      stroke-width="0.2"
      stroke-linecap="round"
    />
  </svg>
);

export default memo(AddTechIcon);
