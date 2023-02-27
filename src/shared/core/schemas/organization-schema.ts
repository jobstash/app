import Joi from 'joi';

import { Organization } from '../interfaces';

export const OrganizationSchema = Joi.object<Organization>({
  id: Joi.string().required(),
  orgId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  summary: Joi.string().required(),
  url: Joi.string().required().uri(),
  location: Joi.string().required(),
  createdTimestamp: Joi.number().required().integer().positive(),
  updatedTimestamp: Joi.number().integer().integer().positive(),
  teamSize: Joi.string(),
  githubOrganization: Joi.string().required().uri(),
  twitter: Joi.string().uri(),
  discord: Joi.string().uri(),
  linkedin: Joi.string().uri(),
  telegram: Joi.string().uri(),
});
