import myzod from 'myzod';

export const undefinedSchema = myzod.undefined();

export const technologySchema = myzod.object(
  {
    id: myzod.string().min(1),
    name: myzod.string().min(1),
  },
  { allowUnknown: true },
);

export const investorSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
});

export const fundingRoundSchema = myzod.object(
  {
    id: myzod.string().min(1),
    date: myzod.number(),
    roundName: myzod.string().min(1).nullable(),
    raisedAmount: myzod.number().nullable(),
  },
  { allowUnknown: true },
);

export const categorySchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
});

export const chainSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
});

export const hackSchema = myzod.object({
  id: myzod.string().min(1),
  date: myzod.number(),
  classification: myzod.string().min(1),
  fundsLost: myzod.number(),
  link: myzod.string().min(1),
});

export const auditSchema = myzod.object({
  auditor: myzod.string().min(1).nullable(),
  link: myzod.string().min(1),
});
