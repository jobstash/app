import Joi from 'joi';

import { Job } from '../interfaces';

export const JobSchema = Joi.object<Job>({
  // Required
  id: Joi.string().required(),
  jobTitle: Joi.string().required(),
  jobCreatedTimestamp: Joi.number().required().integer().positive(),
  jobFoundTimestamp: Joi.number().required().integer().positive(),
  extractedTimestamp: Joi.number().required().integer().positive(),
  seniority: Joi.string(),
  minSalary: Joi.number().min(0).integer().less(Joi.ref('maxSalary')),
  maxSalary: Joi.number().integer().positive(),
  jobLocation: Joi.string(),
  jobCommitment: Joi.string(),
  jobApplyPageUrl: Joi.string().required().uri(),
  jobPageUrl: Joi.string().uri(),
  role: Joi.string().required(),
  team: Joi.string(),
  benefits: Joi.string(),
  culture: Joi.string(),
});
