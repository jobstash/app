import Link from 'next/link';
import { useMemo } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Divider, Spinner, Tooltip } from '@nextui-org/react';
import { Unlink2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { useProjectDetails } from '@jobstash/projects/state';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { AddProjectSearchInput } from './add-project-search-input';

interface OrgProjectsFormItemProps {
  id: string;
  onUnlink: (projectId: string) => void;
}

const OrgProjectsFormItem = ({ id, onUnlink }: OrgProjectsFormItemProps) => {
  const { data } = useProjectDetails(id);

  return (
    <div className="flex items-center gap-4">
      <LogoTitle
        size="md"
        avatarProps={{
          src: getLogoUrl(data?.website ?? null, data?.logo),
          alt: data?.name || '',
        }}
        title={
          <Link
            className="[&>*]:hover:underline"
            href={`/godmode/projects/manage/${data?.id ?? ''}`}
          >
            <Heading size="sm">{data?.name}</Heading>
          </Link>
        }
      />
      <div className="gap-2 flex items-center">
        {data ? (
          <Tooltip content={<span>Unlink Project</span>}>
            <Button isIconOnly size="sm" onClick={() => onUnlink(id)}>
              <Unlink2 className="h-4 w-4 text-red-500" />
            </Button>
          </Tooltip>
        ) : (
          <Spinner size="sm" color="white" />
        )}
      </div>
    </div>
  );
};

interface Props {
  formStateProjects: string;
  onUnlink: (projectId: string) => void;
  onAddProject: (projectId: string) => void;
}

export const OrgProjectsForm = ({
  formStateProjects,
  onUnlink,
  onAddProject,
}: Props) => {
  const projectIds = useMemo(
    () =>
      formStateProjects
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean),
    [formStateProjects],
  );

  const hasProject = projectIds.length > 0;

  const [animateRef] = useAutoAnimate();

  return (
    <div className="flex flex-col gap-8 max-w-lg">
      <div className="flex flex-col gap-4">
        <Heading size="md">Add Project</Heading>
        <AddProjectSearchInput
          stateIds={projectIds}
          onAddProject={onAddProject}
        />
      </div>
      {hasProject && (
        <>
          <Divider />
          <Heading size="md">Linked Projects</Heading>
          <div ref={animateRef} className="flex flex-col gap-4">
            {projectIds.map((id) => (
              <OrgProjectsFormItem key={id} id={id} onUnlink={onUnlink} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
