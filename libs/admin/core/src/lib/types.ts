import { Infer } from 'myzod';

import {
  godmodeBlockedTechnologiesSchema,
  godmodeTechnologiesSchema,
} from './schemas';

export type GodmodeTechnologiesResponse = Infer<
  typeof godmodeTechnologiesSchema
>;

export type GodmodeBlockedTechnologiesResponse = Infer<
  typeof godmodeBlockedTechnologiesSchema
>;
