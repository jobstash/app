import { memo, useMemo } from 'react';

import { createJobCardProjectTags } from '~/features/jobs/utils';
import { CardSet, LogoTitle } from '~/shared/components';
import { Project } from '~/shared/core/interfaces';

interface Props {
  project: Project;
}

const JobCardProject = ({ project }: Props) => {
  const { projectInfoTags, projectTvlTags, projectAuditTags } = useMemo(
    () => createJobCardProjectTags(project),
    [project],
  );

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-wrap items-center gap-8">
        <LogoTitle
          title={project.name}
          avatarProps={{
            src:
              project.logo.length > 0
                ? project.logo
                : `https://www.google.com/s2/favicons?domain=${project.url}&sz=128`,
            alt: project.name,
          }}
        />
        {projectInfoTags.length > 0 &&
          projectInfoTags.map(({ text, icon, link }) => (
            <CardSet key={text} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
      </div>

      {projectTvlTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-8">
          {projectTvlTags.map(({ text, icon, link }) => (
            <CardSet key={text} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>
      )}

      {projectAuditTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-8">
          {projectAuditTags.map(({ text, icon, link }) => (
            <CardSet key={text} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(JobCardProject);
