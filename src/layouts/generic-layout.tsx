import { ReactNode } from 'react';

interface Props {
  sideBar: ReactNode;
  rightPanel: ReactNode;
  children: ReactNode;
}

export const GenericLayout = ({ sideBar, children, rightPanel }: Props) => (
  <div className="flex">
    <section className="relative basis-2/12 flex-col border-r border-r-zinc-800">
      {sideBar}
    </section>
    <div className="min-h-[4000px] flex-1 px-8">
      <div className="flex flex-col justify-center">{children}</div>
    </div>
    <aside className="basis-[8/24] border-l border-zinc-800">
      {rightPanel}
    </aside>
  </div>
);
