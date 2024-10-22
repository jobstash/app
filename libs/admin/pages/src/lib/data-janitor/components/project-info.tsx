import Link from 'next/link';

import { Button, Divider, Spinner, Tooltip } from '@nextui-org/react';
import { ListStart, Settings, Trash2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { useProjectDetails } from '@jobstash/projects/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { DeleteProjectModal } from '../components/delete-project-modal';

interface Props {
  id: string;
}

export const ProjectInfo = ({ id }: Props) => {
  const { data } = useProjectDetails(id);

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

        <div className="flex h-20 flex-col md:items-center md:flex-row gap-8 py-4">
          {data ? (
            <>
              <LogoTitle
                size="lg"
                title={data.name}
                avatarProps={{
                  alt: data.name,
                  src: getLogoUrl(data.website, data.logo),
                }}
              />
              <DeleteProjectModal id={data.id} isDisabled={!data} />
            </>
          ) : (
            <Spinner color="white" />
          )}
        </div>
      </div>
    </div>
  );
};
