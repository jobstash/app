import { memo, type ReactNode } from 'react';

import { type ProjectDetails } from '@jobstash/projects/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  projectDetails?: ProjectDetails;
}

const ProjectCardOrgWrapper = ({ children }: { children: ReactNode }) => (
  <>
    <hr className="border-t border-white/10" />

    <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0 pt-2">
      {children}
    </div>
  </>
);

const ProjectCardOrg = ({ projectDetails }: Props) => {
  if (!projectDetails)
    return (
      <ProjectCardOrgWrapper>
        <div className="flex items-center justify-center w-10 h-10">
          <div
            className="animate-spin2 opacity-40 inline-block w-5 h-5 border-2 border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </ProjectCardOrgWrapper>
    );

  const { organization } = projectDetails;

  return (
    <ProjectCardOrgWrapper>
      <div className="flex gap-4">
        <LogoTitle
          avatarProps={{
            src: getLogoUrl(organization.url, organization.logo),
            alt: organization.name,
          }}
          title={organization.name}
          location={organization.location}
        />
        {/* TODO: Chain logos */}
      </div>
      {/* TODO: Date + Bookmark */}
    </ProjectCardOrgWrapper>
  );
};

export default memo(ProjectCardOrg);
