import Joi from 'joi';

import { Project } from '../interfaces';

export const ProjectSchema = Joi.object<Project>({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  url: Joi.string().required().uri(),
  logo: Joi.string().required().uri(),
  tokenAddress: Joi.string(),
  tokenSymbol: Joi.string(),
  isInConstruction: Joi.bool().required(),
  tvl: Joi.string(),
  monthlyVolume: Joi.number().positive(),
  monthlyFees: Joi.number().positive(),
  monthlyRevenue: Joi.number().positive(),
  createdTimestamp: Joi.number().required().integer().positive(),
  updatedTimestamp: Joi.number().integer().positive(),
  hacks: Joi.array().items(Joi.string()),
  audits: Joi.array().items(Joi.string()),
  chains: Joi.array().items(Joi.string()),
  defillamaId: Joi.string(),
  defillamaSlug: Joi.string(),
  defillamaParent: Joi.string(),
});
