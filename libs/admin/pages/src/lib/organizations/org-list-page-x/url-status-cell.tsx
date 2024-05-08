/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from 'react';

import { CustomCellRendererProps } from 'ag-grid-react';

import { OrgRowItem, URL_DOMAINS, UrlStatus } from '@jobstash/admin/core';

import { useUrlStatus } from './use-url-status';

interface Props extends CustomCellRendererProps<OrgRowItem> {
  newItemKey:
    | 'websiteStatus'
    | 'rawWebsiteStatus'
    | 'telegramStatus'
    | 'githubStatus'
    | 'discordStatus'
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
    node,
  }: Props) => {
    const [initialized, setInitialized] = useState(false);
    const { data } = useUrlStatus(value, domainPrefix);

    useEffect(() => {
      if (data && !initialized) {
        setInitialized(true);
        // Note: copy from node.data not gridData
        // gridData only contains update from most recent cell, the rest are initial values
        const newItem = copyObject(node.data) as OrgRowItem;
        newItem[newItemKey] = data;
        api.applyTransaction({
          update: [newItem],
        });
      }
    }, [api, data, gridData, initialized, newItemKey, node.data]);

    return (
      <div className="text-sm">
        {(initialized && data ? data : (value as UrlStatus[])).map(
          ({ url, status, statusCode }, i) => (
            <div key={`${url}${i}`} className="flex gap-2">
              <span>
                {status === 'pending' ? '⏳' : status === 'alive' ? '✅' : '❌'}
              </span>
              {/* <pre>{JSON.stringify({ value, data }, undefined, '\t')}</pre> */}
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
