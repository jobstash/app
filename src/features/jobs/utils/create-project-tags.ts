import { Project, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createProjectTags = (project?: Project): TagElement[] => {
  if (!project) return [];

  const { tokenSymbol, tvl, monthlyVolume, monthlyFees, monthlyRevenue } =
    project;

  const tags: TagElement[] = [];

  // **Note**: waiting for confirmation on how to create external link for project token
  if (tokenSymbol) tags.push({ text: `$${tokenSymbol}`, iconText: 'token' });

  if (tvl)
    tags.push({ text: `TVL: $${numFormatter.format(tvl)}`, iconText: 'tvl' });

  if (monthlyVolume)
    tags.push({
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      iconText: 'monthly-volume',
    });

  // **Note**: waiting for monthly-fees svg icon (update iconText if done)
  if (monthlyFees)
    tags.push({
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      iconText: 'monthly-volume',
    });

  if (monthlyRevenue)
    tags.push({
      text: `Monthly Revenue: $${numFormatter.format(monthlyRevenue)}`,
      iconText: 'revenue',
    });

  /**
   * Still waiting for backend/middleware implementation of the following:
   * 	- category
   *  - active users
   *  - audits
   * 	- hacks
   */

  return tags;
};
