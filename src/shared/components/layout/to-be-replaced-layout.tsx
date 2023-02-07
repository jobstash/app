/* eslint-disable tailwindcss/no-arbitrary-value */

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
  <div className="flex">
    <section className="relative w-[14%] flex-col border-r border-r-zinc-800">
      {sidebar}
    </section>
    <div className="flex grow justify-center">
      <div className="flex w-[95%] max-w-3xl pt-8">
        <div className="flex w-full flex-col space-y-16">{children}</div>
      </div>
    </div>
    <aside className="w-[40%] max-w-2xl border-l border-zinc-800">
      <div className="hide-scrollbar sticky top-0 max-h-screen space-y-6 overflow-y-scroll px-6">
        {rightPanel}
      </div>
    </aside>
  </div>
);
