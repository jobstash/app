import { fakeGuaranteedListing } from '../faker/fake-guaranteed-listing';

// Declared here so nextjs would eval fakers at buildtime and won't include fakers in bundle
export const mockGuaranteedListing = fakeGuaranteedListing();
