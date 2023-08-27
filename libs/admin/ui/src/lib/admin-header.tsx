import { Input } from '@mantine/core';

import { Heading, SearchIcon } from '@jobstash/shared/ui';

const AdminHeader = () => (
  <div className="top-0 z-50 w-full px-20 pt-12 pb-8">
    <div className="flex items-center justify-between">
      <div className="flex basis-4/12 flex-col space-y-6">
        <Heading>Admin Panel</Heading>
      </div>
      <div className="flex basis-8/12 items-center">
        <div className="w-full">
          <Input
            icon={<SearchIcon />}
            radius="md"
            size="lg"
            className="opacity-30"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  </div>
);

export default AdminHeader;
