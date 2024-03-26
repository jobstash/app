import { sentryMessage } from '@jobstash/shared/utils';

import { getMwVersion } from './get-mw-version';

export const getSSRMwVersion = async (label: string) => {
  let mwVersion = '';
  try {
    mwVersion = await getMwVersion();
  } catch {
    sentryMessage(
      label,
      `Failed mw version fetch: ${JSON.stringify({ res: mwVersion })}`,
    );
  }

  return mwVersion;
};
