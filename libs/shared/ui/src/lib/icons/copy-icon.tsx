import { memo } from 'react';

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 5.5H7C6.44772 5.5 6 5.94772 6 6.5V13C6 13.5523 6.44772 14 7 14H13.5C14.0523 14 14.5 13.5523 14.5 13V6.5C14.5 5.94772 14.0523 5.5 13.5 5.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V3C1.5 2.44772 1.94772 2 2.5 2H9C9.55228 2 10 2.44772 10 3V3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(CopyIcon);