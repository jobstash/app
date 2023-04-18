import Joi from 'joi';

import { JobPost } from '../interfaces';

export const JobSchema = Joi.object<JobPost>({
  // Required
  id: Joi.string().required(),
  shortUUID: Joi.string().required(),
  jobTitle: Joi.string().required(),
  jobCreatedTimestamp: Joi.number().required().integer().positive(),
  jobFoundTimestamp: Joi.number().required().integer().positive(),
  extractedTimestamp: Joi.number().required().integer().positive(),
  seniority: Joi.string(),
  minSalaryRange: Joi.number().min(0).integer().less(Joi.ref('maxSalaryRange')),
  maxSalaryRange: Joi.number().integer().positive(),
  jobLocation: Joi.string(),
  jobCommitment: Joi.string(),
  jobApplyPageUrl: Joi.string().required().uri(),
  jobPageUrl: Joi.string().uri(),
  role: Joi.string().required(),
  team: Joi.string(),
  benefits: Joi.string(),
  culture: Joi.string(),
});
