import { faker } from '@faker-js/faker';

import {
  CHAIN_1INC,
  CHAIN_APESWAP,
  CHAIN_AVALANCHE_AVAX,
  CHAIN_BITCOIN,
  CHAIN_CARDANO_ADA,
  CHAIN_COINBASE,
  CHAIN_CRONOS,
  CHAIN_DOGECOIN,
  CHAIN_ETHEREUM_ETH,
  CHAIN_FANTOM,
  CHAIN_GLOW,
  CHAIN_HUOBI,
  CHAIN_LITECOIN_LTC,
  CHAIN_MAGIC_EDEN,
  CHAIN_METAMASK,
  CHAIN_OPENSEA,
  CHAIN_PANCAKE_SWAP_CAKE,
  CHAIN_PHANTOM,
  CHAIN_RIPPLE_XRP,
  CHAIN_SHIBA,
  CHAIN_SOLANA,
  CHAIN_SOLANART,
  CHAIN_TEMPLE,
  CHAIN_TETHER,
  CHAIN_TRON,
  CHAIN_UNISWAP_UNI,
  CHAIN_USD_COIN_USDC,
  CHAIN_WALLETCONNECT,
  CHAIN_YEARN,
} from '~/core/constants';
import type { Chain } from '~/core/interfaces';

/**
 * List of chains to choose from.
 * * Note: These chains are placeholders! They are NOT FINAL.
 * *			 These are just mainly used to map the svgs in public dir.
 * *       Ideally, backend should provide the link for uploaded images.
 * */
const poolChains = [
  CHAIN_1INC,
  CHAIN_APESWAP,
  CHAIN_AVALANCHE_AVAX,
  CHAIN_BITCOIN,
  CHAIN_CARDANO_ADA,
  CHAIN_COINBASE,
  CHAIN_CRONOS,
  CHAIN_DOGECOIN,
  CHAIN_ETHEREUM_ETH,
  CHAIN_FANTOM,
  CHAIN_GLOW,
  CHAIN_HUOBI,
  CHAIN_LITECOIN_LTC,
  CHAIN_MAGIC_EDEN,
  CHAIN_METAMASK,
  CHAIN_OPENSEA,
  CHAIN_PANCAKE_SWAP_CAKE,
  CHAIN_PHANTOM,
  CHAIN_RIPPLE_XRP,
  CHAIN_SHIBA,
  CHAIN_SOLANA,
  CHAIN_SOLANART,
  CHAIN_TEMPLE,
  CHAIN_TETHER,
  CHAIN_TRON,
  CHAIN_UNISWAP_UNI,
  CHAIN_USD_COIN_USDC,
  CHAIN_WALLETCONNECT,
  CHAIN_YEARN,
];

export const fakeChains = (): Chain[] =>
  faker.helpers.arrayElements(
    poolChains.map((filename) => ({
      name: filename,
      avatar: `/chains/${filename}.svg`,
    })),
  );
