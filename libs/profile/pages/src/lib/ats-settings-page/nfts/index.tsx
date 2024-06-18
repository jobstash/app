import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/react';

import {
  ATSClient,
  ATSTrackedNFT,
  ATSTrackedNFTItem,
  UpdateATSPreferencePayload,
} from '@jobstash/profile/core';

import { useUpdateATSPreference } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

import { NFTForm } from './nft-form';

const genId = (): string => Math.random().toString(36).slice(2, 8);
const getDefaultNFT = (): ATSTrackedNFTItem => ({
  key: genId(),
  id: '',
  name: '',
  contractAddress: '',
  network: '',
});

interface Props {
  atsClient: ATSClient;
}

export const Nfts = ({ atsClient }: Props) => {
  const [nfts, setNfts] = useState<ATSTrackedNFTItem[]>([getDefaultNFT()]);

  // Update nfts from atsClient.preferences
  useEffect(() => {
    if (atsClient.preferences && atsClient.preferences.trackedNfts.length > 0) {
      setNfts(
        atsClient.preferences.trackedNfts.map((nft) => ({
          ...nft,
          key: nft.id,
        })),
      );
    }
  }, [atsClient.preferences]);

  const appendNftForm = () => {
    setNfts((prev) => [...prev, getDefaultNFT()]);
  };

  const { mutate, isPending } = useUpdateATSPreference();

  const updatePreferences = (trackedNfts: ATSTrackedNFT[]) => {
    if (atsClient.id && atsClient.name) {
      const payload: UpdateATSPreferencePayload = {
        clientId: atsClient.id,
        preferences: {
          ...(atsClient.preferences ?? { id: null, highlightOrgs: [] }),
          platformName: atsClient.name as
            | 'jobstash'
            | 'lever'
            | 'workable'
            | 'greenhouse',
          trackedNfts: trackedNfts.map(
            ({ name, contractAddress, network }) => ({
              name,
              contractAddress,
              network,
            }),
          ),
        },
      };

      mutate(payload);
    }
  };

  const save = (newNFT: ATSTrackedNFTItem) => {
    const mapped = nfts.flatMap((nft) => nft.key);
    const index = mapped.indexOf(newNFT.key);

    const newNfts =
      index === -1
        ? [...nfts, newNFT]
        : nfts.map((item, i) => (i === index ? newNFT : item));

    setNfts(newNfts);
    updatePreferences(newNfts);
  };

  const remove = (nft: ATSTrackedNFT) => {
    const newNfts = nfts.filter((n) => n.id !== nft.id);
    setNfts(newNfts);
    updatePreferences(newNfts);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Heading size="sm">Add Ecosytstem Activation NFTs:</Heading>
        {isPending && <Spinner color="white" size="sm" />}
      </div>
      {nfts.length > 0 && (
        <div className="grid grid-cols-2 gap-y-16">
          {nfts.map((nft) => (
            <NFTForm
              key={nft.id}
              isPending={isPending}
              nft={nft}
              save={save}
              remove={remove}
            />
          ))}
        </div>
      )}
      <Button className="w-40" size="lg" onClick={appendNftForm}>
        Add NFT
      </Button>
    </div>
  );
};
