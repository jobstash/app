import type { Tech } from '~/core/interfaces';

import { TechWrapper } from './tech-wrapper';

interface Props {
  techs: Tech[];
  isParentActive: boolean;
}

export const TechMapper = ({ techs, isParentActive }: Props) => (
  <div className="flex space-x-4">
    {techs.map((tech) => (
      <TechWrapper
        key={tech.name}
        text={tech.name}
        isChecked={tech.isChecked}
        isParentActive={isParentActive}
      />
    ))}
  </div>
);
