import { useRouter } from 'next/router';
import { useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import { SiweMessage } from 'siwe';

import { CHECK_WALLET_ROUTE, redirectFlowsSet } from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { getCheckWallet } from '@jobstash/auth/data';

interface Props {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: Props) => {
  const { push, asPath } = useRouter();
  const queryClient = useQueryClient();

  const signOutRef = useRef(false);

  return (
    <SIWEProvider
      // {...siweConfig}
      getNonce={async () => {
        const res = await fetch(`${MW_URL}/siwe/nonce`, {
          cache: 'no-store',
          credentials: 'include',
          mode: 'cors',
        });

        const { data } = await res.json();
        return data;
      }}
      getSession={async () => {
        const res = await fetch(`${MW_URL}/siwe/session`, {
          cache: 'no-store',
          mode: 'cors',
          credentials: 'include',
        });

        if (!res.ok) return null;

        const { data } = await res.json();

        return data;
      }}
      createMessage={({ nonce, address, chainId }) =>
        new SiweMessage({
          version: '1',
          domain: window.location.host,
          uri: window.location.origin,
          address,
          chainId,
          nonce,
          statement: `I am ${
            address.slice(0, 4) + '...' + address.slice(-4)
          } and I want to sign in to ${window.location.host}

I hereby accept the terms of service and the privacy terms laid out below:
\n
Privacy and GDPR Compliance Statement
\n
1. Data Collection and Use
\n
We collect a minimal set of information as provided by the user, such as GitHub information, CV links, skills, and email addresses solely for the purpose of enhancing our services and connecting talent with opportunities. Data is processed on the basis of consent and to fulfill our contractual obligations.
\n
2. Data Sharing and Transfer
\n
We do not share personal data with third parties except as required by law or to provide the requested services. Data may be stored on servers located within the EU or in countries ensuring adequate data protection standards.
\n
3. Data Retention
\n
Personal data is retained only as long as necessary for the purposes it was collected for or as required by law.
\n
4. Your Rights
\n
You have the right to access, correct, delete, or restrict processing of your data. You can withdraw consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal.
\n
5. Data Security
\n
We implement appropriate technical and organizational measures to protect personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
\n
6. Contact Information
\n
For any inquiries regarding your data or to exercise your rights, please contact our Data Protection Officer at privacy@jobstash.xyz.
\n
7. Changes to This Statement
\n
We reserve the right to update our Privacy and GDPR Compliance Statement as necessary to reflect any changes in our practices or legal requirements. Changes will be posted on our website.`,
        }).prepareMessage()
      }
      verifyMessage={({ message, signature }) =>
        fetch(`${MW_URL}/siwe/verify`, {
          cache: 'no-store',
          credentials: 'include',
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, signature }),
        }).then((res) => res.ok)
      }
      signOut={async () => {
        const res = await fetch(`${MW_URL}/siwe/logout`, {
          cache: 'no-store',
          credentials: 'include',
          mode: 'cors',
        });

        return res.ok;
      }}
      onSignIn={async () => {
        const checkWalletResponse = await getCheckWallet();
        queryClient.setQueryData(['check-wallet'], checkWalletResponse);

        const {
          data: { flow },
        } = checkWalletResponse;
        const flowRoute = CHECK_WALLET_ROUTE[flow];
        if (redirectFlowsSet.has(flow) && asPath !== flowRoute) {
          push(flowRoute);
        }
      }}
      onSignOut={() => {
        if (!signOutRef.current) {
          signOutRef.current = true;
          window.location.href = '/jobs';
        }
      }}
    >
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </SIWEProvider>
  );
};
