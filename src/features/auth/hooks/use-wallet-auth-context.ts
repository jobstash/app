import { useContext } from 'react';

import { WalletAuthContext } from '../contexts/wallet-auth-context';

export const useWalletAuthContext = () => useContext(WalletAuthContext);
