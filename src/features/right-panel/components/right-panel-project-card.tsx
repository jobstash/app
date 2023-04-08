import { IconHolder, LogoTitle } from '~/shared/components';
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
      <LogoTitle title={name} avatarProps={{ src: logo, alt: name }} />

      <div className="flex flex-col gap-y-6 border-y border-white/10 py-8">
        <div>
          <p>{description}</p>
        </div>
        <div>
          <IconHolder link={url} iconText="external-link">
            {defillamaSlug ?? 'Website'}
          </IconHolder>
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
