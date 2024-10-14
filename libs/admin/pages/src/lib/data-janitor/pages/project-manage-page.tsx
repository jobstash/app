import { useRouter } from 'next/router';

import { NotFoundPage } from '@jobstash/shared/pages';

import { CreateProjectSection } from '../components/create-project-section';
import { ProjectInfo } from '../components/project-info';

import { ManageLayout } from './manage-page-layout';

export const ProjectManagePage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (typeof id !== 'string') return <NotFoundPage />;

  return (
    <ManageLayout>
      <div className="flex justify-between">
        <ProjectInfo id={id} />
        <CreateProjectSection />
      </div>
    </ManageLayout>
  );
};
