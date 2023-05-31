import { memo, useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { sidebarOpenAtom } from '@jobstash/sidebar/state';

import JobsBartab from './jobs-bartab';

const JobsBartabMobile = () => {
  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const onClickCb = useCallback(
    () => setSidebarOpen((prev) => !prev),
    [setSidebarOpen],
  );

  return (
    <JobsBartab onClickCb={onClickCb}>
      <span className="text-2xl text-white">Jobs</span>
    </JobsBartab>
  );
};

export default memo(JobsBartabMobile);
