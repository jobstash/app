import Link from 'next/link';

import { Button, Divider, Spinner, Tooltip } from '@nextui-org/react';
import { ListStart, Settings, Trash2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { useProjectDetails } from '@jobstash/projects/state';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { DeleteProjectModal } from '../components/delete-project-modal';

interface Props {
  id: string;
}

export const ProjectInfo = ({ id }: Props) => {
  const { data } = useProjectDetails(id);

  if (!data) {
    return (
      <div className="w-80 h-40 flex items-center justify-center">
        <Spinner size="sm" color="white" />
      </div>
    );
  }

  const { name, website, logo, organization } = data;
  const orgManageLink = organization
    ? `/godmode/organizations/manage/${organization.orgId}`
    : '';

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <span className="text-2xl font-bold">Manage Project</span>
        <Tooltip content="Choose another project">
          <Button
            isIconOnly
            as={Link}
            href="/godmode/projects/manage"
            size="sm"
          >
            <ListStart className="h-5 w-5" />
          </Button>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl">
        <span className="text-md text-white/90 max-w-lg">
          Update and manage key details of your projects, including linked
          organizations and critical information. Make sure data remains
          accurate and legitimate.
        </span>
        <div className="flex flex-col md:items-center md:flex-row gap-8 py-4">
          <LogoTitle
            size="lg"
            title={name}
            avatarProps={{
              alt: name,
              src: getLogoUrl(website, logo),
            }}
          />
          <DeleteProjectModal id={data.id} isDisabled={!data} />
        </div>
      </div>

      {organization && (
        <div className="space-y-8">
          <div className="pt-4">
            <Divider />
          </div>

          <Heading size="md">Linked Organization:</Heading>

          <div className="flex items-center gap-4">
            <LogoTitle
              size="md"
              title={
                <Link className="[&>*]:hover:underline" href={orgManageLink}>
                  <Heading size="sm">{organization.name}</Heading>
                </Link>
              }
              location={organization.location}
              avatarProps={{
                alt: organization.name,
                src: getLogoUrl(organization.website, organization.logoUrl),
              }}
            />
            <div className="gap-2 flex items-center">
              <Tooltip content={<span>Manage Organization</span>}>
                <Button isIconOnly as={Link} href={orgManageLink} size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Tooltip>
              <Tooltip content={<span>Unlink Organization</span>}>
                <Button isIconOnly size="sm">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
