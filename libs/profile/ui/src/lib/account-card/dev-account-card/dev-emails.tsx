import { useAutoAnimate } from '@formkit/auto-animate/react';

import { getPluralText } from '@jobstash/shared/utils';

import { useProfileInfoContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import { EmailAccountText } from './email-account-text';

export const DevEmails = () => {
  const { profileInfoData } = useProfileInfoContext();
  const [listRef] = useAutoAnimate();

  if (!profileInfoData) return null;

  const { email: emails, username } = profileInfoData;
  const hasEmail = emails.length > 0;
  const hasGithub = Boolean(username);

  if (!hasEmail) return null;

  return (
    <>
      <hr className="border-t border-white/10" />
      <div className="flex flex-col gap-4">
        {hasEmail && (
          <>
            <Text size="lg" fw="bold">
              Connected Email {getPluralText('Account', emails.length)}:
            </Text>
            <div ref={listRef} className="flex flex-col gap-4 pt-2">
              {emails.map(({ email, main }) => (
                <EmailAccountText
                  key={email}
                  email={email}
                  isMain={main}
                  hasGithub={hasGithub}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
