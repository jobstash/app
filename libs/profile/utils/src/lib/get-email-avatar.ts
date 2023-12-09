export const getEmailAvatar = (email: string | null) =>
  email
    ? `https://api.dicebear.com/7.x/identicon/png?seed=${email}&size=48`
    : '';
