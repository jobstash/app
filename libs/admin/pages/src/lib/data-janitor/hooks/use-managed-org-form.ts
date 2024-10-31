import { useEffect, useRef, useState } from 'react';

import { atom, useAtom } from 'jotai';

import { Jobsite } from '@jobstash/shared/core';

import { useUpdateOrg } from '@jobstash/admin/state';

import { OrgManageTab, orgManageTabAtom } from '../core/atoms';
import {
  dataToFormState,
  formStateToPayload,
  ManagedOrgFormState,
} from '../core/schemas';

import { useManagedOrg } from './use-managed-org';

const DEFAULT_FORM_STATE: ManagedOrgFormState = {
  orgId: '',
  name: '',
  logoUrl: '',
  description: '',
  summary: '',
  headcountEstimate: '',
  location: '',
  aliases: '',
  website: '',
  discord: '',
  telegram: '',
  github: '',
  docs: '',
  twitter: '',
  grants: '',
  communities: '',
  jobsites: [],
  detectedJobsites: [],
  projects: '',
  //
  // altName: '',
  // rawWebsite: '',
};

const inputSections = [
  {
    key: 'details',
    title: 'Details',
    fields: [
      { label: 'Name', key: 'name' },
      // { label: 'Alt Name', key: 'altName' },
      { label: 'Aliases', key: 'aliases', kind: 'list' },
      { label: 'Location', key: 'location' },
      { label: 'Logo Url', key: 'logoUrl' },
      {
        label: 'Employees',
        key: 'headcountEstimate',
        kind: 'number',
      },
    ],
  },
  {
    key: 'description',
    title: 'Description',
    fields: [
      {
        label: 'Summary',
        key: 'summary',
        kind: 'textarea',
      },
      {
        label: 'Description',
        key: 'description',
        kind: 'textarea',
      },
    ],
  },
  {
    key: 'websites',
    title: 'Websites',
    fields: [
      { label: 'Website', key: 'website', kind: 'list' },
      // { label: 'Raw Website', key: 'rawWebsite', kind: 'list' },
      { label: 'Docs', key: 'docs', kind: 'list' },
    ],
  },
  {
    key: 'grants',
    title: 'Grants',
    fields: [
      { label: 'Grants', key: 'grants', kind: 'list' },
      { label: 'Communities', key: 'communities', kind: 'list' },
    ],
  },
  {
    key: 'socials',
    title: 'Socials',
    fields: [
      { label: 'Twitter', key: 'twitter', kind: 'list' },
      { label: 'Github', key: 'github', kind: 'list' },
      { label: 'Discord', key: 'discord', kind: 'list' },
      { label: 'Telegram', key: 'telegram', kind: 'list' },
    ],
  },
  {
    key: 'jobsites',
    title: 'Jobsites',
    fields: [
      { label: 'Jobsites', key: 'jobsites', kind: 'jobsite' },
      {
        label: 'Detected Jobsites',
        key: 'detectedJobsites',
        kind: 'detected-jobsite',
      },
    ],
  },
  {
    key: 'projects',
    title: 'Projects',
    fields: [{ label: 'Projects', key: 'projects', kind: 'projects' }],
  },
];

const formStateAtom = atom<ManagedOrgFormState>(DEFAULT_FORM_STATE);

export const useManagedOrgForm = (orgId: string) => {
  const { data } = useManagedOrg(orgId);

  const [initFormState, setInitFormState] = useState(DEFAULT_FORM_STATE);
  const [formState, setFormState] = useAtom(formStateAtom);

  useEffect(() => {
    if (data) {
      const initFormState = dataToFormState(data);
      setInitFormState(initFormState);
      setFormState(initFormState);
    }
  }, [data, setFormState]);

  // Handle form field changes
  const handleFieldChange = (
    key: keyof ManagedOrgFormState,
    value: string | boolean | number | Jobsite[],
  ) => {
    if (key === 'detectedJobsites' && (value as Jobsite[]).length === 0) {
      setFormState((prev) => ({
        ...prev,
        detectedJobsites: [],
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const [tab, setTab] = useAtom(orgManageTabAtom);
  const onChangeTab = (key: React.Key) => {
    setTab(key as OrgManageTab);
  };

  const prev = JSON.stringify(initFormState);
  const next = JSON.stringify(formState);
  const hasChanges = prev !== next;

  const onUnlinkProject = (projectId: string) => {
    const newProjectIds = formState.projects
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== projectId)
      .join(', ');

    handleFieldChange('projects', newProjectIds);
  };

  const onAddProject = (projectId: string) => {
    const currentProjects = formState.projects
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    if (!currentProjects.includes(projectId)) {
      currentProjects.push(projectId);
    }

    handleFieldChange('projects', currentProjects.join(', '));
  };

  const onChangeJobsite = (
    key: 'jobsites' | 'detectedJobsites',
    newJobsite: Jobsite,
    op = 'update' as 'create' | 'update' | 'delete',
  ) => {
    switch (op) {
      case 'update': {
        const newJobsites = formState[key].map((jobsite) => {
          if (jobsite.id === newJobsite.id) {
            return newJobsite;
          }

          return jobsite;
        });

        handleFieldChange(key, newJobsites);
        break;
      }

      case 'create': {
        const newJobsites = [...formState[key], newJobsite];
        handleFieldChange(key, newJobsites);
        break;
      }

      case 'delete': {
        const newJobsites = formState[key].filter(
          (jobsite) => jobsite.id !== newJobsite.id,
        );
        handleFieldChange(key, newJobsites);
        break;
      }

      default: {
        throw new Error('invalid op');
      }
    }
  };

  const { mutate: updateOrg, isPending } = useUpdateOrg();

  const successCbRef = useRef<() => void>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      const payload = formStateToPayload(formState);

      updateOrg(payload, {
        onSuccess() {
          if (successCbRef.current) {
            successCbRef.current();
            successCbRef.current = undefined;
          }
        },
        onSettled() {
          setIsSubmitting(false);
        },
      });
    }
  }, [formState, isSubmitting, updateOrg]);

  const onSubmit = (onSuccess?: () => void) => {
    if (data) {
      setIsSubmitting(true);
      if (onSuccess) {
        successCbRef.current = onSuccess;
      }
    }
  };

  return {
    formState,
    hasChanges,
    handleFieldChange,
    inputSections,
    tab,
    onChangeTab,
    isPending: isPending || isSubmitting,
    onSubmit,
    onUnlinkProject,
    onAddProject,
    onChangeJobsite,
  };
};
