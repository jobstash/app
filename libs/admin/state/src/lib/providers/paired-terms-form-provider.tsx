import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { PairedTermsFormContext } from '../contexts/paired-terms-form-context';
import { useTechnologiesContext } from '../contexts/technologies-context';
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
  const { mappedTechnologies: technologies } = useTechnologiesContext();

  const [origin, setOrigin] = useState(initOrigin);

  const onChangeOrigin = useCallback((value: string) => setOrigin(value), []);

  const [destination, setDestination] = useState<string[]>(initDestination);

  const destinationOptions = useMemo(
    () => technologies.filter((t) => !destination.includes(t) && t !== origin),
    [destination, origin, technologies],
  );

  const addDestination = (value: string) => {
    setDestination((prev) => [...prev, value]);
  };

  const removeDestination = (value: string) =>
    setDestination((prev) => prev.filter((t) => t !== value));

  const [isLoading, setIsLoading] = useState(false);

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
      isLoading,
      setIsLoading,
    }),
    [
      destination,
      destinationOptions,
      initDestination,
      initOrigin,
      onChangeOrigin,
      origin,
      isLoading,
      setIsLoading,
    ],
  );

  return (
    <PairedTermsFormContext.Provider value={value}>
      {children}
    </PairedTermsFormContext.Provider>
  );
};
