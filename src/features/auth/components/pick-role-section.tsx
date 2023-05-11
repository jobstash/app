import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const PickRoleSection = ({ className, children }: Props) => (
  <div
    className={`flex items-center justify-center${
      className ? ' ' + className : ''
    }`}
  >
    <div className="flex flex-col space-y-6 rounded-3xl bg-gradient-to-r from-[#141317] to-black/60 p-8">
      <hr className="border-t border-white/10" />
      {children}
    </div>
  </div>
);
