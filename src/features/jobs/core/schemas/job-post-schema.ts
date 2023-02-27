import Joi from 'joi';

import {
  JobSchema,
  OrganizationSchema,
  ProjectSchema,
} from '~/shared/core/schemas';

export const JobPostSchema = Joi.object({
  jobpost: JobSchema.required(),
  organization: OrganizationSchema.required(),
  technologies: Joi.array().items(Joi.string()).required().min(1),
  categories: Joi.array().items(Joi.string()).required().min(1),
  project: ProjectSchema,
});
