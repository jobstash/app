import { type Infer } from 'myzod';

import { ATS_PROVIDERS } from './constants';
import {
  ATSTrackedNFT,
  orgCompensationSchema,
  orgDetailsSchema,
  orgJobSchema,
  orgListItemSchema,
  orgListQueryPageSchema,
  orgLocationSchema,
  orgRatingSchema,
  orgReviewSchema,
  orgStaffReviewSchema,
  orgTimezoneSchema,
  orgWorkingHourSchema,
  orgWorkingHoursSchema,
} from './schemas';

export type OrgListItem = Infer<typeof orgListItemSchema>;
export type OrgDetails = Infer<typeof orgDetailsSchema>;
export type OrgListQueryPage = Infer<typeof orgListQueryPageSchema>;
export type OrgJob = Infer<typeof orgJobSchema>;

export type OrgLocation = Infer<typeof orgLocationSchema>;
export type OrgTimezone = Infer<typeof orgTimezoneSchema>;
export type OrgWorkingHour = Infer<typeof orgWorkingHourSchema>;
export type OrgWorkingHours = Infer<typeof orgWorkingHoursSchema>;
export type OrgCompensation = Infer<typeof orgCompensationSchema>;
export type OrgRating = Infer<typeof orgRatingSchema>;
export type OrgStaffReview = Infer<typeof orgStaffReviewSchema>;
export type OrgReview = Infer<typeof orgReviewSchema>;

export type ATSSiteLabel =
  typeof ATS_PROVIDERS[keyof typeof ATS_PROVIDERS]['siteLabel'];

export type ATSPlatform =
  typeof ATS_PROVIDERS[keyof typeof ATS_PROVIDERS]['platformName'];

export type ATSPlatformName = Omit<
  ATSPlatform,
  typeof ATS_PROVIDERS['DEFAULT']['platformName']
>;

export type ATSTrackedNFTItem = ATSTrackedNFT & {
  key: string;
};
