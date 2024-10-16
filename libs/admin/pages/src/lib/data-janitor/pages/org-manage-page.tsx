import Link from 'next/link';
import { useRouter } from 'next/router';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { Button, Tab, Tabs, Tooltip } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { ListStart, RefreshCcw } from 'lucide-react';

import { ERR_NOT_FOUND } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useOrgDetails } from '@jobstash/organizations/state';

import { InternalErrorResult, LogoTitle } from '@jobstash/shared/ui';

import { CreateOrgSection } from '../components/create-org-section';
import { DeleteOrgModal } from '../components/delete-org-modal';
import { OrgInfo } from '../components/org-info';
import { OrgProjectInfo } from '../components/org-project-info';
import { orgManageTabAtom } from '../core/atoms';

import { ManageLayout } from './manage-page-layout';

export const OrgManagePage = () => {
  const { query } = useRouter();
  const { orgId } = query;

  const [tab, setTab] = useAtom(orgManageTabAtom);
  const onSelectionChange = (key: React.Key) => {
    setTab(key as 'details' | 'projects');
  };

  const { data, error, isError, isLoading } = useOrgDetails(orgId as string);
  const isNotFound = error?.message === ERR_NOT_FOUND;

  if (typeof orgId !== 'string') return <NotFoundPage />;

  if (isLoading) return <LoadingPage />;

  if (isError && !isNotFound) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <InternalErrorResult />
      </div>
    );
  }

  if (!data || isNotFound) {
    return (
      <NotFoundPage
        message="The organization you are looking for does not exist."
        buttonText="Back to Search"
        link="/godmode/organizations/manage"
      />
    );
  }

  return (
    <ManageLayout>
      <div className="flex flex-col gap-4 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span className="text-2xl font-bold">Manage Organization</span>
            <Tooltip content="Choose another organization">
              <Button
                isIconOnly
                as={Link}
                href="/godmode/organizations/manage"
                size="sm"
              >
                <ListStart className="h-5 w-5" />
              </Button>
            </Tooltip>
          </div>
          <CreateOrgSection />
        </div>
        <div className="flex flex-col gap-4 max-w-lg rounded-2xl">
          <span className="text-md text-white/90">
            Update and manage key details of your organization, including linked
            projects and critical information. Make sure data remains accurate
            and legitimate.
          </span>

          <div className="flex flex-col md:items-center md:flex-row gap-8 py-4">
            <LogoTitle
              size="lg"
              title={data.name}
              location={data.location}
              avatarProps={{
                alt: data.name,
                src: getLogoUrl(data.website, data.logoUrl),
              }}
            />

            <Button
              size="sm"
              className="font-bold"
              startContent={<RefreshCcw className="h-4 w-4 -mt-0.5" />}
            >
              Convert to Project
            </Button>
            <DeleteOrgModal id={data.orgId} isDisabled={!data} />
          </div>

          <Tabs
            aria-label="Import Groups"
            variant="underlined"
            size="lg"
            classNames={{
              tabList: 'pl-0',
              tab: 'pl-0',
            }}
            selectedKey={tab}
            onSelectionChange={onSelectionChange}
          >
            <Tab key="details" title="Details" />
            <Tab key="projects" title="Linked Projects" />
          </Tabs>
        </div>

        <div className="pt-4">
          {tab === 'details' && <OrgInfo org={data} />}
          {tab === 'projects' && <OrgProjectInfo projects={data.projects} />}
        </div>
      </div>
    </ManageLayout>
  );
};
