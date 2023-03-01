import { ReactNode } from 'react';

interface Props {
  sidebar: ReactNode;
  rightPanel: ReactNode;
  children: ReactNode;
}

export const ToBeReplacedLayout = ({
  sidebar,
  children,
  rightPanel,
}: Props) => (
  <div className="flex flex-wrap bg-app pl-52">
    {sidebar}
    <div className="flex w-2/3 max-w-3xl justify-center p-6">
      <div className="w-full space-y-8">{children}</div>
    </div>
    <aside className="w-1/3 grow">
      <div className="hide-scrollbar sticky top-0 max-h-screen space-y-6 overflow-y-scroll bg-white/5 p-6">
        {rightPanel}
      </div>
    </aside>
  </div>
);
