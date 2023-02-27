import { Project, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createRightPanelProjectCardTags = ({
  tvl,
  monthlyVolume,
  monthlyFees,
  monthlyRevenue,
}: Project): TagElement[] => {
  const tags: TagElement[] = [
    { text: 'Jobs: TBD', iconText: 'baggage-2', link: '#' },
    {
      text: 'Relevant Repos: TBD',
      iconText: 'github',
      link: '#',
    },
    {
      text: 'Category: TBD',
      iconText: 'category',
    },
    {
      text: 'TeamSize: TBD',
      iconText: 'category',
    },
  ];

  if (tvl)
    tags.push({ text: `TVL: $${numFormatter.format(tvl)}`, iconText: 'tvl' });

  if (monthlyVolume)
    tags.push({
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      iconText: 'monthly-volume',
    });

  if (monthlyFees)
    tags.push({
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      iconText: 'monthly-volume',
    });

  tags.push({
    text: 'Active Users: TBD',
    iconText: 'active-user',
  });

  if (monthlyRevenue)
    tags.push({
      text: `Revenue: $${numFormatter.format(monthlyRevenue)}`,
      iconText: 'revenue',
    });

  return tags;
};
