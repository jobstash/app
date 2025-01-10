import { useRouter } from 'next/router';

import { NotFoundPage } from '@jobstash/shared/pages';

import { ProjectInfo, ProjectUpdateForm } from '@jobstash/admin/ui';

import { ManageLayout } from './manage-page-layout';

export const ProjectManagePage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (typeof id !== 'string') return <NotFoundPage />;

  return (
    <ManageLayout>
      <div className="flex flex-col w-full gap-4">
        <ProjectInfo id={id} />
        <ProjectUpdateForm projectId={id} />
      </div>
    </ManageLayout>
  );
};
