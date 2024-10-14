import Link from 'next/link';

import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { Settings, Trash2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { useProjectDetails } from '@jobstash/projects/state';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

interface Props {
  id: string;
  name: string;
}

export const OrgProjectInfo = ({ id, name }: Props) => {
  const { data } = useProjectDetails(id);
  const manageLink = `/godmode/projects/manage/${data?.id ?? ''}`;

  return (
    <div className="flex items-center gap-4">
      <LogoTitle
        size="md"
        avatarProps={{
          src: getLogoUrl(data?.website ?? null, data?.logo),
          alt: name,
        }}
        title={
          <Link
            className="[&>*]:hover:underline"
            href={`/godmode/projects/manage/${data?.id ?? ''}`}
          >
            <Heading size="sm">{name}</Heading>
          </Link>
        }
      />
      <div className="gap-2 flex items-center">
        <Tooltip content={<span>Manage Project</span>}>
          <Button isIconOnly as={Link} href={manageLink} size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </Tooltip>
        {data ? (
          <Tooltip content={<span>Unlink Project</span>}>
            <Button isIconOnly size="sm">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </Tooltip>
        ) : (
          <Spinner size="sm" color="white" />
        )}
      </div>
    </div>
  );
};
