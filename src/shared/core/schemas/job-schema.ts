import Joi from 'joi';

import { Job } from '../interfaces';

export const JobSchema = Joi.object<Job>({
  // Required
  id: Joi.string().required(),
  jobTitle: Joi.string().required(),
  jobCreatedTimestamp: Joi.number().required().integer().positive(),
  jobFoundTimestamp: Joi.number().required().integer().positive(),
  extractedTimestamp: Joi.number().required().integer().positive(),
  minSalaryRange: Joi.number()
    .required()
    .min(0)
    .integer()
    .less(Joi.ref('maxSalary')),
  maxSalaryRange: Joi.number().required().integer().positive(),
  jobLocation: Joi.string().required(),
  jobCommitment: Joi.string().required(),
  jobApplyPageUrl: Joi.string().required().uri(),
  jobPageUrl: Joi.string().required().uri(),
  role: Joi.string().required(),
  team: Joi.string().required(),
  benefits: Joi.string().required(),
  culture: Joi.string().required(),

  // Optionals
  seniority: Joi.string(),
});
