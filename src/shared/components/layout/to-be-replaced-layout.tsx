import { ReactNode } from 'react';

interface Props {
  sidebar: ReactNode;
  rightPanel: ReactNode;
  children: ReactNode;
}
// eslint-disable-next-line no-warning-comments
// TODO: Rework this background
const style = {
  background:
    'linear-gradient(116.16deg, #141317 3.32%, rgba(18, 18, 22, 0.7) 96.7%)',
};

export const ToBeReplacedLayout = ({
  sidebar,
  children,
  rightPanel,
}: Props) => (
  <div className="flex flex-wrap pl-52" style={style}>
    {sidebar}
    <div className="flex w-2/3 flex-1 justify-center p-6">
      <div className="w-full space-y-8">{children}</div>
    </div>
    <aside className="w-1/3 shrink-0">
      <div className="hide-scrollbar sticky top-0 max-h-screen space-y-6 overflow-y-scroll bg-white/5 p-6">
        {rightPanel}
      </div>
    </aside>
  </div>
);
