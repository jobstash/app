import { useEffect, useState } from 'react';

import { UserShowcase } from '@jobstash/shared/core';

import { type ProfileShowcaseContextProps } from '../contexts/profile-showcase-context';

import { useProfileShowcaseMutation } from './use-profile-showcase-mutation';
import { useProfileShowcaseQuery } from './use-profile-showcase-query';
const SHOWCASE_OPTIONS = ['CV', 'Portfolio', 'Website'];

export const useProfileShowcase = (): ProfileShowcaseContextProps => {
  // Sync fetched data with current state
  const {
    isLoading: isLoadingQuery,
    isFetching,
    data,
  } = useProfileShowcaseQuery();
  const [showcases, setShowcases] = useState<UserShowcase[]>([]);

  useEffect(() => {
    if (data) {
      setShowcases(data);
    }
  }, [data]);

  // Toggle form
  const [displayForm, setDisplayForm] = useState(false);

  // Created labels
  const [createdOptions, setCreatedOptions] = useState<string[]>([]);
  const addOption = (newOption: string) => {
    setCreatedOptions((prev) => [...prev, newOption]);
  };

  // Options
  const options = [...new Set([...SHOWCASE_OPTIONS, ...createdOptions])];

  // Current active form
  const [editedShowcase, setEditedShowcase] = useState({
    id: '',
    label: '',
    url: '',
  });

  // Track what id is being removed
  const [updatedId, setUpdatedId] = useState('');

  // Clear form inputs
  const clearForm = () => {
    setDisplayForm(false);
    setEditedShowcase({
      id: '',
      label: '',
      url: '',
    });
    if (updatedId) setUpdatedId('');
  };

  const { isLoading: isLoadingMutation, mutate } =
    useProfileShowcaseMutation(clearForm);

  // Exec showcase mutation
  const mutateShowcase = (showcase: UserShowcase[]) => {
    mutate({
      // Only label, url required in payload
      showcase: showcase.map(({ label, url }) => ({ label, url })),
    });
  };

  // Mutate add showcase
  const addShowcase = () => {
    if (editedShowcase.label) {
      mutateShowcase([...showcases, editedShowcase]);
    }
  };

  // Mutate remove showcase
  const removeShowcase = (id: string) => {
    if (displayForm) setDisplayForm(false);
    setUpdatedId(id);
    mutateShowcase(showcases.filter((s) => s.id !== id));
  };

  const onToggleForm = () => {
    setDisplayForm((prev) => !prev);
  };

  return {
    isLoading: {
      query: isLoadingQuery || isFetching,
      mutation: isLoadingMutation,
    },
    options,
    addOption,
    showcases,
    editedShowcase,
    setEditedShowcase,
    displayForm,
    addShowcase,
    removeShowcase,
    onToggleForm,
    updatedId,
  };
};
