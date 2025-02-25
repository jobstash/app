import { Button } from "@heroui/button";

import { Feature } from '../types';

import { FeatureItemWrapper } from './feature-item-wrapper';
import { ShinyText } from './shiny-text';
import { TierTabs } from './tier-tabs';
import { useFeatureItem } from './use-feature-item';

interface Props {
  feature: Feature;
}

export const FeatureItem = ({ feature }: Props) => {
  const {
    icon,
    title,
    description,
    concatTitle = true,
    defaultTierTitle = '',
  } = feature;

  const { isSelected, onToggle, onToggleTier, onLearnMore, selectedTier } =
    useFeatureItem(feature);

  const mainButtonText = isSelected ? 'Remove' : 'Add to Package';

  const itemTitle = selectedTier
    ? concatTitle
      ? `${title} ${selectedTier.title}`
      : selectedTier.title
    : `${title} ${defaultTierTitle}`;

  const itemDescription = selectedTier ? selectedTier.description : description;

  return (
    <FeatureItemWrapper isSelected={isSelected} onToggle={onToggle}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between flex-col gap-4 md:flex-row flex-wrap">
            {icon}
            <TierTabs
              isSelected={isSelected}
              feature={feature}
              onToggleTier={onToggleTier}
            />
          </div>
          <ShinyText
            text={itemTitle}
            className="text-2xl font-semibold select-none"
          />
        </div>
        <div className="min-h-[80px]">
          <p className="text-gray-200 text-base select-none">
            {itemDescription}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            variant={isSelected ? 'flat' : 'solid'}
            size="sm"
            radius="sm"
            className="min-w-[112px]"
            onClick={onToggle}
          >
            {mainButtonText}
          </Button>
          <Button size="sm" variant="light" radius="sm" onClick={onLearnMore}>
            Learn More <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </FeatureItemWrapper>
  );
};
