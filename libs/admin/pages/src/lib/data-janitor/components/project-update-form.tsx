/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Tab, Tabs } from '@nextui-org/react';

import { FormInputMapper } from '../components/form-input-mapper';
import { ProjectOrgForm } from '../components/project-org-form';
import { useManagedProjectForm } from '../hooks/use-managed-project-form';

export const ProjectUpdateForm = ({ projectId }: { projectId: string }) => {
  const {
    isLoading,
    formState,
    hasChanges,
    handleFieldChange,
    inputSections,
    tab,
    onChangeTab,
    isPending,
    onSubmit,
    onUnlinkOrg,
    onAddOrg,
  } = useManagedProjectForm(projectId);

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-8 pb-40 min-h-[1000px] max-w-3xl">
      <Tabs
        aria-label="Import Groups"
        variant="underlined"
        size="lg"
        classNames={{
          tabList: 'pl-0',
          tab: 'pl-0',
        }}
        selectedKey={tab}
        onSelectionChange={onChangeTab}
      >
        {inputSections.map(({ key, title, fields }) => (
          <Tab key={key} title={title}>
            <div className="flex flex-col gap-4 max-w-lg">
              {fields.map(({ label, key, kind }) => {
                const fieldKey = key as keyof typeof formState;
                const value = formState[fieldKey]!;

                if (kind === 'org') {
                  return (
                    <ProjectOrgForm
                      key={fieldKey}
                      orgId={formState.orgId}
                      isPending={isPending}
                      onAddOrg={onAddOrg}
                      onUnlinkOrg={onUnlinkOrg}
                    />
                  );
                }

                return (
                  <FormInputMapper
                    key={fieldKey}
                    label={label}
                    kind={kind as any}
                    value={value as any}
                    onChange={(newValue) =>
                      handleFieldChange(fieldKey, newValue)
                    }
                  />
                );
              })}
            </div>
          </Tab>
        ))}
      </Tabs>

      <Button
        isDisabled={!hasChanges || isPending}
        radius="sm"
        className="font-bold w-fit"
        isLoading={isPending && tab !== 'org'}
        onClick={onSubmit}
      >
        Save Changes
      </Button>
    </div>
  );
};
