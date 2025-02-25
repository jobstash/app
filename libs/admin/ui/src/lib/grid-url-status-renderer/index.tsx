import { Link } from "@heroui/link";
import { CustomCellRendererProps } from 'ag-grid-react';

import { URL_DOMAINS } from '@jobstash/admin/core';
import { prefixUrl } from '@jobstash/admin/utils';

import { useUrlStatus } from './use-url-status';

interface Props<T> extends CustomCellRendererProps<T, string> {
  domainPrefix?: typeof URL_DOMAINS[keyof typeof URL_DOMAINS];
}

export const GridUrlStatusRenderer = <T,>(props: Props<T>) => {
  const { domainPrefix, value } = props;

  const { data } = useUrlStatus(value ?? '', domainPrefix);

  if (!value) return null;

  const statuses =
    data ??
    value
      .split(',')
      .map((v) => ({ url: v, status: 'pending', statusCode: undefined }));

  return (
    (<div className="text-sm">
      {statuses.map(({ url, status, statusCode }, i) => (
        // eslint-disable-next-line react/no-array-index-key
        (<div key={`${url}${i}`} className="flex gap-2">
          <span>
            {status === 'pending' ? '⏳' : status === 'alive' ? '✅' : '❌'}
          </span>
          <Link
            href={prefixUrl(url, domainPrefix)}
            size="sm"
            underline="hover"
            className="text-white/80 text-base"
            target="_blank"
            rel="noopener noreferrer"
          >{`${url}${statusCode ? ` [${statusCode}]` : ''}`}</Link>
        </div>)
      ))}
    </div>)
  );
};
