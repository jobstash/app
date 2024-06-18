import { useState } from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/react';

import { ATSTrackedNFT } from '@jobstash/profile/core';

import { Heading } from '@jobstash/shared/ui';

interface Props {
  nft: ATSTrackedNFT;
  save: (_: ATSTrackedNFT) => void;
  remove: (_: ATSTrackedNFT) => void;
}

export const NFTForm = ({ nft, save, remove }: Props) => {
  const [formState, setFormState] = useState<ATSTrackedNFT>(nft);

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

  const isDisabledSave =
    !formState.name && !formState.contractAddress && !formState.network;

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
          label="Contract Address"
          value={formState.contractAddress}
          name="contractAddress"
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
        <Button isDisabled={isDisabledSave} onClick={onClickSave}>
          Save
        </Button>
        <Button onClick={onClickRemove}>Remove</Button>
      </CardFooter>
    </Card>
  );
};
