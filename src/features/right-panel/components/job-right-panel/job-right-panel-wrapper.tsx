import { type ReactNode, memo } from 'react';

interface Props {
  children: ReactNode;
}

const JobRightPanelWrapper = ({ children }: Props) => (
  <div className="fixed top-0 right-0 z-10 w-5/12">
    <div className="hide-scrollbar sticky top-0 h-screen space-y-6 overflow-y-scroll bg-dark py-8 px-6 pt-2 pr-10">
      {children}
    </div>
  </div>
);

export default memo(JobRightPanelWrapper);
