import Link from 'next/link';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Divider, Tooltip } from '@nextui-org/react';
import { Unlink2 } from 'lucide-react';

import { ProjectDetails } from '@jobstash/projects/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { useUpdateProjectRel } from '../hooks/use-update-project-rel';

import { AddOrgSearchInput } from './add-org-search-input';

interface ProjectOrgsFormItemProps {
  projectId: string;
  org: ProjectDetails['organizations'][number];
}

const ProjectOrgsFormItem = ({ projectId, org }: ProjectOrgsFormItemProps) => {
  const { orgId, website, logoUrl, name } = org;

  const avatarProps = {
    src: getLogoUrl(website, logoUrl),
    alt: name,
  };

  const manageLink = `/godmode/organizations/manage/${orgId ?? ''}`;

  const { mutate: updateProjectRel, isPending: isPendingProjectRel } =
    useUpdateProjectRel();

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
  organizations: ProjectDetails['organizations'];
}

export const ProjectOrgForm = ({ projectId, organizations }: Props) => {
  const hasOrg = organizations.length > 0;
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
            {organizations.map((org) => (
              <ProjectOrgsFormItem
                key={org.orgId}
                projectId={projectId}
                org={org}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
