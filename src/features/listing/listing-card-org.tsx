import type { Listing, ListingProps } from '~/core/interfaces';

import { Divider } from '../unstyled-ui/base/divider';

import { ListingHeader } from './listing-header';
import { ListingTags } from './listing-tags';
import { ListingTechs } from './listing-techs';
import { ListingWrapper } from './listing-wrapper';

/** Override listing field as OrgListing */
interface Props extends ListingProps {
  listing: Listing;
}

/** UI for org-listing card */
export const ListingCardOrg = ({ listing, isActive, onClick }: Props) => {
  const { name, avatar, location, recent, tags, techs } = listing.org;

  return (
    <ListingWrapper isActive={isActive} onClick={onClick}>
      <ListingHeader
        title={name}
        recent={recent}
        avatar={avatar}
        location={location}
      />
      <Divider />
      <ListingTags tags={tags} />
      <Divider />
      <ListingTechs techs={techs} />
    </ListingWrapper>
  );
};
