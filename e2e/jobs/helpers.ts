import { expect, Page } from '@playwright/test';

import { A11Y, TEST_IDS } from '~/shared/core/constants';

import { getNavLocator } from '../shared/helpers';

export const navigateBackToJobListPage = async (page: Page) => {
  // Assert mobile/tablet devices are currently on details-page
  await expect(page).toHaveURL(/\/jobs\/[a-zA-Z0-9]{6}\/details/);

  // Click back button
  await page.getByTestId(TEST_IDS.DETAILS_BACK).click();

  // Assert currently on job-list page
  await expect(page).toHaveURL(`/jobs`);
};

export const navigateToJobListPage = async (page: Page) => {
  await getNavLocator(page, A11Y.LINK.SIDEBAR.JOBS).click();
  await expect(page).toHaveURL(`/jobs`);
};
