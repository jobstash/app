import Joi from 'joi';

import { Hack } from '../interfaces';

export const HackSchema = Joi.object<Hack>({
  id: Joi.string().uuid().required(),
  link: Joi.string().uri().required(),
  classification: Joi.string().required(),
  fundsLost: Joi.number().required(),
  date: Joi.number().required(),
});
