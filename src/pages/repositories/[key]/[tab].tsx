import { useRouter } from 'next/router';

import RightPanel from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { GenericLayout } from '~/layouts/generic-layout';

const RepositoriesPage = () => {
  const router = useRouter();

  return (
    <GenericLayout
      sideBar={<SideBar keySegment="TODO" routerPush={router.push} />}
      rightPanel={<RightPanel />}
    >
      <span className="text-2xl">TODO</span>
    </GenericLayout>
  );
};

export default RepositoriesPage;
