export const getContactLink = (preferred: string, handle: string | null) => {
  if (!handle) return null;

  switch (preferred) {
    case 'github': {
      return getContactLinkUrl('github.com', handle);
    }

    case 'email': {
      return `mailto:${handle}`;
    }

    case 'google': {
      return `mailto:${handle}`;
    }

    case 'telegram': {
      return getContactLinkUrl('telegram.me', handle);
    }

    case 'twitter': {
      return getContactLinkUrl('twitter.com', handle);
    }

    case 'discord': {
      return getContactLinkUrl('discord.gg', handle);
    }

    case 'farcaster': {
      return getContactLinkUrl('warpcast.com', handle);
    }

    case 'wallet': {
      return `https://etherscan.io/address/${handle}`;
    }

    default: {
      return null;
    }
  }
};

const getContactLinkUrl = (domain: string, handle: string) => {
  if (
    handle.toLowerCase().includes('https://') ||
    handle.toLowerCase().includes('http://')
  )
    return handle;
  return `https://${domain}/${handle}`;
};
