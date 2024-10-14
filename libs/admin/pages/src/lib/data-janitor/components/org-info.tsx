import Link from 'next/link';

import { Button, Divider, Spinner, Tooltip } from '@nextui-org/react';
import { ListStart, RefreshCcw } from 'lucide-react';

import { OrgDetails } from '@jobstash/organizations/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useOrgDetails } from '@jobstash/organizations/state';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { DeleteOrgModal } from './delete-org-modal';
import { OrgProjectInfo } from './org-project-info';

interface Props {
  org: OrgDetails;
}

export const OrgInfo = ({ org }: Props) => {
  const { data } = useOrgDetails(org.orgId);

  if (!data) {
    return (
      <div className="w-80 h-40 flex items-center justify-center">
        <Spinner size="lg" color="white" />
      </div>
    );
  }

  const { name, website, logoUrl, location, projects } = data;

  return (
    <div className="flex flex-col gap-8">
      <Heading size="lg">Manage Organization</Heading>
      <div className="flex items-center gap-8">
        <LogoTitle
          size="lg"
          title={name}
          location={location}
          avatarProps={{
            alt: name,
            src: getLogoUrl(website, logoUrl),
          }}
        />
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

      <div className="flex gap-4 -mt-4 items-center ">
        <Button
          size="sm"
          className="font-bold"
          startContent={<RefreshCcw className="h-4 w-4 -mt-0.5" />}
        >
          Convert to Project
        </Button>
        <DeleteOrgModal id={org.orgId} isDisabled={!data} />
      </div>

      <div className="space-y-8">
        {projects.length > 0 && (
          <>
            <div className="pt-4">
              <Divider />
            </div>

            <Heading size="md">Linked Projects:</Heading>

            {projects.map(({ id, name }) => (
              <OrgProjectInfo key={id} id={id} name={name} />
            ))}

            <Button size="sm" className="font-bold">
              Link Another Project
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
