/* eslint-disable tailwindcss/no-arbitrary-value */

import { ReactNode } from 'react';

interface Props {
  sideBar: ReactNode;
  rightPanel: ReactNode;
  children: ReactNode;
}

export const GenericLayout = ({ sideBar, children, rightPanel }: Props) => (
  <div className="flex">
    <section className="relative w-[14%] flex-col border-r border-r-zinc-800">
      {sideBar}
    </section>
    <div className="flex grow justify-center">
      <div className="flex w-[95%] max-w-3xl flex-col items-center">
        {children}
      </div>
    </div>
    <aside className="w-[40%] max-w-2xl border-l border-zinc-800">
      {rightPanel}
    </aside>
  </div>
);
