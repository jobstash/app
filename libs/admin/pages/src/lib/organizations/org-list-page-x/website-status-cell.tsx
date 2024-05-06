/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { CustomCellRendererProps } from 'ag-grid-react';

import { OrgRowItem, OrgWebsiteStatusItem } from '@jobstash/admin/core';

import { useWebsiteStatus } from './use-website-status';

export const WebsiteStatusCell = ({
  api,
  value,
  data: gridData,
}: CustomCellRendererProps) => {
  const [initialized, setInitialized] = useState(false);
  const { data } = useWebsiteStatus(value);

  useEffect(() => {
    if (data && !initialized) {
      setInitialized(true);
      const newItem = copyObject(gridData) as OrgRowItem;
      newItem.websiteStatus = data;
      api.applyTransactionAsync({
        update: [newItem],
      });
    }
  }, [api, data, gridData, initialized]);

  return (
    <div className="text-sm">
      {(initialized && data ? data : (value as OrgWebsiteStatusItem[])).map(
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
