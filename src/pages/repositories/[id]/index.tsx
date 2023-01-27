import RightPanel from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { useRootContext } from '~/hooks/use-root-context';
import { useRouteSegments } from '~/hooks/use-route-segments';
import { GenericLayout } from '~/layouts/generic-layout';

const OrganizationsPage = () => {
  const { segments, push } = useRouteSegments();
  const { activeIds } = useRootContext();

  return (
    <GenericLayout
      sideBar={
        <SideBar section={segments.section} push={push} activeIds={activeIds} />
      }
      rightPanel={
        <RightPanel
          section={segments.section}
          idSegment={segments.id}
          tabSegment={segments.tab}
          push={push}
        />
      }
    >
      <span className="text-2xl">TODO</span>
    </GenericLayout>
  );
};

export default OrganizationsPage;
