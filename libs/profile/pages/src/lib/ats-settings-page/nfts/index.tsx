import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/button';

import {
  ATSClient,
  ATSTrackedNFT,
  DEFAULT_ATS_PREFERENCE,
} from '@jobstash/profile/core';

import { useUpdateATSPreference } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

import { NFTForm } from './nft-form';

interface Props {
  atsClient: ATSClient;
}

export const Nfts = ({ atsClient }: Props) => {
  const [nfts, setNfts] = useState<ATSTrackedNFT[]>([
    { id: genId(), name: '', contractAddress: '', network: '' },
  ]);

  // Update nfts from atsClient.preferences
  useEffect(() => {
    if (atsClient.preferences && atsClient.preferences.trackedNfts.length > 0) {
      setNfts(atsClient.preferences.trackedNfts);
    }
  }, [atsClient.preferences]);

  const appendNftForm = () => {
    setNfts((prev) => [
      ...prev,
      { id: genId(), name: '', contractAddress: '', network: '' },
    ]);
  };

  const { mutate, isPending } = useUpdateATSPreference();

  const updatePreferences = (trackedNfts: ATSTrackedNFT[]) => {
    if (atsClient.id && atsClient.name) {
      mutate({
        clientId: atsClient.id,
        preferences: {
          ...DEFAULT_ATS_PREFERENCE,
          ...atsClient.preferences,
          trackedNfts,
        },
      });
    }
  };

  const save = (nft: ATSTrackedNFT) => {
    const ids = nfts.flatMap((nft) => nft.id);
    const index = ids.indexOf(nft.id);

    const newNfts =
      index === -1
        ? [...nfts, nft]
        : nfts.map((item, i) => (i === index ? nft : item));

    setNfts(newNfts);
    updatePreferences(newNfts);
  };

  const remove = (nft: ATSTrackedNFT) => {
    setNfts((prev) => prev.filter((n) => n.id !== nft.id));
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <Heading size="sm">Add Ecosytstem Activation NFTs:</Heading>
      {nfts.length > 0 && (
        <div className="grid grid-cols-2 gap-y-16">
          {nfts.map((nft) => (
            <NFTForm key={nft.id} nft={nft} save={save} remove={remove} />
          ))}
        </div>
      )}
      <Button className="w-40" size="lg" onClick={appendNftForm}>
        Add NFT
      </Button>
    </div>
  );
};

const genId = (): string => Math.random().toString(36).slice(2, 8);
