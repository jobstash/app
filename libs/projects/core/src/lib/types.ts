import { Infer } from 'myzod';

import { projectSchema } from './schemas';

export type Project = Infer<typeof projectSchema>;
