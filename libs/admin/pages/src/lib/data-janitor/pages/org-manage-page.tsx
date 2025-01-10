import Link from 'next/link';
import { useRouter } from 'next/router';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { Button, Tooltip } from '@nextui-org/react';
import { ListStart, RefreshCcw } from 'lucide-react';

import { ERR_NOT_FOUND } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useConvertOrgToProject, useManagedOrg } from '@jobstash/admin/state';

import { DeleteOrgModal, OrgInfoForm } from '@jobstash/admin/ui';
import { InternalErrorResult, LogoTitle } from '@jobstash/shared/ui';

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
      <div className="flex items-center justify-center w-full h-screen">
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
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <span className="text-2xl font-bold">Manage Organization</span>
          <Tooltip content="Choose another organization">
            <Button
              isIconOnly
              as={Link}
              href="/godmode/organizations/manage"
              size="sm"
            >
              <ListStart className="w-5 h-5" />
            </Button>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl">
          <span className="max-w-lg text-md text-white/90">
            Update and manage key details of your organization, including linked
            projects and critical information. Make sure data remains accurate
            and legitimate.
          </span>

          <div className="flex flex-col gap-8 py-4 md:items-center md:flex-row">
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
