import { useCallback, useContext, useMemo, useState } from 'react';
import { createContext } from 'react';

import { Feature, PriceSelection, Tier } from './types';
interface PricingCtx {
  prevPrice: number;
  currentPrice: number;
  selectedPrices: PriceSelection[];
  toggleFeature: (feature: Feature, selectedTier?: Tier) => void;
  getFeatureTitle: (feature: Feature, tier?: Tier) => string;
}

const PricingContext = createContext<PricingCtx>({
  prevPrice: 0,
  currentPrice: 0,
  selectedPrices: [],
  toggleFeature: () => null,
  getFeatureTitle: () => '',
});

export const usePricingContext = () => {
  const context = useContext(PricingContext);

  if (!context) {
    throw new Error('usePricingContext must be used within a PricingProvider');
  }

  return context;
};

export const PricingProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedPrices, setSelectedPrices] = useState<PriceSelection[]>([]);

  const [prevPrice, setPrevPrice] = useState(0);
  const currentPrice = selectedPrices.reduce(
    (acc, curr) => acc + curr.price,
    0,
  );

  const toggleFeature = useCallback(
    (feature: Feature, selectedTier?: Tier) => {
      setPrevPrice(currentPrice);

      const { title, price } = getFeatureDeets(feature, selectedTier);

      setSelectedPrices(() => {
        const newSelectedPrices = selectedPrices.filter(
          (selection) => selection.id !== feature.section,
        );

        const isSelected = selectedPrices.some(
          (selection) => selection.id === feature.section,
        );

        const isTierSelected = selectedPrices.some(
          (selection) => selection.title === selectedTier?.title,
        );

        if (isSelected && (isTierSelected || !selectedTier)) {
          return newSelectedPrices;
        }

        const isTier = Array.isArray(feature.price);
        return [
          ...newSelectedPrices,
          {
            id: feature.section,
            title,
            price,
            description:
              selectedTier?.description ??
              (isTier
                ? (feature.price as Tier[])[0].description
                : feature.description),
          },
        ];
      });
    },
    [selectedPrices, currentPrice],
  );

  const value = useMemo(
    () => ({
      prevPrice,
      currentPrice,
      selectedPrices,
      toggleFeature,
      getFeatureTitle,
    }),
    [prevPrice, currentPrice, selectedPrices, toggleFeature],
  );

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  );
};

const getFeatureTitle = (feature: Feature, tier?: Tier) =>
  tier?.title ?? feature.title;

const getFeatureDeets = (feature: Feature, selectedTier?: Tier) => {
  const hasTiers = Array.isArray(feature.price);
  const tier =
    selectedTier ?? (hasTiers ? (feature.price as Tier[])[0] : undefined);
  const title = getFeatureTitle(feature, tier);
  const price = tier?.price ?? (feature.price as number);

  return { title, price };
};
