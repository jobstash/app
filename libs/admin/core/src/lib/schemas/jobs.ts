import { UseMutateFunction } from '@tanstack/react-query';
import myzod, { type Infer } from 'myzod';

export const jobsUpdateableFieldsSchema = myzod
  .object({
    shortUUID: myzod.string().min(1),
    url: myzod.string().min(1),
    benefits: myzod.array(myzod.string().min(1)),
    requirements: myzod.array(myzod.string().min(1)),
    responsibilities: myzod.array(myzod.string().min(1)),
    title: myzod.string().min(1),
    summary: myzod.string().min(1).nullable(),
    description: myzod.string().min(1).nullable(),
    culture: myzod.string().min(1).nullable(),
    location: myzod.string().min(1).nullable(),
    locationType: myzod.string().min(1).nullable(),
    seniority: myzod.string().min(1).nullable(),
    paysInCrypto: myzod.boolean().nullable(),
    salary: myzod.number().nullable(),
    minimumSalary: myzod.number().nullable(),
    maximumSalary: myzod.number().nullable(),
    salaryCurrency: myzod.string().min(1).nullable(),
    offersTokenAllocation: myzod.boolean().nullable(),
    commitment: myzod.string().min(1).nullable(),
    classification: myzod.string().min(1).nullable(),
  })
  .allowUnknownKeys(true);

export type JobsUpdateableFields = Infer<typeof jobsUpdateableFieldsSchema>;

export const allJobsResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(jobsUpdateableFieldsSchema),
});

export type AllJobsResponse = Infer<typeof allJobsResponseSchema>;

export const updateJobResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: jobsUpdateableFieldsSchema,
});

export type UpdateJobResponse = Infer<typeof updateJobResponseSchema>;

export type UpdateJobMutFn = UseMutateFunction<
  UpdateJobResponse,
  unknown,
  JobsUpdateableFields,
  unknown
>;
