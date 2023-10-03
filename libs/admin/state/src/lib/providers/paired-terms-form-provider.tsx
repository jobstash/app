import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { PairedTermsFormContext } from '../contexts/paired-terms-form-context';
import { useTagsContext } from '../contexts/tags-context';
import { usePairedTermsMutation } from '../hooks/use-paired-terms-mutation';

interface Props {
  initOrigin: string | null;
  initDestination: string[];
  children: ReactNode;
}

export const PairedTermsFormProvider = ({
  initOrigin,
  initDestination,
  children,
}: Props) => {
  const { mappedTags: tags } = useTagsContext();

  const [origin, setOrigin] = useState(initOrigin);

  const onChangeOrigin = useCallback((value: string) => setOrigin(value), []);

  const [destination, setDestination] = useState<string[]>(initDestination);

  const destinationOptions = useMemo(
    () => tags.filter((t) => !destination.includes(t) && t !== origin),
    [destination, origin, tags],
  );

  const addDestination = (value: string) => {
    setDestination((prev) => [...prev, value]);
  };

  const removeDestination = (value: string) =>
    setDestination((prev) => prev.filter((t) => t !== value));

  const { isLoading: isLoadingMutation, mutate } = usePairedTermsMutation();

  const value = useMemo(
    () => ({
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
    }),
    [
      destination,
      destinationOptions,
      initDestination,
      initOrigin,
      onChangeOrigin,
      origin,
      isLoadingMutation,
      mutate,
    ],
  );

  return (
    <PairedTermsFormContext.Provider value={value}>
      {children}
    </PairedTermsFormContext.Provider>
  );
};
