import { useMutation } from '@tanstack/react-query';

import { AuthorizeOrgAffiliationPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { authorizeOrgAffiliation } from '@jobstash/admin/data';

export const useAuthorizeOrgAffiliation = () =>
  useMutation({
    mutationFn: (payload: AuthorizeOrgAffiliationPayload) =>
      authorizeOrgAffiliation(payload),
    onSuccess() {
      notifSuccess({
        title: 'Success!',
        message: 'You have successfully authorized the org affiliation.',
      });
    },
    onError({ message }) {
      notifError({
        title: 'Org Affiliation Authorization Failed',
        message,
      });
    },
  });
