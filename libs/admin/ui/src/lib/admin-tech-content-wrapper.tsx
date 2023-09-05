import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AdminTechContentWrapper = ({ children }: Props) => (
  <div className="relative flex flex-col p-12 pb-8 w-1/2 gap-8 border border-gray rounded-lg">
    {children}
  </div>
);

export default AdminTechContentWrapper;
