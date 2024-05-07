/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  CellEditingStoppedEvent,
  GetRowIdFunc,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import {
  OrgItem,
  OrgRowItem,
  URL_DOMAINS,
  UrlStatus,
} from '@jobstash/admin/core';
import { prefixUrl } from '@jobstash/admin/utils';

import { useAllOrgs } from '@jobstash/admin/state';

import { columnDefs } from './column-defs';
import { useFakeMutation } from './use-org-mutation';

const mapUrlStatus = (urls: string[]): UrlStatus[] =>
  urls.map((url) => ({
    url,
    status: 'pending',
    statusCode: undefined,
  }));

export const useOrgListTable = () => {
  const { data, isPending } = useAllOrgs();

  const [rowData, setRowData] = useState<OrgRowItem[] | undefined>();
  useEffect(() => {
    if (data && !rowData) {
      setRowData(
        data.map(
          (d) =>
            ({
              ...d,
              websiteStatus: mapUrlStatus(d.website),
              rawWebsiteStatus: mapUrlStatus(d.rawWebsite),
              telegramStatus: mapUrlStatus(d.telegram),
              githubStatus: mapUrlStatus(d.github),
              twitterStatus: mapUrlStatus(d.twitter),
              docsStatus: mapUrlStatus(d.docs),
            } as OrgRowItem),
        ),
      );
    }
  }, [data, rowData]);

  const gridRef = useRef<AgGridReact>(null);
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const getRowId: GetRowIdFunc<OrgItem> = ({
    data: { id },
    // eslint-disable-next-line unicorn/consistent-function-scoping
  }) => id;

  const { isPending: isPendingMutation, mutate, reset } = useFakeMutation();

  const onCellEditingStopped = (e: CellEditingStoppedEvent) => {
    const {
      node: { rowIndex },
      oldValue,
      newValue,
    } = e;

    const valueChanged = JSON.stringify(oldValue) !== JSON.stringify(newValue);

    if (valueChanged && rowIndex !== null) {
      mutate(undefined, {
        onError() {
          gridRef.current!.api.undoCellEditing();

          reset();
        },
      });
    }
  };

  const [pastaString, setPastaString] = useState<string>('');
  const onSelectionChanged = useCallback(
    (e: SelectionChangedEvent<OrgRowItem>) => {
      setPastaString(
        e.api
          .getSelectedNodes()
          .map((node) => {
            const {
              id,
              orgId,
              name,
              location,
              summary,
              description,
              logoUrl,
              headcountEstimate,
              createdTimestamp,
              updatedTimestamp,
              jobCount,
              discord,
              website,
              rawWebsite,
              telegram,
              github,
              aliases,
              grant,
              twitter,
              docs,
              community,
              jobsite,
              detectedJobsite,
            } = node.data!;

            return [
              id,
              orgId,
              name,
              location,
              summary,
              description,
              logoUrl,
              headcountEstimate,
              createdTimestamp,
              updatedTimestamp,
              jobCount,
              discord,
              grant,
              aliases,
              community,
              prefixUrl(website),
              prefixUrl(rawWebsite),
              prefixUrl(telegram, URL_DOMAINS.TELEGRAM),
              prefixUrl(github, URL_DOMAINS.GITHUB),
              prefixUrl(twitter, URL_DOMAINS.TWITTER),
              prefixUrl(docs),
              JSON.stringify(jobsite),
              JSON.stringify(detectedJobsite),
            ].join('\t');
          })
          .join('\n'),
      );
    },
    [],
  );

  useEffect(() => {
    const handleCopy = () => {
      if (typeof navigator !== 'undefined' && isFocused) {
        navigator.clipboard.writeText(pastaString);
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, [isFocused, pastaString]);

  return {
    isPending,
    isPendingMutation,
    gridRef,
    rowData,
    columnDefs,
    onBlur,
    onFocus,
    getRowId,
    onCellEditingStopped,
    onSelectionChanged,
  };
};
