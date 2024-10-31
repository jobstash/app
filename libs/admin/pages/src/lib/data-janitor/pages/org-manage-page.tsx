import Link from 'next/link';
import { useRouter } from 'next/router';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { Button, Tooltip } from '@nextui-org/react';
import { ListStart, RefreshCcw } from 'lucide-react';

import { ERR_NOT_FOUND } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { InternalErrorResult, LogoTitle } from '@jobstash/shared/ui';

import { DeleteOrgModal } from '../components/delete-org-modal';
import { OrgInfoForm } from '../components/org-info-form';
import { useConvertOrgToProject } from '../hooks/use-convert-org-to-project';
import { useManagedOrg } from '../hooks/use-managed-org';

import { ManageLayout } from './manage-page-layout';

export const OrgManagePage = () => {
  const { query } = useRouter();
  const { orgId } = query;

  const { data, error, isError, isLoading } = useManagedOrg(orgId as string);
  const isNotFound = error?.message === ERR_NOT_FOUND;

  const { mutate: convertOrg, isPending: isPendingConvert } =
    useConvertOrgToProject();

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
      <div className="flex flex-col gap-4 pt-8 w-full">
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
        <div className="flex flex-col gap-4 rounded-2xl">
          <span className="text-md text-white/90 max-w-lg">
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
                alt: data.name ?? '',
                src: getLogoUrl(
                  data.websites.length > 0 ? data.websites[0] : '',
                  data.logoUrl,
                ),
              }}
            />

            <Button
              size="sm"
              className="font-bold"
              startContent={<RefreshCcw className="h-4 w-4 -mt-0.5" />}
              isLoading={isPendingConvert}
              onClick={() => convertOrg(data.orgId)}
            >
              Convert to Project
            </Button>
            <DeleteOrgModal id={data.orgId} isDisabled={!data} />
          </div>
        </div>

        <OrgInfoForm orgId={data.orgId} />
      </div>
    </ManageLayout>
  );
};
