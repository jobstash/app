import { memo } from 'react';

const ThrashIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-red-500">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M4 8h16v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8zm3-3V3a1 1 0 011-1h8a1 1 0 011 1v2h5v2H2V5h5zm2-1v1h6V4H9zm0 8v6h2v-6H9zm4 0v6h2v-6h-2z" />
  </svg>
);

export default memo(ThrashIcon);
