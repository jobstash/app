import { type ReactNode, memo } from 'react';

interface Props {
  children: ReactNode;
}

const JobRightPanelWrapper = ({ children }: Props) => (
  <div className="fixed right-0 top-0 z-10 w-5/12">
    <div className="hide-scrollbar sticky top-0 h-screen space-y-6 overflow-y-scroll bg-dark px-6 py-8 pr-10 pt-2">
      {children}
    </div>
  </div>
);

export default memo(JobRightPanelWrapper);
