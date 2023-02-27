import {
  KIND_POST_JOB,
  KIND_POST_ORG,
  KIND_POST_PROJECT,
  KIND_POST_REPO,
} from '~/shared/core/constants';

export type PostKind =
  | typeof KIND_POST_JOB
  | typeof KIND_POST_ORG
  | typeof KIND_POST_PROJECT
  | typeof KIND_POST_REPO;
