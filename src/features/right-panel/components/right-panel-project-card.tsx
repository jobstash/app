import {
  Button,
  CardSet,
  GlobeSimpleIcon,
  LogoTitle,
  Text,
} from '~/shared/components';
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

      <div className="flex flex-col gap-2.5">
        <div>
          <Text color="dimmed" size="md">
            {description}
          </Text>
        </div>
        <div>
          <CardSet link={url} icon={<GlobeSimpleIcon />}>
            {defillamaSlug ?? 'Website'}
          </CardSet>
        </div>
      </div>

      <Button variant="primary">Explore Competitor</Button>

      <div className="flex h-4 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      {tags.length > 0 && (
        <div className="flex gap-x-4 pl-0.5">
          {tags.map(({ text, link, icon }) => (
            <CardSet key={text} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>
      )}
    </div>
  );
};
