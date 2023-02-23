import Image from 'next/image';
import { type ReactNode } from 'react';

export interface ChainHolderProps {
  project?: ReactNode;
}

export const ChainHolder = ({ project }: ChainHolderProps) => (
  <div className="flex text-sm">
    {project?.chains.map((chain) => (
      <div key={chain.name} className="flex">
        <Image
          src={chain.avatar}
          width="32"
          height="32"
          alt={chain.name}
          className="h-6 w-6 overflow-hidden rounded-full object-cover object-center"
        />
        <p className="sr-only">{chain.name}</p>
      </div>
    ))}
  </div>
);
