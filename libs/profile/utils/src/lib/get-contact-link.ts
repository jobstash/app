import { CONTACT_DEFAULT_OPTIONS } from '@jobstash/profile/core';

export type PreferredContact = typeof CONTACT_DEFAULT_OPTIONS[number];

export const getContactLink = (
  preferred: PreferredContact,
  handle: string | null,
) => {
  if (!handle) return null;

  switch (preferred) {
    case 'Email': {
      return `mailto:${handle}`;
    }

    case 'Telegram': {
      return getContactLinkUrl('telegram.me', handle);
    }

    case 'Twitter': {
      return getContactLinkUrl('twitter.com', handle);
    }

    case 'Discord': {
      return getContactLinkUrl('discord.gg', handle);
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
