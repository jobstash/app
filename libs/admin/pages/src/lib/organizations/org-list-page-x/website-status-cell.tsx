/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import { CustomCellRendererProps } from 'ag-grid-react';

import { OrgRowItem, OrgWebsiteStatusItem } from '@jobstash/admin/core';

import { useWebsiteStatus } from './use-website-status';

export const WebsiteStatusCell = (props: CustomCellRendererProps) => {
  const { api, value, data: gridData } = props;

  const { data } = useWebsiteStatus(value);

  useEffect(() => {
    if (data) {
      const newItem = copyObject(gridData) as OrgRowItem;
      newItem.websiteStatus = data;
      api.applyTransactionAsync({
        update: [newItem],
      });
    }
  }, [api, data, gridData]);

  return (
    <div className="text-sm">
      {(value as OrgWebsiteStatusItem[]).map(
        ({ website, status, statusCode }) => (
          <div key={website} className="flex gap-2">
            <span>
              {status === 'pending' ? '⏳' : status === 'alive' ? '✅' : '❌'}
            </span>
            <span>{`${website}${statusCode ? ` [${statusCode}]` : ''}`}</span>
          </div>
        ),
      )}
    </div>
  );
};

const copyObject = (object: any) => {
  const newObject: any = {};
  for (const key of Object.keys(object)) {
    newObject[key] = object[key];
  }

  return newObject;
};
