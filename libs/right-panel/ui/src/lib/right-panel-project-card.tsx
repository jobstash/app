import { memo } from 'react';

import { type Project } from '@jobstash/projects/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { createRightPanelProjectCardTags } from './utils/create-right-panel-project-card-tags';
import RightPanelCardBorder from './right-panel-card-border';
import RightPanelProjectCardAuditTags from './right-panel-project-card-audit-tags';
import RightPanelProjectCardDescription from './right-panel-project-card-description';
import RightPanelProjectCardHeader from './right-panel-project-card-header';
import RightPanelProjectCardTags from './right-panel-project-card-tags';
import RightPanelProjectCardTvlTags from './right-panel-project-card-tvl-tags';

interface Props {
  project: Project;
}

const RightPanelProjectCard = ({ project }: Props) => {
  const { name, url, logo, description } = project;
  const { projectSocialTags, projectTags, projectTvlTags, projectAuditTags } =
    createRightPanelProjectCardTags(project);

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col gap-5 p-6">
        <RightPanelProjectCardHeader
          name={name}
          url={url}
          logo={logo ?? getGoogleLogoUrl(url)}
          socials={projectSocialTags}
        />
        <RightPanelProjectCardDescription description={description} />
        <RightPanelProjectCardTags tags={projectTags} />
        <RightPanelProjectCardTvlTags tvlTags={projectTvlTags} />
        <RightPanelProjectCardAuditTags auditTags={projectAuditTags} />
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelProjectCard);
