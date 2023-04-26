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
        allBlockedTerms: payload,
      };
    }

    case 'BLOCKED_TERM': {
      return {
        ...state,
        // Remove term in tech options
        techOptions: state.techOptions.filter((term) => term !== payload),
        // In case it's unblocked in current session, remove it
        unblockedTerms: state.unblockedTerms.filter((term) => term !== payload),
        // Only add to new blocked terms when its not on initial/current list
        blockedTerms:
          state.blockedTerms.includes(payload) ||
          state.initBlockedTerms.includes(payload)
            ? state.blockedTerms
            : [...state.blockedTerms, payload],
        // Update all blocked terms
        allBlockedTerms: [...state.allBlockedTerms, payload],
      };
    }

    case 'BLOCKED_TERMS': {
      // Find the removed term
      const unblockedTerm = state.allBlockedTerms.find(
        (t) => !payload.includes(t),
      )!;

      return {
        ...state,
        // Include term only if its on initial list (meaning we remove it)
        // or if it's already in the current list
        unblockedTerms:
          state.unblockedTerms.includes(unblockedTerm) ||
          !state.initBlockedTerms.includes(unblockedTerm)
            ? state.unblockedTerms
            : [...state.unblockedTerms, unblockedTerm],
        // Include term back to tech options
        techOptions: [...state.techOptions, unblockedTerm],
        // Remove term from blocked terms
        blockedTerms: state.blockedTerms.filter((t) => t !== unblockedTerm),
        // Remove term from all blocked terms
        allBlockedTerms: state.allBlockedTerms.filter(
          (t) => t !== unblockedTerm,
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
