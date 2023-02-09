import type { ProjectPost } from '~/core/interfaces';
import { createProjectTags } from '~/features/projects/utils';
import { TagIcon } from '~/shared/components/icons';

const TEXT_TECHNOLOGIES_DESC =
  'Uncover the technical skills and tools employed by the company, and gain insight into the technologies that dive their success.';

interface Props {
  project: ProjectPost['details'];
}

export const ProjectRightPanel = ({ project }: Props) => {
  if (!project) return null;

  const { name, avatar, description, chains, techs } = project;

  const tags = createProjectTags(project);

  return (
    <div>
      <div>
        <p>{name}</p>
        <p>{avatar}</p>
      </div>

      <hr />

      <div>
        <p>Description</p>
        <p>{description}</p>
      </div>

      <hr />

      <div>
        {tags.top.map((tag) => (
          <div key={tag.text}>
            {tag.icon}
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <hr />

      <div>
        {tags.mid.map((tag) => (
          <div key={tag.text}>
            {tag.icon}
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <hr />

      <div>
        {tags.bottom.map((tag) => (
          <div key={tag.text}>
            {tag.icon}
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <hr />

      <div>
        <div>
          <div>
            <TagIcon filename="chain" />
            <p>Chains: </p>
            {chains.map((chain) => (
              <div key={chain.name}>
                <p>{chain.name}</p>
                <p>{chain.avatar}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr />

      <div>
        <p>Technologies</p>
        <div>
          <p>{TEXT_TECHNOLOGIES_DESC}</p>
        </div>

        <div>
          {techs.map((tech) => (
            <div key={tech.name}>
              <p>{tech.name}</p>
              <p>{tech.isChecked}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
