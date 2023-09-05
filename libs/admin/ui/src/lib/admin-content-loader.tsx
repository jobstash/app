import { memo } from 'react';

import { Loader } from '@jobstash/shared/ui';

const AdminContentLoader = () => (
  <div className="p-40 w-full flex items-center justify-center">
    <Loader />
  </div>
);

export default memo(AdminContentLoader);
