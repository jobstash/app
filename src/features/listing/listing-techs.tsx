import type { Tech } from '~/core/interfaces';

import { TechMapper } from '../unstyled-ui/tech-mapper';

interface Props {
  techs: Tech[];
}

/** UI for rendering listing techs (only returns tech-mapper for now) */
export const ListingTechs = ({ techs }: Props) => <TechMapper techs={techs} />;
