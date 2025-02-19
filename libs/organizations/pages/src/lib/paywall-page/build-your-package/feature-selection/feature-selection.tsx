import { FEATURES } from './constants';
import { FeatureItem } from './feature-item';

export const FeatureSelection = () => (
  <div className="grid grid-cols-1 pt-8 gap-x-8 gap-y-12 lg:grid-cols-3">
    {FEATURES.map((feature) => (
      <FeatureItem key={feature.title} feature={feature} />
    ))}
  </div>
);
