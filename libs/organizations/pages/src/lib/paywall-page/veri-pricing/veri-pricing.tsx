import { PRICING_SECTIONS, PRICING_TIERS } from './constants';
import { MobilePricingTier } from './mobile-pricing';
import { PricingTable } from './pricing-table';

const TITLE = 'VERI Pricing Plans';

const DESCRIPTION =
  'Compare VERI Pricing Plans to choose the best option for your recruitment needs. Our plans offer comprehensive insights and exceptional value at every scale.';

export const VeriPricing = () => (
  <div className="bg-black/10 rounded-3xl py-24 mx-auto max-w-7xl px-6 lg:px-8">
    <div className="w-full mx-auto max-w-4xl text-center flex flex-col items-center gap-2">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent leading-normal pb-1">
        {TITLE}
      </h2>
      <p className="text-lg leading-8 text-white/90 max-w-2xl mx-auto">
        {DESCRIPTION}
      </p>
    </div>

    {/* Mobile view */}
    <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
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
