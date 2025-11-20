import React, { memo } from 'react';

const EthereumIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 64 64"
    fill="none"
    stroke="white"
    {...props}
  >
    <path d="M32 56 16 32 32 8l16 24-16 24z" />
    <path d="m16 32 16 8 16-8" />
    <path d="M32 8v48" />
  </svg>
);

export default memo(EthereumIcon);
