/* eslint-disable jsx-a11y/no-redundant-roles */

import { CheckIcon } from '@heroicons/react/20/solid';

import { PricingButton } from './pricing-button';
import { Section, Tier } from './types';

interface Props {
  tier: Tier;
  sections: Section[];
}

export const MobilePricingTier = ({ tier, sections }: Props) => (
  <section className="p-8 rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
    <h3 id={tier.id} className="text-sm/6 font-semibold text-gray-900">
      {tier.name}
    </h3>
    <p className="mt-2 flex items-baseline gap-x-1 text-gray-900">
      <span className="text-4xl font-semibold">{tier.priceMonthly}</span>
      <span className="text-sm font-semibold">/month</span>
    </p>
    <PricingButton ariaDescribedBy={tier.id} />
    <ul role="list" className="mt-10 space-y-4 text-sm/6 text-gray-900">
      {sections.map((section) => (
        <li key={section.name}>
          <ul role="list" className="space-y-4">
            {section.features.map((feature) =>
              feature.tiers[tier.name] ? (
                <li key={feature.name} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    {feature.name}{' '}
                    {typeof feature.tiers[tier.name] === 'string' ? (
                      <span className="text-sm/6 text-gray-500">
                        ({feature.tiers[tier.name]})
                      </span>
                    ) : null}
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        </li>
      ))}
    </ul>
  </section>
);
