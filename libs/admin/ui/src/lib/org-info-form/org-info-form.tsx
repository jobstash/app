/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from '@heroui/button';
import { Tab, Tabs } from '@heroui/tabs';

import { Jobsite } from '@jobstash/shared/core';

import { useCreateOrgJobsite } from '@jobstash/admin/state';

import { FormInputMapper } from '../form-input-mapper';
import { JobsiteModal } from '../jobsite-modal';
import { JobsitesForm } from '../jobsites-form';
import { OrgDetectedJobsitesForm } from '../org-detected-jobsites-form';
import { OrgProjectsForm } from '../org-projects-form';

import { useOrgInfoForm } from './use-org-info-form';

interface Props {
  orgId: string;
  disabledLabels?: string[];
}

export const OrgInfoForm = ({ orgId, disabledLabels }: Props) => {
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
    onChangeJobsite,
  } = useOrgInfoForm(orgId);

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
                      formStateProjects={value as string}
                      onUnlink={onUnlinkProject}
                      onAddProject={onAddProject}
                    />
                  );
                }

                if (kind === 'jobsite') {
                  return (
                    <JobsitesForm
                      key={fieldKey}
                      value={value as Jobsite[]}
                      isPending={isPending}
                      modal={
                        <JobsiteModal
                          id={orgId}
                          useCreateJobsite={useCreateOrgJobsite}
                        />
                      }
                      onChangeJobsite={onChangeJobsite}
                      onSubmit={onSubmit}
                    />
                  );
                }

                if (kind === 'detected-jobsite') {
                  return (
                    <OrgDetectedJobsitesForm
                      key={fieldKey}
                      orgId={orgId}
                      value={value as Jobsite[]}
                      isPending={isPending}
                      onChangeJobsite={onChangeJobsite}
                      onSubmit={onSubmit}
                    />
                  );
                }

                return (
                  <FormInputMapper
                    key={fieldKey}
                    label={label}
                    kind={kind as any}
                    value={value as any}
                    disabledLabels={disabledLabels}
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

      {tab !== 'jobsites' && (
        <Button
          isDisabled={!hasChanges}
          radius="sm"
          className="font-bold w-fit"
          isLoading={isPending}
          onClick={() => onSubmit()}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};
