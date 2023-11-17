import { useState } from 'react';

import { useTagsContext } from '../contexts/tags-context';

import { usePairedTermsMutation } from './use-paired-terms-mutation';

export const usePairedTermForm = (
  initOrigin: string | null,
  initDestination: string[],
) => {
  const { mappedTags: tags } = useTagsContext();

  const [origin, setOrigin] = useState(initOrigin);

  const onChangeOrigin = (value: string) => setOrigin(value);

  const [destination, setDestination] = useState<string[]>(initDestination);

  const destinationOptions = tags.filter(
    (t) => !destination.includes(t) && t !== origin,
  );

  const addDestination = (value: string) => {
    setDestination((prev) => [...prev, value]);
  };

  const removeDestination = (value: string) =>
    setDestination((prev) => prev.filter((t) => t !== value));

  const { isLoading: isLoadingMutation, mutate } = usePairedTermsMutation();

  const onSubmit = () => {
    if (origin) {
      mutate({
        originTag: origin,
        pairedTagList: destination,
      });

      const isExisting = Boolean(initOrigin);
      if (!isExisting) {
        setOrigin('');
        setDestination([]);
      }
    }
  };

  return {
    origin,
    initOrigin,
    onChangeOrigin,
    destination,
    initDestination,
    destinationOptions,
    addDestination,
    removeDestination,
    isLoadingMutation,
    mutate,
    onSubmit,
  };
};
