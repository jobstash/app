import { atom } from 'jotai';

type GotItCardStatus = {
  profile: boolean;
  repositories: boolean;
  reviews: boolean;
};

export const showGotItCardAtom = atom<GotItCardStatus>({
  profile: false,
  repositories: false,
  reviews: false,
});
