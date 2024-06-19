import { useState } from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Button, Chip, Select, SelectItem } from '@nextui-org/react';

import { ATSTrackedNFTItem } from '@jobstash/profile/core';

import { Heading } from '@jobstash/shared/ui';

const NFT_NETWORKS = [
  { label: 'Arbitrum', value: 'arbitrum' },
  { label: 'Avalanche', value: 'avalanche' },
  { label: 'Base', value: 'base' },
  { label: 'Blast', value: 'blast' },
  { label: 'Celo', value: 'celo' },
  { label: 'Ethereum', value: 'ethereum' },
  { label: 'Linea', value: 'linea' },
  { label: 'Optimism', value: 'optimism' },
  { label: 'Palm', value: 'palm' },
  { label: 'Polygon', value: 'polygon' },
];

interface Props {
  isPending: boolean;
  nft: ATSTrackedNFTItem;
  save: (_: ATSTrackedNFTItem) => void;
  remove: (_: ATSTrackedNFTItem) => void;
}

export const NFTForm = ({ isPending, nft, save, remove }: Props) => {
  const [formState, setFormState] = useState<ATSTrackedNFTItem>(nft);

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

  const isUpdated = JSON.stringify(nft) !== JSON.stringify(formState);
  const isDisabledSave =
    !isUpdated ||
    (!formState.name && !formState.contractAddress && !formState.network);

  return (
    <Card className="max-w-sm p-4">
      <CardHeader className="flex items-center gap-4 h-10">
        <Heading size="xs">Tracked NFT</Heading>
        {!isDisabledSave && (
          <Chip size="sm" radius="sm" color="warning" variant="dot">
            Unsaved
          </Chip>
        )}
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Select
          isRequired
          isDisabled={isPending}
          label="Network"
          selectedKeys={[formState.network]}
          name="network"
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              network: e.target.value as ATSTrackedNFTItem['network'],
            }))
          }
        >
          {NFT_NETWORKS.map((network) => (
            <SelectItem key={network.value} value={network.value}>
              {network.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          isDisabled={isPending}
          label="Name"
          value={formState.name}
          name="name"
          onChange={handleChange}
        />
        <Input
          isDisabled={isPending}
          label="Contract Address"
          value={formState.contractAddress}
          name="contractAddress"
          onChange={handleChange}
        />
      </CardBody>
      <CardFooter className="flex gap-4">
        <Button
          isDisabled={isDisabledSave || isPending || !formState.network}
          onClick={onClickSave}
        >
          Save
        </Button>
        <Button isDisabled={isPending} onClick={onClickRemove}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};
