import { UpdateOrgJobPayload } from '@jobstash/organizations/core';

export type FormKey = keyof UpdateOrgJobPayload;
export type FormValue = UpdateOrgJobPayload[FormKey];
export type HandleFieldChange = (key: FormKey, value: FormValue) => void;
