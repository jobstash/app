import { AllOrgsSearchInput } from '@jobstash/admin/ui';

import { ManageLayout } from './manage-page-layout';

export const OrgSearchPage = () => (
  <ManageLayout>
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center w-full max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold">Search Organization</h1>
        <AllOrgsSearchInput />
      </div>
    </div>
  </ManageLayout>
);
