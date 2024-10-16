import { useEffect, useRef, useState } from 'react';

import { ManagedOrg } from '../core/schemas';

import { useManagedOrg } from './use-managed-org';

const DEFAULT_FORM_STATE: ManagedOrg = {
  orgId: '',
  name: null,
  logoUrl: null,
  description: null,
  summary: null,
  headcountEstimate: null,
  location: null,
  altName: null,
  aliases: [],
  website: [],
  rawWebsite: [],
  discord: [],
  telegram: [],
  github: [],
  docs: [],
  twitter: [],
  grants: [],
  communities: [],
  jobsites: [],
  detectedJobsites: [],
};

export const useOrgDetailsForm = (orgId: string) => {
  const { data } = useManagedOrg(orgId);

  const [formState, setFormState] = useState<ManagedOrg>(DEFAULT_FORM_STATE);

  const initRef = useRef(false);

  useEffect(() => {
    if (data && !initRef.current) {
      initRef.current = true;
      setFormState({ ...DEFAULT_FORM_STATE, ...data });
    }
  }, [data]);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  return null;
};
