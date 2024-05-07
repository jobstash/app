/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from 'react';

import { CustomCellRendererProps } from 'ag-grid-react';

import { OrgRowItem, URL_DOMAINS, UrlStatus } from '@jobstash/admin/core';

import { useWebsiteStatus } from './use-website-status';

interface Props extends CustomCellRendererProps<OrgRowItem> {
  newItemKey:
    | 'websiteStatus'
    | 'telegramStatus'
    | 'githubStatus'
    | 'twitterStatus'
    | 'docsStatus';
  domainPrefix?: typeof URL_DOMAINS[keyof typeof URL_DOMAINS];
}

export const UrlStatusCell = memo(
  ({
    api,
    value,
    data: gridData,
    newItemKey = 'websiteStatus',
    domainPrefix,
  }: Props) => {
    const [initialized, setInitialized] = useState(false);
    const { data } = useWebsiteStatus(value, domainPrefix);

    useEffect(() => {
      if (data && !initialized) {
        setInitialized(true);
        const newItem = copyObject(gridData) as OrgRowItem;
        newItem[newItemKey] = data;
        api.applyTransactionAsync({
          update: [newItem],
        });
      }
    }, [api, data, gridData, initialized, newItemKey]);

    return (
      <div className="text-sm">
        {(initialized && data ? data : (value as UrlStatus[])).map(
          ({ url, status, statusCode }) => (
            <div key={url} className="flex gap-2">
              <span>
                {status === 'pending' ? '⏳' : status === 'alive' ? '✅' : '❌'}
              </span>
              <span>{`${url}${statusCode ? ` [${statusCode}]` : ''}`}</span>
            </div>
          ),
        )}
      </div>
    );
  },
);

UrlStatusCell.displayName = 'UrlStatusCell';

const copyObject = (object: any) => {
  const newObject: any = {};
  for (const key of Object.keys(object)) {
    newObject[key] = object[key];
  }

  return newObject;
};
