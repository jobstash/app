import { memo } from 'react';

const Spinner = () => (
  <div className="pl-1 flex items-center">
    <div
      className="animate-spin2 opacity-40 inline-block w-5 h-5 border-2 border-current border-t-transparent text-tertiary rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default memo(Spinner);
