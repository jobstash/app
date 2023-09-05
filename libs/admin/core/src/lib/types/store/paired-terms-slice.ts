import { type PairedTerm } from '../../schemas';

export interface PairedTermsSlice {
  pairedTerms: PairedTerm[];
  setPairedTerms: (_: PairedTerm[]) => void;

  destinationOptions: string[];
  destinationTerms: string[];
  addDestinationTerm: (_: string) => void;
  removeDestinationTerm: (_: string) => void;

  origin: string;
  onChangeOrigin: (_: string) => void;
}
