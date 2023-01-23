import { ButtonHTMLAttributes, ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const bartab = cva(
  [
    'font-semibold',
    'text-xs',
    'text-white',
    'w-full',
    'flex',
    'justify-between',
    'rounded-lg',
    'px-2',
    'items-center',
    'h-10',
    'transition-all',
    'hover:bg-white/10',
    'active:bg-gradient-to-r active:from-purple-d active:to-purple-c',
    'text-red-500',
  ],
  {
    variants: {
      kind: {
        link: [],
        profile: ['bg-white/5'],
        tab: ['bg-white/5'],
      },
    },
    defaultVariants: {
      kind: 'link',
    },
  },
);

export type BartabProps = VariantProps<typeof bartab>;
interface Props extends BartabProps, ButtonHTMLAttributes<{}> {
  children: ReactNode;
}

const Bartab = ({ children, kind, type = 'button', ...rest }: Props) => (
  <button {...rest} type={type} className={bartab({ kind })}>
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 stroke-red-500"
    >
      <path
        fill="#F9FAFB"
        fillRule="evenodd"
        d="M.146.146a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.708-.708L2.293 3 .146.854a.5.5 0 0 1 0-.708Z"
        clipRule="evenodd"
      />
    </svg>
  </button>
);

export default Bartab;
