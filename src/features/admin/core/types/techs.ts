import {
  BLOCKED_TERM_DTYPE,
  BLOCKED_TERMS_DTYPE,
  BLOCKED_TERMS_INIT_DTYPE,
  BLOCKED_TERMS_INIT_TECHS_DTYPE,
  SET_BLOCKED_TERMS_OK_DTYPE,
  UNSET_BLOCKED_TERMS_OK_DTYPE,
} from '../constants';

export type AdminTechnology = {
  name: string;
  id: string;
  normalizedName: string;
};

export type BlockedTermsState = {
  techOptions: string[];
  initBlockedTerms: string[];
  blockedTerms: string[];
  unblockedTerms: string[];
  allBlockedTerms: string[];
};

type BlockedTermAction = {
  type: typeof BLOCKED_TERM_DTYPE;
  payload: string;
};

type BlockedTermListAction = {
  type: typeof BLOCKED_TERMS_DTYPE;
  payload: string[];
};

type BlockedTermsInitAction = {
  type: typeof BLOCKED_TERMS_INIT_DTYPE;
  payload: string[];
};

type BlockedTermsInitTechsAction = {
  type: typeof BLOCKED_TERMS_INIT_TECHS_DTYPE;
  payload: string[];
};

type SetBlockedTermsAction = {
  type: typeof SET_BLOCKED_TERMS_OK_DTYPE;
  payload: string[];
};

type UnsetBlockedTermsAction = {
  type: typeof UNSET_BLOCKED_TERMS_OK_DTYPE;
  payload: string[];
};

export type BlockedTermsAction =
  | BlockedTermsInitAction
  | BlockedTermAction
  | BlockedTermListAction
  | BlockedTermsInitTechsAction
  | SetBlockedTermsAction
  | UnsetBlockedTermsAction;
