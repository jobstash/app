import RightPanel from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { useRouteSegments } from '~/hooks/use-route-segments';
import { GenericLayout } from '~/layouts/generic-layout';

const OrganizationsPage = () => {
  const { pathname, push, section, idSegment, tabSegment } = useRouteSegments();

  return (
    <GenericLayout
      sideBar={<SideBar pathname={pathname} push={push} />}
      rightPanel={
        <RightPanel
          section={section}
          idSegment={idSegment}
          tabSegment={tabSegment}
          push={push}
        />
      }
    >
      <span className="text-2xl">TODO</span>
    </GenericLayout>
  );
};

export default OrganizationsPage;
