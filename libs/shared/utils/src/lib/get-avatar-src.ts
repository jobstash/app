export const getAvatarSrc = (seed: string | null) =>
  seed ? `https://api.dicebear.com/7.x/identicon/png?seed=${seed}&size=48` : '';
