import type { Listing, ListingProps } from '~/core/interfaces';

import { Divider } from '../unstyled-ui/base/divider';
import { LogoTitle } from '../unstyled-ui/logo-title';

import { ListingDesc } from './listing-desc';
import { ListingHeader } from './listing-header';
import { ListingTags } from './listing-tags';
import { ListingTechs } from './listing-techs';
import { ListingWrapper } from './listing-wrapper';

/** Override listing field as ProjectListing */
interface Props extends ListingProps {
  listing: Listing;
}

export const ListingCardRepo = ({ listing, isActive, onClick }: Props) => {
  const { repositories } = listing;

  if (repositories.length === 0) return null;

  const repo = repositories[0];
  const { name, recent, desc, tags, techs, orgInfo } = repo;

  return (
    <ListingWrapper isActive={isActive} onClick={onClick}>
      <ListingHeader title={name} recent={recent} />
      <ListingDesc desc={desc} />
      <ListingTags tags={tags} />
      <Divider />
      <ListingTechs techs={techs} />
      <Divider />
      <LogoTitle avatar={orgInfo.avatar} name={orgInfo.name} size="md" />
    </ListingWrapper>
  );
};
