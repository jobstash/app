import type { Project } from '~/core/interfaces';

import { ChainMapper } from '../unstyled-ui/chain-mapper';
import { LogoTitle } from '../unstyled-ui/logo-title';
import { TagMapper } from '../unstyled-ui/tag-mapper';

interface Props {
  projects: Project[];
}

/** UI for rendering project-info in listing card */
export const ListingProject = ({ projects }: Props) => (
  <div className="flex flex-col space-y-8">
    {projects.map((project) => {
      // Limit listing chains to 6 (for now)
      let { chains, name, avatar } = project;
      if (chains && chains.length > 6) chains = chains.slice(0, 6);

      // For now, we only render first two tags on top, the rest will be at the bottom
      // while we wait for styling to handle multiple elements overflowing flex
      const tags = [...project.tags.top, ...project.tags.bottom];

      return (
        <div key={name} className="flex flex-col space-y-3 pt-4">
          <div className="flex items-center space-x-8">
            <LogoTitle name={name} avatar={avatar} size="lg" avatarSize="sm" />
            <ChainMapper chains={chains} />
            <TagMapper tags={tags.slice(0, 2)} />
          </div>
          <TagMapper tags={tags.slice(2, tags.length)} />
        </div>
      );
    })}
  </div>
);
