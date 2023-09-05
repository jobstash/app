export interface BlockedTermsSlice {
  // Computed value
  options: string[];

  // Blocked terms fetched from backend
  fetchedBlockedTerms: string[];
  setFetchedBlockedTerms: (_: string[]) => void;

  // Blocked terms state
  blockedTerms: string[];
  blockTerm: (term: string) => void;
  onSuccessBlockTerms: (technologyNameList: string[]) => void;

  // Unblocked terms state
  unblockedTerms: string[];
  unblockTerm: (term: string) => void;
  onSuccessUnblockTerms: (technologyNameList: string[]) => void;
}
