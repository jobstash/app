import { memo } from 'react';

import {
  type ProjectInfo,
  type ProjectMoreInfo,
  ROUTE_SECTION,
  TAB_SEGMENT,
} from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';

import { createRightPanelProjectCardTags } from './utils/create-right-panel-project-card-tags';
import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelProjectCardAuditTags from './right-panel-project-card-audit-tags';
import RightPanelProjectCardChains from './right-panel-project-card-chains';
import RightPanelProjectCardDescription from './right-panel-project-card-description';
import RightPanelProjectCardHeader from './right-panel-project-card-header';
import RightPanelProjectCardTags from './right-panel-project-card-tags';
import RightPanelProjectCardTvlTags from './right-panel-project-card-tvl-tags';

interface Props {
  project: ProjectInfo & ProjectMoreInfo;
  showCTA?: boolean;
}

const RightPanelProjectCard = ({ project, showCTA = true }: Props) => {
  const { id, name, website, logo, description, chains } = project;
  const { projectSocialTags, projectTags, projectTvlTags, projectAuditTags } =
    createRightPanelProjectCardTags(project);

  const slug = slugify(`${name} ${id}`);
  const link = `${ROUTE_SECTION.PROJECTS}/${slug}/${TAB_SEGMENT.details}`;

  const onClickExploreProject = () => {
    if (typeof window !== 'undefined') {
      window.location.href = link;
    }
  };

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col gap-4 p-6">
        <RightPanelProjectCardHeader
          name={name}
          url={website}
          logo={logo}
          socials={projectSocialTags}
        />
        <RightPanelProjectCardDescription description={description} />
        <RightPanelProjectCardTags tags={projectTags} />
        <RightPanelProjectCardTvlTags tvlTags={projectTvlTags} />
        <RightPanelProjectCardAuditTags auditTags={projectAuditTags} />
        <RightPanelProjectCardChains chains={chains} />

        {showCTA && (
          <>
            <hr className="border-t border-white/10" />
            <RightPanelCta
              text="Explore Project"
              onClick={onClickExploreProject}
            />
          </>
        )}
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelProjectCard);
