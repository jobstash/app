import Image from 'next/image';
import { type ReactNode } from 'react';

export interface ChainHolderProps {
  project?: '';
}

export const ChainHolder = ({ project }: ChainHolderProps) => (
  <div className="flex text-sm">
    {/* needs to be reworked /finished */}
    {/* {project?.chains.map((chain) => (
      <div key={chain.name} className="-ml-2 flex">
        <Image
          src={chain.avatar}
          width="32"
          height="32"
          alt={chain.name}
          className="h-6 w-6 overflow-hidden rounded-full object-cover object-center"
        />
        <p className="sr-only">{chain.name}</p>
      </div>
    ))} */}
  </div>
);
