import { PricingProvider } from './context';
import { DynamicPrice } from './dynamic-price';
import { FeatureSelection } from './feature-selection';

export const BuildYourPackage = () => (
  <PricingProvider>
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-400 pb-4">
          Build Your Package
        </h2>
        <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
          Pay Only for What You Need
        </span>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-white/90">
        Select your essential hiring tools to create your ideal package. Tailor
        your selection to include only what you truly need, and unlock exclusive
        features and savings.
      </p>

      <DynamicPrice />
      <FeatureSelection />
    </div>
  </PricingProvider>
);
