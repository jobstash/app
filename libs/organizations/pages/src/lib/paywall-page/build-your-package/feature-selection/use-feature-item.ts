/* eslint-disable unicorn/prefer-query-selector */

import { useCallback, useMemo } from 'react';

import { usePricingContext } from '../context';
import { Feature, Tier } from '../types';

const SCROLL_OFFSET = 140;

export const useFeatureItem = (feature: Feature) => {
  const { section, price } = feature;

  const { selectedPrices, toggleFeature } = usePricingContext();

  const isSelected = useMemo(
    () => selectedPrices.some((selectedPrice) => selectedPrice.id === section),
    [selectedPrices, section],
  );

  const onToggle = useCallback(() => {
    toggleFeature(feature);
  }, [feature, toggleFeature]);

  const onToggleTier = useCallback(
    (title: string) => {
      const tier = (price as Tier[]).find((price) => price.title === title);
      if (!tier) return;

      toggleFeature(feature, tier);
    },
    [feature, price, toggleFeature],
  );

  const onLearnMore = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const element = document.getElementById(section);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - SCROLL_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    },
    [section],
  );

  const selectedTier = Array.isArray(price)
    ? selectedPrices.find((price) => price.id === section) ?? null
    : null;

  return {
    isSelected,
    onToggle,
    onToggleTier,
    onLearnMore,
    selectedTier,
  };
};
