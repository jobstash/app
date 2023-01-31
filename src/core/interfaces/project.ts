import type { Chain } from './chain';
import type { Skill, Tag } from './common';

/**
 * At the time of this writing, project details has lots of tabs.
 * For now, tags will be grouped as top and bottom sections temporarily.
 * We'll finalize this in the future.
 *  */
export interface ProjectTags {
  top: Tag[];
  bottom: Tag[];
}

export interface Project {
  /** Name of the project */
  name: string;
  /** Avatar href */
  avatar: string;
  /** List of chains associated with the project */
  chains: Chain[];
  /** List of tags displayed as info for the project */
  tags: ProjectTags;
  /** List of skills displayed on project/competitors tab */
  skills: Skill[];
  /** Description displayed in right-panel details tab */
  description: string;
}
