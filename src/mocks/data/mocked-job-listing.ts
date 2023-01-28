import { fakeFirstJobListing } from '../faker/fake-first-job-listing';
import { fakeJobListings } from '../faker/fake-job-listing';

export const mockFirstJobListing = fakeFirstJobListing();
export const mockedJobListings = fakeJobListings(6, 12);
