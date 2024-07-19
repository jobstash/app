/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useMemo, useState } from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Button, Chip, Select, SelectItem, Spinner } from '@nextui-org/react';
import { isAddress } from 'viem';

import { ATSTrackedNFTItem } from '@jobstash/profile/core';

import { useDebouncedValue } from '@jobstash/shared/state';

import { Heading } from '@jobstash/shared/ui';

import { useIsValidNft } from './use-is-valid-nft';

const INVALID_NFT_ERROR = 'NFT does not exist on the chosen network';
const NFT_NETWORKS = [
  { label: 'Arbitrum', value: 'arbitrum', chainId: 42_161 },
  { label: 'Avalanche', value: 'avalanche', chainId: 43_114 },
  { label: 'Base', value: 'base', chainId: 8453 },
  { label: 'Blast', value: 'blast', chainId: 238 },
  { label: 'Celo', value: 'celo', chainId: 42_220 },
  { label: 'Ethereum', value: 'ethereum', chainId: 1 },
  { label: 'Linea', value: 'linea', chainId: 59_144 },
  { label: 'Optimism', value: 'optimism', chainId: 10 },
  { label: 'Palm', value: 'palm', chainId: 11_297_108_109 },
  { label: 'Polygon', value: 'polygon', chainId: 137 },
];

interface Props {
  isPending: boolean;
  nft: ATSTrackedNFTItem;
  save: (_: ATSTrackedNFTItem) => void;
  remove: (_: ATSTrackedNFTItem) => void;
}

export const NFTForm = ({ isPending, nft, save, remove }: Props) => {
  const [formState, setFormState] = useState<ATSTrackedNFTItem>(nft);
  const [chainId, setChainId] = useState<number | null>(
    NFT_NETWORKS.find((n) => n.value === nft.network)?.chainId ?? null,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeNetwork = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const network = e.target.value as ATSTrackedNFTItem['network'];
    const chainId = NFT_NETWORKS.find((n) => n.value === network)?.chainId;
    if (chainId) {
      setChainId(chainId);
      setFormState((prev) => ({
        ...prev,
        network,
      }));
    }
  };

  const onClickSave = () => {
    save(formState);
  };

  const onClickRemove = () => {
    remove(formState);
  };

  const debouncedAddress = useDebouncedValue(formState.contractAddress, 1000);
  const isValidAddress = useMemo(() => {
    console.log(debouncedAddress);
    return isAddress(debouncedAddress);
  }, [debouncedAddress]);

  const isUpdated = JSON.stringify(nft) !== JSON.stringify(formState);
  const isDisabledSave = [
    !isUpdated,
    !isValidAddress,
    !formState.name,
    !formState.contractAddress,
    !formState.network,
  ].includes(true);

  // Add hook to check for valid nft
  const { isLoading: isLoadingNftValidation, isValid: isValidNft } =
    useIsValidNft({
      address: debouncedAddress as `0x${string}`,
      chainId: chainId!,
      enabled: Boolean(chainId),
    });

  const isPendingForm = isPending || isLoadingNftValidation;

  return (
    <Card className="max-w-sm p-4">
      <CardHeader className="flex items-center gap-4 h-10">
        <Heading size="xs">Tracked NFT</Heading>
        {!isDisabledSave && !isPendingForm && (
          <Chip size="sm" radius="sm" color="warning" variant="dot">
            Unsaved
          </Chip>
        )}
        {isPendingForm && <Spinner size="sm" color="white" />}
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Select
          isRequired
          isDisabled={isPendingForm}
          label="Network"
          selectedKeys={formState.network ? [formState.network] : []}
          name="network"
          onChange={onChangeNetwork}
        >
          {NFT_NETWORKS.map((network) => (
            <SelectItem key={network.value} value={network.value}>
              {network.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          isRequired
          isDisabled={isPendingForm}
          label="Name"
          value={formState.name}
          name="name"
          onChange={handleChange}
        />
        <Input
          isRequired
          isDisabled={isPendingForm}
          label="Contract Address"
          value={formState.contractAddress}
          name="contractAddress"
          isInvalid={
            (!isValidAddress || !isValidNft) &&
            !isPendingForm &&
            Boolean(formState.contractAddress)
          }
          errorMessage={
            isPendingForm || !formState.contractAddress
              ? undefined
              : isValidNft
              ? isValidAddress
                ? undefined
                : 'Invalid address'
              : INVALID_NFT_ERROR
          }
          onChange={handleChange}
        />
      </CardBody>
      <CardFooter className="flex gap-4">
        <Button
          isDisabled={
            isDisabledSave || isPendingForm || !formState.network || !isValidNft
          }
          onClick={onClickSave}
        >
          Save
        </Button>
        <Button isDisabled={isPendingForm} onClick={onClickRemove}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};
