import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';

import { Heading } from '@jobstash/shared/ui';

interface TrackedNFT {
  id: string;
  name: string;
  contract: string;
  network: string;
}

interface NFTFormProps {
  nft: TrackedNFT;
  save: (_: TrackedNFT) => void;
  remove: (_: TrackedNFT) => void;
}

const NFTForm = ({ nft, save, remove }: NFTFormProps) => {
  const [formState, setFormState] = useState<TrackedNFT>(nft);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickSave = () => {
    save(formState);
  };

  const onClickRemove = () => {
    remove(formState);
  };

  return (
    <Card className="max-w-sm p-4">
      <CardHeader>
        <Heading size="xs">Tracked NFT</Heading>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Name"
          value={formState.name}
          name="name"
          onChange={handleChange}
        />
        <Input
          label="Contract"
          value={formState.contract}
          name="contract"
          onChange={handleChange}
        />
        <Input
          label="Network"
          value={formState.network}
          name="network"
          onChange={handleChange}
        />
      </CardBody>
      <CardFooter className="flex gap-4">
        <Button onClick={onClickSave}>Save</Button>
        <Button onClick={onClickRemove}>Remove</Button>
      </CardFooter>
    </Card>
  );
};

export const Nfts = () => {
  const [nfts, setNfts] = useState<TrackedNFT[]>([
    { id: genId(), name: '', contract: '', network: '' },
  ]);

  const save = (nft: TrackedNFT) => {
    const ids = nfts.flatMap((nft) => nft.id);
    const index = ids.indexOf(nft.id);

    if (index === -1) {
      setNfts((prev) => [...prev, nft]);
      return;
    }

    setNfts((prev) => {
      const updated = [...prev];
      updated[index] = nft;
      return updated;
    });
  };

  const add = () => {
    setNfts((prev) => [
      ...prev,
      { id: genId(), name: '', contract: '', network: '' },
    ]);
  };

  const remove = (nft: TrackedNFT) => {
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
      <Button className="w-40" size="lg" onClick={add}>
        Add NFT
      </Button>
    </div>
  );
};

const genId = (): string => Math.random().toString(36).slice(2, 8);
