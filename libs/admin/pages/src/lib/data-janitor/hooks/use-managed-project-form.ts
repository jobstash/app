import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import { useProjectDetails } from '@jobstash/projects/state';

import { ProjectManageTab, projectManageTabAtom } from '../core/atoms';
import { dataToProjectPayload, UpdateProjectPayload } from '../core/schemas';

import { useUpdateManagedProject } from './use-update-managed-project';

const DEFAULT_FORM_STATE: UpdateProjectPayload = {
  orgId: null,
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
];

export const useManagedProjectForm = (projectId: string) => {
  const { data } = useProjectDetails(projectId);

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
    value: string | boolean | number,
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

  const { mutate: updateOrg, isPending } = useUpdateManagedProject(projectId);

  const onSubmit = () => {
    updateOrg(formState);
  };

  const prev = JSON.stringify(initFormState);
  const next = JSON.stringify(formState);
  const hasChanges = prev !== next;

  return {
    formState,
    hasChanges,
    handleFieldChange,
    inputSections,
    tab,
    onChangeTab,
    isPending,
    onSubmit,
  };
};
