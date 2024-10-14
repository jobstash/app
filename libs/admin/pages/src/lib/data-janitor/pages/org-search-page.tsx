import { OrgSearchInput } from '../components/org-search-input';

import { ManageLayout } from './manage-page-layout';

export const OrgSearchPage = () => (
  <ManageLayout>
    <div className="h-full w-full flex items-center justify-center -mt-60">
      <div className="space-y-8 w-full flex items-center flex-col max-w-3xl">
        <h1 className="text-4xl font-bold">Search Organization</h1>
        <OrgSearchInput />
      </div>
    </div>
  </ManageLayout>
);
