import { atom } from 'jotai';

import { UserSkill } from '@jobstash/shared/core';

export const userSkillsAtom = atom<UserSkill[]>([]);
