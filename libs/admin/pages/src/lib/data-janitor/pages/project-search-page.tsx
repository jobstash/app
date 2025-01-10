import { AllProjectsSearchInput } from '@jobstash/admin/ui';

import { ManageLayout } from './manage-page-layout';

export const ProjectSearchPage = () => (
  <ManageLayout>
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center w-full max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold">Search Project</h1>
        <AllProjectsSearchInput />
      </div>
    </div>
  </ManageLayout>
);
