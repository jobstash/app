import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AdminTechContentWrapper = ({ children }: Props) => (
  <div className="flex flex-col w-full gap-8 p-6 pb-8 border rounded-lg lg:p-10 border-gray">
    {children}
  </div>
);

export default AdminTechContentWrapper;
