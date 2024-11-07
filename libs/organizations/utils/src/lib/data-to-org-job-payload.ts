import { OrgJobItem, UpdateOrgJobPayload } from '@jobstash/organizations/core';
import { makeNullable, normalizePayload } from '@jobstash/shared/utils';

const nullable = <T>(value: T) => value || null;

export const dataToOrgJobPayload = (data: OrgJobItem): UpdateOrgJobPayload =>
  normalizePayload({
    url: data.url ?? '',
    benefits: data.benefits,
    requirements: data.requirements,
    responsibilities: data.responsibilities,
    title: makeNullable(data.title),
    salary: makeNullable(data.salary),
    summary: makeNullable(data.summary),
    description: makeNullable(data.description),
    culture: makeNullable(data.culture),
    location: makeNullable(data.location),
    seniority: makeNullable(data.seniority),
    paysInCrypto: nullable(data.paysInCrypto),
    minimumSalary: makeNullable(data.minimumSalary),
    maximumSalary: makeNullable(data.maximumSalary),
    salaryCurrency: makeNullable(data.salaryCurrency),
    offersTokenAllocation: nullable(data.offersTokenAllocation),
    commitment: makeNullable(data.commitment),
    classification: makeNullable(data.classification),
    locationType: makeNullable(data.locationType),
    project: makeNullable(data.project?.id),
    isBlocked: data.isBlocked,
    isOnline: data.isOnline,
    tags: data.tags,
  });

export const sanitizeOrgJobPayload = (
  payload: UpdateOrgJobPayload,
): UpdateOrgJobPayload => {
  const data = normalizePayload(payload);

  return {
    ...data,
    title: makeNullable(data.title),
    salary: makeNullable(data.salary),
    summary: makeNullable(data.summary),
    description: makeNullable(data.description),
    culture: makeNullable(data.culture),
    location: makeNullable(data.location),
    seniority: makeNullable(data.seniority),
    paysInCrypto: nullable(data.paysInCrypto),
    minimumSalary: makeNullable(data.minimumSalary),
    maximumSalary: makeNullable(data.maximumSalary),
    salaryCurrency: makeNullable(data.salaryCurrency),
    offersTokenAllocation: nullable(data.offersTokenAllocation),
    commitment: makeNullable(data.commitment),
    classification: makeNullable(data.classification),
    locationType: makeNullable(data.locationType),
    project: makeNullable(data.project),
  };
};
