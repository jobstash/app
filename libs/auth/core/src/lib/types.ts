import { type Infer } from 'myzod';

import { checkWalletDataSchema } from './constants';

export type CheckWalletData = Infer<typeof checkWalletDataSchema>;
