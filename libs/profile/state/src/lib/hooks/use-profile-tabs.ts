import { useState } from 'react';

import { ProfileTabOptions } from '@jobstash/profile/core';

export const useProfileTabs = (tabOptions: ProfileTabOptions) => {
  const defaultTab = tabOptions[0];
  const [activeTab, setActiveTab] =
    useState<ProfileTabOptions[number]>(defaultTab);
  const tabs = tabOptions.map((text) => ({
    text,
    onClick: () => setActiveTab(text as typeof defaultTab),
  }));
  return { tabs, activeTab, setActiveTab };
};
