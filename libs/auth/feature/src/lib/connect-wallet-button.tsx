import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import toast, { type ToastOptions } from 'react-hot-toast';

import { generateAvatarURL } from '@cfx-kit/wallet-avatar';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSignMessage,
} from 'wagmi';

import { sentryMessage } from '@jobstash/shared/utils';

import {
  useSiweLogout,
  useSiweMessage,
  useSiweNonce,
  useSiweSession,
  useSiweVerify,
} from '@jobstash/auth/state';
import { useIsMounted } from '@jobstash/shared/state';

import { Bartab } from '@jobstash/shared/ui';

const toastOptions: ToastOptions = { id: 'metamask' };

const ConnectWalletButton = () => {
  const isMounted = useIsMounted();

  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ chainId: 1, name: ensName });
  const avatarUrl = generateAvatarURL(address ?? '');
  const { disconnect } = useDisconnect();

  const { siweNonceData } = useSiweNonce();
  const { siweSessionData } = useSiweSession();
  const { siweMessageData } = useSiweMessage({ nonce: siweNonceData, address });
  const { signMessageAsync } = useSignMessage();
  const { siweVerify } = useSiweVerify();
  const { siweLogout } = useSiweLogout();
  const signIn = useCallback(async () => {
    let signature: string | null = null;

    if (siweMessageData) {
      try {
        signature = await signMessageAsync({ message: siweMessageData });
      } catch {
        toast('Cancelled Ethereum Sign-In', toastOptions);
      }
    }

    if (signature && siweMessageData) {
      siweVerify({ message: siweMessageData, signature });
    }
  }, [signMessageAsync, siweMessageData, siweVerify]);

  const logout = useCallback(() => {
    siweLogout();
    disconnect();
  }, [disconnect, siweLogout]);

  const isSignedIn = Boolean(siweSessionData?.address);

  const { connect, connectors } = useConnect({
    onSuccess() {
      toast.success('MetaMask wallet is now connected', toastOptions);
      setTimeout(() => {
        if (!siweSessionData?.address) {
          toast.success('Please Sign-In with Ethereum', {
            duration: 4000,
            ...toastOptions,
          });
        }
      }, 2000);
    },
    onError(error) {
      const cancelLogin = error.message.includes('User rejected the request');
      const lockedMetaMask = error.message.includes(
        'Already processing eth_requestAccounts',
      );
      const noMetaMaskExtension = error.message.includes('Connector not found');

      const shouldReport =
        !cancelLogin && !lockedMetaMask && !noMetaMaskExtension;

      if (cancelLogin) {
        toast('MetaMask login cancelled', toastOptions);
      }

      if (lockedMetaMask) {
        toast.error('Please login using MetaMask extension', toastOptions);
      }

      if (noMetaMaskExtension) {
        toast.error('MetaMask extension is not installed', toastOptions);
      }

      if (shouldReport) {
        sentryMessage('ConnectWallet useConnect', error.message, 'error');
      }
    },
  });

  const metaMaskConnector = connectors[0];

  const [showLogoutText, setShowLogoutText] = useState(false);

  const onHover = useCallback(() => {
    if (siweSessionData?.address && isConnected) {
      setShowLogoutText(true);
    }
  }, [isConnected, siweSessionData?.address]);

  const onHoverExit = useCallback(() => {
    setShowLogoutText(false);
  }, []);

  const onClick = useCallback(
    () =>
      isConnected
        ? isSignedIn
          ? logout()
          : signIn()
        : connect({ connector: metaMaskConnector }),
    [connect, isConnected, isSignedIn, logout, metaMaskConnector, signIn],
  );

  if (!isMounted) {
    return (
      <Bartab variant="wallet" isActive={false}>
        Connect Wallet
      </Bartab>
    );
  }

  return (
    <div onMouseEnter={onHover} onMouseLeave={onHoverExit}>
      <Bartab
        isActive={false}
        variant="wallet"
        left={
          isConnected && isSignedIn ? (
            <div className="p-1">
              <div
                style={{
                  borderRadius: 9999,
                  overflow: 'hidden',
                  width: 24,
                  height: 24,
                  lineHeight: 0,
                  border: '1px solid transparent',
                  outline: '#029902 solid 0.5px',
                  marginRight: -5,
                }}
              >
                <Image
                  src={ensAvatar ?? avatarUrl}
                  alt="ENS Avatar"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          ) : null
        }
        onClick={onClick}
      >
        {showLogoutText
          ? 'Disconnect Wallet'
          : isConnected
          ? siweSessionData?.address
            ? `${siweSessionData.address.slice(
                0,
                6,
              )}...${siweSessionData.address.slice(-4)}`
            : 'Sign-In with Ethereum'
          : 'Connect Wallet'}
      </Bartab>
    </div>
  );
};

export default memo(ConnectWalletButton);
