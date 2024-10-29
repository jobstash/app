import dynamic from 'next/dynamic';
import Head from 'next/head';

import { PERMISSIONS } from '@jobstash/auth/core';

import {
  projectsGridIsFocusedAtom,
  projectsGridPastaStringAtom,
} from '@jobstash/admin/state';

import {
  AdminLayout,
  GridFocusSyncer,
  GridFocusWrapper,
} from '@jobstash/admin/ui';

import { ProjectsGridPayloadSyncer } from './payload-syncer';
import { ProjectsGrid } from './projects-grid';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const ProjectsGridPage = () => (
  <>
    <Head>
      <title>Godmode | Projects Grid</title>
    </Head>
    <AdminLayout
      hideHeader
      breadCrumbs={null}
      sidebar={<SideBar />}
      tabsSection={null}
      requiredPermissions={[PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN]}
    >
      <div className="w-full">
        <GridFocusWrapper isFocusedAtom={projectsGridIsFocusedAtom}>
          <ProjectsGrid />
        </GridFocusWrapper>
        <GridFocusSyncer
          pastaAtom={projectsGridPastaStringAtom}
          focusAtom={projectsGridIsFocusedAtom}
        />
        <ProjectsGridPayloadSyncer />
      </div>
    </AdminLayout>
  </>
);
