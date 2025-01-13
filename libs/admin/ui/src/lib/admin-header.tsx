import { Input } from '@mantine/core';

import { Heading, SearchIcon } from '@jobstash/shared/ui';

const AdminHeader = () => (
  <div className="pt-20 pb-8 lg:pt-8">
    <div className="">
      <div className="flex flex-col space-y-6 basis-4/12">
        <Heading>Admin Panel</Heading>
      </div>
      <div className="flex items-center pt-4 basis-8/12">
        <div className="w-full">
          <Input
            disabled
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
