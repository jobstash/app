import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { OrgImportItem, OrgImportStatus } from '../core/types';

export const orgImportTabAtom = atom<OrgImportStatus>('all');

export const ORG_IMPORT_ITEMS_KEY = 'org-import-items';
const ORG_IMPORT_ITEMS_DEFAULT_VALUE: OrgImportItem[] = [];

export const orgImportItemsAtom = atomWithStorage<OrgImportItem[]>(
  ORG_IMPORT_ITEMS_KEY,
  ORG_IMPORT_ITEMS_DEFAULT_VALUE,
  createJSONStorage(() => localStorage),
);

//
// import { atom } from 'jotai';

// import { OrgImportItem, OrgImportTabKey } from '../core/types';

// export const orgImportTabAtom = atom<OrgImportTabKey>('all');

// export const ORG_IMPORT_ITEMS_KEY = 'org-import-items';
// const ORG_IMPORT_ITEMS_DEFAULT_VALUE: OrgImportItem[] = [];

// const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
//   const getInitialValue = () => {
//     if (typeof window === 'undefined') return initialValue;

//     const item = localStorage.getItem(key);
//     return item ? (JSON.parse(item) as T) : initialValue;
//   };

//   const baseAtom = atom(getInitialValue());
//   const derivedAtom = atom(
//     (get) => get(baseAtom),
//     (get, set, update) => {
//       const nextValue =
//         typeof update === 'function' ? update(get(baseAtom)) : update;
//       console.log({ nextValue });
//       set(baseAtom, nextValue);
//       localStorage.setItem(key, JSON.stringify(nextValue));
//     },
//   );

//   return derivedAtom;
// };

// export const orgImportItemsAtom = atomWithLocalStorage<OrgImportItem[]>(
//   ORG_IMPORT_ITEMS_KEY,
//   ORG_IMPORT_ITEMS_DEFAULT_VALUE,
// );

// ALTERNATIVE: Only unique urls
// import { atom } from 'jotai';

// import { OrgImportItem, OrgImportTabKey } from '../core/types';

// export const orgImportTabAtom = atom<OrgImportTabKey>('all');

// export const ORG_IMPORT_ITEMS_KEY = 'org-import-items';
// const ORG_IMPORT_ITEMS_DEFAULT_VALUE = new Map<string, OrgImportItem>();
// type Value = typeof ORG_IMPORT_ITEMS_DEFAULT_VALUE;

// const encodeOrgItem = (map: Value) => [...map.entries()];
// const decodeOrgItem = (arr: [string, OrgImportItem][]) => new Map(arr);

// const atomWithLocalStorage = (key: string, initialValue: Value) => {
//   const getInitialValue = () => {
//     if (typeof window === 'undefined') return initialValue;

//     const item = localStorage.getItem(key);
//     console.log({ item });
//     if (item !== null) {
//       const parsed = JSON.parse(item);
//       return Array.isArray(parsed) ? decodeOrgItem(parsed) : initialValue;
//     }

//     return initialValue;
//   };

//   const baseAtom = atom(getInitialValue());
//   const derivedAtom = atom(
//     (get) => get(baseAtom),
//     (get, set, update) => {
//       const nextValue =
//         typeof update === 'function' ? update(get(baseAtom)) : update;
//       set(baseAtom, nextValue);
//       localStorage.setItem(key, JSON.stringify(encodeOrgItem(nextValue)));
//     },
//   );

//   return derivedAtom;
// };

// export const orgImportItemsAtom = atomWithLocalStorage(
//   ORG_IMPORT_ITEMS_KEY,
//   ORG_IMPORT_ITEMS_DEFAULT_VALUE,
// );
