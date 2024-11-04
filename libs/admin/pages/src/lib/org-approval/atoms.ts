import { atom } from 'jotai';

type OrgApprovalList = 'all' | 'pending' | 'approved' | 'rejected';

export const activeTabAtom = atom<OrgApprovalList>('all');
