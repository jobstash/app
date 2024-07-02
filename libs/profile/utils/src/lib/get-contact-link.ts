import { PreferredContact } from '@jobstash/profile/core';

export const getContactLink = (
  preferred: PreferredContact,
  handle: string | null,
) => {
  if (!handle) return null;

  switch (preferred) {
    case 'email': {
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

    case 'lens': {
      return getContactLinkUrl('lenster.xyz', handle);
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
