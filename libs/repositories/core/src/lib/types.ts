import { Infer } from 'myzod';

import { repositoryDetailsSchema } from './schemas';

export type RepositoryDetails = Infer<typeof repositoryDetailsSchema>;
