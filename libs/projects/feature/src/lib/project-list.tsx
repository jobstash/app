import { memo } from 'react';

import { type ProjectInfo } from '@jobstash/shared/core';

import { useProjectList } from '@jobstash/projects/state';

import { ProjectCard, ProjectListEmptyResult } from '@jobstash/projects/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  initProject: ProjectInfo | null;
  activeProjectId: string | null;
}

const ProjectList = ({ initProject, activeProjectId }: Props) => {
  const {
    push,
    isLoading,
    error,
    projectListItems,
    projectsPrevLink,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    filterParamsObj,
  } = useProjectList(initProject);

  if (isLoading) {
    return (
      <div className="py-4">
        {initProject && (
          <ProjectCard
            key={initProject.id}
            isActive
            projectListItem={initProject}
            filterParamsObj={filterParamsObj}
          />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (projectListItems.length === 0 && !error) {
    return (
      <div className="py-8">
        <ProjectListEmptyResult prevLink={projectsPrevLink} push={push} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {projectListItems.map((projectListItem) => (
        <ProjectCard
          key={projectListItem.id}
          projectListItem={projectListItem}
          isActive={activeProjectId === projectListItem.id}
          filterParamsObj={filterParamsObj}
        />
      ))}

      {projectListItems.length > 0 && (
        <div ref={inViewRef} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more projects to load</p>}
        </div>
      )}
      {(error as Error)?.message && (
        <div className="py-8">
          <p>error = {(error as Error).message}</p>
        </div>
      )}
    </div>
  );
};

export default memo(ProjectList);
