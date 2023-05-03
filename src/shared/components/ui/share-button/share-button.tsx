import { useRouter } from 'next/router';
import { memo, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

import { Menu } from '@mantine/core';

import Button from '../../base/button';
import { LensterIcon, LinkIcon, ShareIcon, TwitterIcon } from '../../icons';

const FRONTEND_URL = 'https://frontend.jobstash.xyz';

interface Props {
  jobTitle: string;
}

const ShareButton = ({ jobTitle }: Props) => {
  const { asPath } = useRouter();

  const shareLink = useCallback(
    (baseUrl: string) => {
      const text = `HIRING: ${jobTitle}\n\nCheck Full Details:\n${FRONTEND_URL}${asPath}\n\n@jobstash_xyz\n#TheUltimateJobAggregatorForCrypto`;

      window
        .open(`${baseUrl}?text=${encodeURIComponent(text)}`, '_blank')
        ?.focus();
    },
    [jobTitle, asPath],
  );

  const onClickTwitter = useCallback(
    () => shareLink('https://twitter.com/intent/tweet'),
    [shareLink],
  );

  const onClickLenster = useCallback(
    () => shareLink('https://lenster.xyz/'),
    [shareLink],
  );

  const onClickCopyLink = useCallback(() => {
    navigator.clipboard.writeText(`${FRONTEND_URL}${asPath}`);
    toast.success('Copied!');
  }, [asPath]);

  return (
    <Menu
      withinPortal
      shadow="md"
      position="bottom-end"
      classNames={{
        dropdown: 'bg-dark-gray',
      }}
    >
      <Menu.Target>
        <div>
          <Button isIcon size="sm" variant="translucent">
            <ShareIcon />
          </Button>
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<TwitterIcon />} onClick={onClickTwitter}>
          Twitter
        </Menu.Item>
        <Menu.Item icon={<LensterIcon />} onClick={onClickLenster}>
          Lenster
        </Menu.Item>
        <Menu.Item icon={<LinkIcon />} onClick={onClickCopyLink}>
          Copy link
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default memo(ShareButton);
