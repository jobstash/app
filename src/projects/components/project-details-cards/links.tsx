import { ProjectAllInfo } from '~/shared/core/schemas';
import { createSocialsInfoTagProps } from '~/shared/utils/create-socials-info-tag-props';
import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { InfoTags } from '~/shared/components/info-tags';

interface Props {
  project: ProjectAllInfo;
}

export const ProjectDetailsCardLinks = ({ project }: Props) => {
  const tags = createSocialsInfoTagProps(project);

  if (!tags.length) return null;

  return (
    <>
      <Divider />

      <Heading
        text="Project Links"
        className="text-base font-semibold"
        htmlTag="h3"
      />

      <InfoTags draggable tags={tags} />
    </>
  );
};
