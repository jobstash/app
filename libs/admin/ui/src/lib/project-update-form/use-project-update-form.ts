import { useEffect, useRef, useState } from 'react';

import { useAtom } from 'jotai';

import {
  dataToProjectPayload,
  sanitizeProjectFormState,
  UpdateProjectPayload,
} from '@jobstash/admin/core';
import { Jobsite } from '@jobstash/shared/core';

import {
  ProjectManageTab,
  projectManageTabAtom,
  useProjectItem,
  useUpdateProject,
} from '@jobstash/admin/state';

const DEFAULT_FORM_STATE: UpdateProjectPayload = {
  name: '',
  description: null,
  category: null,
  logo: null,
  isMainnet: false,
  tvl: null,
  monthlyFees: null,
  monthlyVolume: null,
  monthlyRevenue: null,
  monthlyActiveUsers: null,
  website: null,
  docs: null,
  twitter: null,
  discord: null,
  github: null,
  telegram: null,
  tokenAddress: null,
  tokenSymbol: null,
  defiLlamaId: null,
  defiLlamaSlug: null,
  defiLlamaParent: null,
  jobsites: [],
  detectedJobsites: [],
};

const inputSections = [
  {
    key: 'details',
    title: 'Details',
    fields: [
      { label: 'Name', key: 'name' },
      { label: 'Category', key: 'category' },
      { label: 'Description', key: 'description', kind: 'textarea' },
      { label: 'Logo URL', key: 'logo' },
      { label: 'Is Mainnet', key: 'isMainnet', kind: 'boolean' },
    ],
  },
  {
    key: 'org',
    title: 'Organization',
    fields: [{ label: 'Organization', key: 'org', kind: 'org' }],
  },
  {
    key: 'financials',
    title: 'Financials',
    fields: [
      { label: 'TVL', key: 'tvl', kind: 'number' },
      { label: 'Monthly Fees', key: 'monthlyFees', kind: 'number' },
      { label: 'Monthly Volume', key: 'monthlyVolume', kind: 'number' },
      { label: 'Monthly Revenue', key: 'monthlyRevenue', kind: 'number' },
      {
        label: 'Monthly Active Users',
        key: 'monthlyActiveUsers',
        kind: 'number',
      },
    ],
  },
  {
    key: 'websites',
    title: 'Websites',
    fields: [
      { label: 'Website', key: 'website' },
      { label: 'Docs', key: 'docs', kind: 'list' },
    ],
  },
  {
    key: 'socials',
    title: 'Socials',
    fields: [
      { label: 'Twitter', key: 'twitter', kind: 'list' },
      { label: 'Discord', key: 'discord', kind: 'list' },
      { label: 'Github', key: 'github', kind: 'list' },
      { label: 'Telegram', key: 'telegram', kind: 'list' },
    ],
  },
  {
    key: 'tokens',
    title: 'Tokens',
    fields: [
      { label: 'Token Address', key: 'tokenAddress' },
      { label: 'Token Symbol', key: 'tokenSymbol' },
    ],
  },
  {
    key: 'defillama',
    title: 'DefiLlama',
    fields: [
      { label: 'DefiLlama ID', key: 'defiLlamaId' },
      { label: 'DefiLlama Slug', key: 'defiLlamaSlug' },
      { label: 'DefiLlama Parent', key: 'defiLlamaParent' },
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
];

export const useProjectUpdateForm = (projectId: string) => {
  const { data } = useProjectItem(projectId);

  const [initFormState, setInitFormState] =
    useState<UpdateProjectPayload>(DEFAULT_FORM_STATE);
  const [formState, setFormState] =
    useState<UpdateProjectPayload>(DEFAULT_FORM_STATE);

  useEffect(() => {
    if (data) {
      const initFormState = dataToProjectPayload(data);
      setInitFormState(initFormState);
      setFormState(initFormState);
    }
  }, [data]);

  const handleFieldChange = (
    key: keyof UpdateProjectPayload,
    value: string | boolean | number | Jobsite[],
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [tab, setTab] = useAtom(projectManageTabAtom);
  const onChangeTab = (key: React.Key) => {
    setTab(key as ProjectManageTab);
  };

  const { mutate: updateProject, isPending: isPendingUpdate } =
    useUpdateProject(projectId);

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

  const successCbRef = useRef<() => void>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      const payload = sanitizeProjectFormState(formState);

      updateProject(payload, {
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
  }, [formState, isSubmitting, updateProject]);

  const onSubmit = (onSuccess?: () => void) => {
    setIsSubmitting(true);
    if (onSuccess) {
      successCbRef.current = onSuccess;
    }
  };

  const prev = JSON.stringify(initFormState);
  const next = JSON.stringify(sanitizeProjectFormState(formState));
  const hasChanges = prev !== next;

  return {
    isLoading: !data,
    formState,
    hasChanges,
    handleFieldChange,
    inputSections,
    tab,
    onChangeTab,
    isPending: isPendingUpdate || isSubmitting,
    onChangeJobsite,
    onSubmit,
    orgIds: data?.orgIds ?? [],
  };
};
