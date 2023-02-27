import { Button, ChainHeading, IconHolder, TagIcon } from '~/shared/components';
import { Project } from '~/shared/core/interfaces';

import { createRightPanelProjectCardTags } from '../utils';

interface Props {
  project?: Project;
}

export const RightPanelProjectCard = ({ project }: Props) => {
  if (!project) return null;

  const { logo, name, description, url, defillamaSlug } = project;
  const tags = createRightPanelProjectCardTags(project);

  return (
    <div className="flex flex-col gap-y-6 p-6">
      <ChainHeading avatar={logo} alt={name}>
        {name}
      </ChainHeading>

      <div className="flex flex-col gap-y-6 border-y border-white/10 py-8">
        <div>
          <p>{description}</p>
        </div>
        <div>
          <IconHolder link={url} iconText="external-link">
            {defillamaSlug ?? 'Website'}
          </IconHolder>
        </div>
        <div>
          <Button kind="primary">Explore Competitor</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {tags.map(({ text, iconText, link }) => (
          <IconHolder key={text} link={link} iconText={iconText}>
            {text}
          </IconHolder>
        ))}
      </div>
    </div>
  );
};
