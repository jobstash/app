import { memo } from 'react';

import { type Project } from '@jobstash/projects/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { CardSet, LogoTitle } from '@jobstash/shared/ui';

import { createJobCardProjectTags } from './utils/create-job-card-project-tags';

interface Props {
  project: Project;
}

const JobCardProject = ({ project }: Props) => {
  const { projectInfoTags, projectTvlTags, projectAuditTags } =
    createJobCardProjectTags(project);

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-wrap items-center gap-4">
        <LogoTitle
          title={project.name}
          avatarProps={{
            src: project.logo ?? getGoogleLogoUrl(project.url),
            alt: project.name,
          }}
        />
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
