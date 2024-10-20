/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Tab, Tabs } from '@nextui-org/react';

import { useManagedOrgForm } from '../hooks/use-managed-org-form';

import { FormInputMapper } from './form-input-mapper';
import { OrgProjectsForm } from './org-projects-form';

export const OrgInfoForm = ({ id }: { id: string }) => {
  const {
    formState,
    hasChanges,
    handleFieldChange,
    inputSections,
    tab,
    onChangeTab,
    isPending,
    onSubmit,
    onUnlinkProject,
    onAddProject,
  } = useManagedOrgForm(id);

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

                if (kind === 'projects') {
                  return (
                    <OrgProjectsForm
                      key={fieldKey}
                      formStateProjects={value}
                      onUnlink={onUnlinkProject}
                      onAddProject={onAddProject}
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
        isDisabled={!hasChanges}
        radius="sm"
        className="font-bold w-fit"
        isLoading={isPending}
        onClick={onSubmit}
      >
        Save Changes
      </Button>
    </div>
  );
};
