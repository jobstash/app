import { useCallback, useState } from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';

import { cn } from '@jobstash/shared/utils';

import { usePricingContext } from '../context';
import { Feature, Tier } from '../types';

interface Props {
  isSelected: boolean;
  feature: Feature;
  onToggleTier: (title: string) => void;
}

export const TierTabs = ({ isSelected, feature, onToggleTier }: Props) => {
  const { section, price } = feature;

  const { selectedPrices } = usePricingContext();
  const selectedKey =
    selectedPrices.find((price) => price.id === section)?.title || undefined;

  // Nextui tabs bug - calling onSelectionChange onstart
  const [initialized, setInitialized] = useState(false);

  const onSelectionChange = useCallback(
    (key: React.Key) => {
      if (!initialized) {
        setInitialized(true);
        return;
      }

      onToggleTier(key as string);
    },
    [initialized, onToggleTier],
  );

  if (!Array.isArray(price)) return null;

  return (
    <div className="h-fit" onClick={(e) => e.stopPropagation()}>
      <Tabs
        size="sm"
        variant="bordered"
        classNames={{
          tabList: 'border border-white/5 rounded-lg p-0.5 gap-1',
          tabContent: cn(
            'text-sm group-data-[selected=true]:text-default-500',
            {
              'group-data-[selected=true]:text-white': isSelected,
            },
          ),
          cursor: cn('bg-transparent shadow-none', {
            'bg-white/5': isSelected,
          }),
        }}
        selectedKey={selectedKey}
        onSelectionChange={onSelectionChange}
      >
        {(price as Tier[]).map((p) => (
          <Tab key={p.title} title={p.title} />
        ))}
      </Tabs>
    </div>
  );
};

TierTabs.displayName = 'TierTabs';
