import { memo, type ReactNode } from 'react';

import HexagonBorderIcon from '../icons/hexagon-border-icon';

interface Props {
  icon: ReactNode;
}

const Hexagon = ({ icon }: Props) => (
  <div className="relative w-fit">
    <div className="inline-block align-middle">
      <HexagonBorderIcon />
    </div>
    <div className="absolute left-0 top-0 h-full w-full">
      <div className="flex h-full items-center justify-center">{icon}</div>
    </div>
  </div>
);

export default memo(Hexagon);
