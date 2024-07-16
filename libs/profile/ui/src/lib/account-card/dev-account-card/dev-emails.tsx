import { getPluralText } from '@jobstash/shared/utils';

import { useDevProfileInfoContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import { EmailAccountText } from './email-account-text';

export const DevEmails = () => {
  const { profileInfoData } = useDevProfileInfoContext();

  if (!profileInfoData) return null;

  const { email: emails } = profileInfoData;
  const hasEmail = emails.length > 0;

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
            <div className="flex flex-col gap-4 pt-2">
              {emails.map(({ email }) => (
                <EmailAccountText key={email} email={email} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
