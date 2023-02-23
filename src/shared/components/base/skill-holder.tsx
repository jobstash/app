import Image from 'next/image';
import { type ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

const cvaSkillHolder = cva(
  [
    'relative mb-3 mr-3 flex self-start rounded-sm border text-white border-white p-1',
  ],
  {
    variants: {
      type: {
        react: 'text-react',
        jest: 'text-jest',
        html: 'text-html',
        cplus: 'text-cplus',
        webgl: 'text-webgl',
        css: 'text-css',
        typescript: 'text-typescript',
        docker: 'text-docker',
        solidity: 'text-solidity',
        python: 'text-python',
        php: 'text-php',
        chashtag: 'text-chashtag',
        javascript: 'text-javascript',
      },
    },
  },
);

type SkillHolderVariantProps = VariantProps<typeof cvaSkillHolder>;

export interface SkillHolderProps extends SkillHolderVariantProps {
  children: ReactNode;
  className?: string;
  isChecked?: boolean;
}

export const SkillHolder = ({
  children,
  type = 'react',
  className,
  isChecked,
  ...props
}: SkillHolderProps) => (
  <div className={`${cvaSkillHolder({ type })} ${className}`} {...props}>
    {/* how to pass the right type?? based on the content of the skillholder I guess */}
    <span className="font-sans text-sm font-semibold">{children}</span>
    {isChecked}
    <div className="absolute right-0 top-0 -mt-2 -mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-white">
      <Image src="/icons/check.svg" width="9" height="6" alt="bookmark" />
    </div>
  </div>
);
