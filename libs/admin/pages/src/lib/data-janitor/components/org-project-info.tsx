import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { Trash2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { useProjectDetails } from '@jobstash/projects/state';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  id: string;
  name: string;
}

export const OrgProjectInfo = ({ id, name }: Props) => {
  const { data } = useProjectDetails(id);

  return (
    <div className="flex items-center gap-4">
      <LogoTitle
        size="md"
        avatarProps={{
          src: getLogoUrl(data?.website ?? null, data?.logo),
          alt: name,
        }}
        title={name}
      />
      {data ? (
        <Tooltip
          content={
            <span>
              Unlink &#34;
              <span className="text-white font-bold">{data.name}</span>&#34;
              Project
            </span>
          }
        >
          <Button isIconOnly size="sm">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </Tooltip>
      ) : (
        <Spinner size="sm" color="white" />
      )}
    </div>
  );
};
