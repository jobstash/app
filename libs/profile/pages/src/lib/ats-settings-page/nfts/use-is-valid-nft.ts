import { Abi } from 'viem';
import { useReadContract } from 'wagmi';

const ERC721_INTERFACE_ID = '0x80ac58cd';
const ERC1155_INTERFACE_ID = '0xd9b67a26';

const ABI: Abi = [
  {
    type: 'function',
    name: 'supportsInterface',
    stateMutability: 'view',
    inputs: [
      {
        type: 'bytes4',
        name: 'interfaceID',
      },
    ],
    outputs: [
      {
        type: 'bool',
      },
    ],
  },
];
const FUNCTION_NAME = 'supportsInterface';

interface Props {
  address: `0x${string}`;
  chainId: number;
  enabled: boolean;
}

export const useIsValidNft = ({ address, chainId, enabled }: Props) => {
  const { isSuccess: isSuccess721, isPending: isPending721 } = useReadContract({
    address,
    abi: ABI,
    functionName: FUNCTION_NAME,
    args: [ERC721_INTERFACE_ID],
    chainId,
    query: {
      enabled,
    },
  });

  const { isSuccess: isSuccess1155, isPending: isPending1155 } =
    useReadContract({
      address,
      abi: ABI,
      functionName: FUNCTION_NAME,
      args: [ERC1155_INTERFACE_ID],
      chainId,
      query: {
        enabled,
      },
    });

  return {
    isPending: (isPending721 || isPending1155) && Boolean(chainId),
    isValid: isSuccess721 || isSuccess1155,
  };
};
