import Link from 'next/link';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Divider, Tooltip } from '@nextui-org/react';
import { Unlink2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { useManagedOrg } from '../hooks/use-managed-org';
import { useUpdateProjectRel } from '../hooks/use-update-project-rel';

import { AddOrgSearchInput } from './add-org-search-input';

interface ProjectOrgsFormItemProps {
  projectId: string;
  id: string;
}

const ProjectOrgsFormItem = ({ projectId, id }: ProjectOrgsFormItemProps) => {
  const { data } = useManagedOrg(id);

  const { mutate: updateProjectRel, isPending: isPendingProjectRel } =
    useUpdateProjectRel();

  if (!data) return null;

  const { orgId, websites, logoUrl, name } = data;

  const website = websites.length > 0 ? websites[0] : '';
  const avatarProps = {
    src: getLogoUrl(website, logoUrl),
    alt: name ?? '',
  };

  const manageLink = `/godmode/organizations/manage/${orgId ?? ''}`;

  const onUnlink = () => {
    updateProjectRel({ op: 'remove', orgId, projectId });
  };

  return (
    <div className="flex items-center gap-4">
      <LogoTitle
        size="md"
        avatarProps={avatarProps}
        title={
          <Link className="[&>*]:hover:underline" href={manageLink}>
            <Heading size="sm">{name}</Heading>
          </Link>
        }
      />
      <div className="gap-2 flex items-center">
        <Tooltip content={<span>Unlink Organization</span>}>
          <Button
            isIconOnly
            size="sm"
            isLoading={isPendingProjectRel}
            onClick={onUnlink}
          >
            <Unlink2 className="h-4 w-4 text-red-500" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

interface Props {
  projectId: string;
  orgIds: string[];
}

export const ProjectOrgForm = ({ projectId, orgIds }: Props) => {
  const hasOrg = orgIds.length > 0;
  const [animateRef] = useAutoAnimate();

  const { mutate: updateProjectRel, isPending: isPendingProjectRel } =
    useUpdateProjectRel();

  const onAddOrg = (orgId: string) => {
    updateProjectRel({
      orgId,
      projectId,
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-lg">
      <div className="flex flex-col gap-4">
        <Heading size="md">Link Organization</Heading>
        <AddOrgSearchInput
          clearSelectionOnSelect
          showSpinnerOnSelect={false}
          isPending={isPendingProjectRel}
          onAddOrg={onAddOrg}
        />
      </div>

      {hasOrg && (
        <>
          <Divider />
          <Heading size="md">Linked Organizations</Heading>
          <div ref={animateRef} className="flex flex-col gap-4">
            {orgIds.map((orgId) => (
              <ProjectOrgsFormItem
                key={orgId}
                projectId={projectId}
                id={orgId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
