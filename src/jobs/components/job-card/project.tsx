import { ProjectInfo } from '~/shared/core/schemas';
import { getLogoUrl } from '~/shared/utils/get-logo-url';
import { ChainsInfoTag } from '~/shared/components/chains-info-tag';
import { Divider } from '~/shared/components/divider';
import { InfoTags } from '~/shared/components/info-tags';
import { LogoTitle } from '~/shared/components/logo-title';

import { createJobCardProjectInfoTags } from '~/jobs/utils/create-job-card-project-info-tags';

interface Props {
  project: ProjectInfo;
}

export const JobCardProject = ({ project }: Props) => {
  const { name, website, logo, chains } = project;
  const src = getLogoUrl(website!, logo);
  const tags = createJobCardProjectInfoTags(project);

  return (
    <>
      <Divider />
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <LogoTitle src={src} name={name} />
        <InfoTags compact tags={tags} />
        <ChainsInfoTag chains={chains} max={3} />
      </div>
    </>
  );
};
