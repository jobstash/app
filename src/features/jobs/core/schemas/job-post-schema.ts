import Joi from 'joi';

import {
  CategorySchema,
  JobSchema,
  OrganizationSchema,
  ProjectSchema,
  TechnologySchema,
} from '~/shared/core/schemas';

import type { Job } from '../interfaces';

export const JobPostSchema = Joi.object<Job>({
  jobpost: JobSchema.required(),
  organization: OrganizationSchema.required(),
  technologies: Joi.array().items(TechnologySchema).required().min(1),
  categories: Joi.array().items(CategorySchema).required().min(1),
  project: ProjectSchema,
});
