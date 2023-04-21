import { type ReactNode, memo } from 'react';

interface Props {
  children: ReactNode;
}

const JobRightPanelWrapper = ({ children }: Props) => <div>{children}</div>;

export default memo(JobRightPanelWrapper);
