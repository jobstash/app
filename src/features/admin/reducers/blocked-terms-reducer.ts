import { BlockedTermsAction, BlockedTermsState } from '../core/types';

export const blockedTermsReducer = (
  state: BlockedTermsState,
  action: BlockedTermsAction,
): BlockedTermsState => {
  const { type, payload } = action;

  switch (type) {
    case 'BLOCKED_TERMS_INIT_TECHS': {
      return {
        ...state,
        techOptions: payload,
      };
    }

    case 'BLOCKED_TERMS_INIT': {
      return {
        ...state,
        initBlockedTerms: payload,
        allBlockedTerms:
          state.allBlockedTerms.length === 0 ? payload : state.allBlockedTerms,
      };
    }

    case 'BLOCKED_TERM': {
      return {
        ...state,
        techOptions: state.techOptions.filter((term) => term !== payload),
        unblockedTerms: state.unblockedTerms.filter((term) => term !== payload),
        blockedTerms:
          state.blockedTerms.includes(payload) ||
          state.initBlockedTerms.includes(payload)
            ? state.blockedTerms
            : [...state.blockedTerms, payload],
        allBlockedTerms: [...state.allBlockedTerms, payload],
      };
    }

    case 'BLOCKED_TERMS': {
      const unblockedTerm = state.allBlockedTerms.find(
        (t) => !payload.includes(t),
      )!;

      return {
        ...state,
        unblockedTerms:
          state.unblockedTerms.includes(unblockedTerm) ||
          !state.initBlockedTerms.includes(unblockedTerm)
            ? state.unblockedTerms
            : [...state.unblockedTerms, unblockedTerm],
        techOptions: [...state.techOptions, unblockedTerm],
        blockedTerms: state.blockedTerms.filter((t) => t !== unblockedTerm),
        allBlockedTerms: state.allBlockedTerms.filter(
          (t) => t !== unblockedTerm,
        ),
      };
    }

    case 'SET_BLOCKED_TERMS_OK': {
      const toRemove = new Set(payload);

      return {
        ...state,
        blockedTerms: state.blockedTerms.filter((term) => !toRemove.has(term)),
      };
    }

    case 'UNSET_BLOCKED_TERMS_OK': {
      const toRemove = new Set(payload);

      return {
        ...state,
        unblockedTerms: state.unblockedTerms.filter(
          (term) => !toRemove.has(term),
        ),
      };
    }

    default: {
      throw new Error(
        `Unrecognized blocked-terms reducer action type = "${type}"`,
      );
    }
  }
};
