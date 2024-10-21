import { useRouter } from 'next/router';

import { NotFoundPage } from '@jobstash/shared/pages';

import { ProjectInfo } from '../components/project-info';
import { ProjectUpdateForm } from '../components/project-update-form';

import { ManageLayout } from './manage-page-layout';

export const ProjectManagePage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (typeof id !== 'string') return <NotFoundPage />;

  return (
    <ManageLayout>
      <div className="flex flex-col gap-4 pt-8 w-full">
        <ProjectInfo id={id} />
        <ProjectUpdateForm projectId={id} />
      </div>
    </ManageLayout>
  );
};
