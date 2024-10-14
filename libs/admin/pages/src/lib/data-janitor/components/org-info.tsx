import Link from 'next/link';

import { Button, Divider, Spinner, Tooltip } from '@nextui-org/react';
import { ListStart, RefreshCcw, Trash2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { useOrgDetails } from '@jobstash/organizations/state';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { OrgProjectInfo } from './org-project-info';

interface Props {
  id: string;
}

export const OrgInfo = ({ id }: Props) => {
  const { data } = useOrgDetails(id);

  if (!data) {
    return (
      <div className="w-80 h-40 flex items-center justify-center">
        <Spinner size="sm" color="white" />
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
        <Button
          size="sm"
          className="bg-red-700 font-bold"
          startContent={<Trash2 className="h-4 w-4 -mt-0.5" />}
        >
          Delete
        </Button>
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
