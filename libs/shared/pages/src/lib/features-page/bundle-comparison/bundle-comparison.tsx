import { PRICING_SECTIONS, PRICING_TIERS } from './constants';
import { MobilePricingTier } from './mobile-pricing';
import { PricingTable } from './pricing-table';

const TITLE = 'JobStash Bundles';

const DESCRIPTION =
  'Compare JobStash Bundles to choose the best option for your recruitment needs. Our bundles offer comprehensive insights and exceptional value at every scale.';

export const BundleComparison = () => (
  <div
    id="bundled"
    className="bg-black/10 rounded-3xl py-24 mx-auto max-w-7xl px-6 lg:px-8"
  >
    <div className="w-full mx-auto max-w-4xl text-center flex flex-col items-center gap-2 pb-4">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent leading-normal pb-1">
        {TITLE}
      </h2>
      <p className="text-lg leading-8 text-white/90 max-w-2xl mx-auto">
        {DESCRIPTION}
      </p>
    </div>

    {/* Mobile view */}
    <div className="mx-auto max-w-md space-y-8 sm:mt-16 lg:hidden">
      {PRICING_TIERS.map((tier) => (
        <MobilePricingTier
          key={tier.id}
          tier={tier}
          sections={PRICING_SECTIONS}
        />
      ))}
    </div>

    {/* Desktop view */}
    <PricingTable />
  </div>
);
