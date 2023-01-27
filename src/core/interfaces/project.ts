import type { Chain } from './chain';
import type { Skill, Tag } from './common';

export interface Project {
  /** Name of the project */
  name: string;
  /** Avatar href */
  avatar: string;
  /** List of chains associated with the project */
  chains: Chain[];
  /** List of tags displayed as info for the project */
  tags: Tag[];
  /** List of skills displayed on project/competitors tab */
  skills: Skill[];
}
