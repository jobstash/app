import { memo } from 'react';

import { ProjectInfo } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

import { createProjectTags } from './utils/create-project-tags';

interface Props {
  projectListItem: ProjectInfo;
}

const ProjectCardTags = ({ projectListItem }: Props) => {
  const { upperTags, midTags } = createProjectTags(projectListItem);

  if (upperTags.length === 0 && midTags.length === 0) return null;

  return (
    <>
      {upperTags.length > 0 && (
        <div className="py-2">
          <div className="flex grow flex-wrap pt-2 gap-2 lg:pt-0 [&>*]:mr-4 pl-2">
            {upperTags.map(({ id, text, icon, link }) => (
              <CardSet key={id} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>
        </div>
      )}

      {midTags.length > 0 && (
        <>
          <hr className="border-t border-white/10" />

          <div className="flex grow flex-wrap gap-2 [&>*]:mr-4 py-2">
            {midTags.map(({ id, text, icon, link }) => (
              <CardSet key={id} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default memo(ProjectCardTags);
