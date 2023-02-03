import type { Listing, ListingProps } from '~/core/interfaces';

import { Divider } from '../unstyled-ui/base/divider';

import { ListingHeader } from './listing-header';
import { ListingProject } from './listing-projects';
import { ListingTags } from './listing-tags';
import { ListingTechs } from './listing-techs';
import { ListingWrapper } from './listing-wrapper';

/** Override listing field as ProjectListing */
interface Props extends ListingProps {
  listing: Listing;
}

export const ListingCardProject = ({ listing, isActive, onClick }: Props) => {
  const { projects } = listing;

  if (projects.length === 0) return null;

  const project = projects[0];
  const { name, recent, tags, techs } = project;

  const allTags = [...tags.top, ...tags.bottom];

  return (
    <ListingWrapper isActive={isActive} onClick={onClick}>
      <ListingHeader title={name} recent={recent} />
      <Divider />
      <ListingTags tags={allTags} />
      <Divider />
      <ListingTechs techs={techs} />
      <Divider />
      <ListingProject projects={[project]} />
    </ListingWrapper>
  );
};
