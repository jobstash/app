import { type Infer } from 'myzod';

import {
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
