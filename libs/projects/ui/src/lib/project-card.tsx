import { memo, useMemo } from 'react';

import { useSetAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  FRONTEND_URL,
  type ProjectInfo,
} from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { createProjectKey } from '@jobstash/projects/utils';

import { activeProjectIdAtom } from '@jobstash/projects/state';

import ProjectCardChains from './project-card-chains';
import ProjectCardHeader from './project-card-header';
import ProjectCardTags from './project-card-tags';
import ProjectCardWrapper from './project-card-wrapper';

interface Props {
  isActive: boolean;
  projectListItem: ProjectInfo;
  filterParamsObj: Record<string, string>;
}

const ProjectCard = ({ isActive, projectListItem, filterParamsObj }: Props) => {
  const { id, name } = projectListItem;

  const href = useMemo(
    () =>
      getUrlWithParams(
        FRONTEND_URL,
        `/projects/${createProjectKey({ id, name })}/details`,
        filterParamsObj,
      ).toString(),
    [filterParamsObj, name, id],
  );

  const setActiveProjectId = useSetAtom(activeProjectIdAtom);

  const onClick = () => {
    setActiveProjectId(id);

    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  };

  //
  // const { data: projectDetails } = useProjectDetails(id);

  return (
    <ProjectCardWrapper isActive={isActive} href={href} onClick={onClick}>
      <ProjectCardHeader projectListItem={projectListItem} />
      <ProjectCardTags projectListItem={projectListItem} />
      <ProjectCardChains projectListItem={projectListItem} />
      {/* <ProjectCardTechs
        techs={projectDetails ? projectDetails.organization.tags : []}
      /> */}
      {/* <ProjectCardOrg projectDetails={projectDetails} /> */}
    </ProjectCardWrapper>
  );
};

export default memo(ProjectCard);
