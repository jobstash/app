import { memo } from 'react';

import { type ProjectInfo } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { CardSet, ChainList, LogoTitle } from '@jobstash/shared/ui';

import { createJobCardProjectTags } from './utils/create-job-card-project-tags';

interface Props {
  project: ProjectInfo;
  hasMinWidth?: boolean;
}

const JobCardProject = ({ project, hasMinWidth }: Props) => {
  const { projectInfoTags, projectTvlTags, projectAuditTags } =
    createJobCardProjectTags(project);

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <LogoTitle
          hasMinWidth={hasMinWidth}
          title={project.name}
          avatarProps={{
            src: getLogoUrl(project.website, project.logo),
            alt: project.name,
          }}
        />

        <ChainList isShort chains={project.chains} />

        {projectInfoTags.length > 0 &&
          projectInfoTags.map(({ id, text, icon, link }) => (
            <CardSet key={id} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
      </div>

      {projectTvlTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-8">
          {projectTvlTags.map(({ id, text, icon, link }) => (
            <CardSet key={id} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>
      )}

      {projectAuditTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-8">
          {projectAuditTags.map(({ id, text, icon, link }) => (
            <CardSet key={id} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(JobCardProject);
