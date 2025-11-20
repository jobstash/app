import React, { memo } from 'react';

import { Button, Text } from '@jobstash/shared/ui';

const getUrlParts = (url: string) => {
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(fullUrl);
    const domain = urlObj.hostname.replace('www.', '');
    const pathAndQuery = urlObj.pathname + urlObj.search + urlObj.hash;
    return { domain, path: pathAndQuery === '/' ? '' : pathAndQuery };
  } catch {
    const parts = url.split('/');
    return {
      domain: parts[0],
      path: parts.slice(1).join('/') ? '/' + parts.slice(1).join('/') : '',
    };
  }
};

interface DonateDataItemProps {
  title: string;
  link: string;
  date: string;
}

const DonateDataItem: React.FC<DonateDataItemProps> = ({
  title,
  link,
  date,
}) => {
  const urlParts = getUrlParts(link);

  const handleClick = () => {
    const fullUrl = link.startsWith('http') ? link : `https://${link}`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="[&>div]:!p-0 [&>div]:!m-0 [&>div]:!w-full">
      <Button
        isFullWidth
        variant="transparent"
        className="group relative !rounded-lg !p-0 !m-0 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-[1.005] focus:outline-none overflow-hidden !justify-start"
        aria-label={`View ${title} - Opens in new tab`}
        onClick={handleClick}
      >
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[minmax(200px,1.2fr)_minmax(250px,2fr)_100px] items-center gap-4 px-4 py-3 w-full">
          <div className="text-left min-w-0">
            <span title={title}>
              <Text size="md" fw="medium" className="block truncate text-left">
                {title}
              </Text>
            </span>
          </div>

          <div className="text-left min-w-0 hidden md:block px-2">
            <span className="truncate block text-md" title={link}>
              <span className="text-white">{urlParts.domain}</span>
              {urlParts.path && (
                <span className="text-white/60">{urlParts.path}</span>
              )}
            </span>
          </div>

          <Text size="md" color="dimmed">
            {date}
          </Text>
        </div>

        <div className="absolute inset-y-0 left-0 w-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left z-10" />
      </Button>
    </div>
  );
};

export default memo(DonateDataItem);
