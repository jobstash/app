import { Fragment } from 'react';

import { cn } from '@jobstash/shared/utils';

import { FeatureIcon } from './feature-icon';
import { PricingButton } from './pricing-button';
import { Section, Tier } from './types';

interface Props {
  tiers: Tier[];
  sections: Section[];
}

export const TableBody = ({ tiers, sections }: Props) => (
  <tbody>
    <tr>
      <th scope="row">
        <span className="sr-only">Price</span>
      </th>
      {tiers.map((tier) => (
        <td key={tier.id} className="px-6 pt-2 xl:px-8">
          <div className="flex items-baseline gap-x-1 text-gray-900">
            <span className="text-4xl font-semibold">{tier.priceMonthly}</span>
            <span className="text-lg font-semibold">/month</span>
          </div>
          <PricingButton />
        </td>
      ))}
    </tr>
    {sections.map((section, sectionIdx) => (
      <Fragment key={section.name}>
        <tr>
          <th
            scope="colgroup"
            colSpan={4}
            className={cn(
              sectionIdx === 0 ? 'pt-8' : 'pt-16',
              'pb-4 text-lg font-semibold text-indigo-300 border-b border-white/10',
            )}
          >
            {section.name}
            <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
          </th>
        </tr>
        {section.features.map((feature) => (
          <tr key={feature.name}>
            <th
              scope="row"
              className="py-4 font-normal text-gray-900 border-b border-white/10"
            >
              {feature.name}
              <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
            </th>
            {tiers.map((tier) => (
              <td
                key={tier.id}
                className="px-6 py-4 xl:px-8 border-b border-white/10"
              >
                <FeatureIcon
                  included={feature.tiers[tier.name]}
                  tierName={tier.name}
                />
              </td>
            ))}
          </tr>
        ))}
      </Fragment>
    ))}
  </tbody>
);
