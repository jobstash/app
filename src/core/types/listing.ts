import {
  KIND_LISTING_JOB,
  KIND_LISTING_ORG,
  KIND_LISTING_PROJECT,
  KIND_LISTING_REPO,
} from '~/core/constants/listing';

export type ListingKind =
  | typeof KIND_LISTING_JOB
  | typeof KIND_LISTING_ORG
  | typeof KIND_LISTING_PROJECT
  | typeof KIND_LISTING_REPO;
