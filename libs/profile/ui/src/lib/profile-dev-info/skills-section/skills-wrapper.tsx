import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const SkillsWrapper = ({ children }: Props) => (
  <>
    <hr className="border-t border-white/10" />
    <div className="items-center justify-between lg:flex">
      <div className="flex flex-wrap gap-4">{children}</div>
    </div>
  </>
);

export default SkillsWrapper;
