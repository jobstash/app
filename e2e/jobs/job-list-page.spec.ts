import { expect, Page, test } from '@playwright/test';

import { A11Y } from '~/shared/core/constants';

import { JOB_TEST_IDS } from '~/jobs/core/constants';

import { assertNavActive, openMobileNavFromDetails } from '../shared/helpers';

import { navigateBackToJobListPage, navigateToJobListPage } from './helpers';

const CARD_NUM = 5;
const cardNths = Array.from({ length: CARD_NUM }).map((_, i) => i);

const navigateToJobDetails = async (page: Page, n: number) => {
  const card = page.getByTestId(JOB_TEST_IDS.JOB_CARD).nth(n);
  const uuid = await card.getAttribute('data-uuid');
  await card.click();
  await expect(page).toHaveURL(`/jobs/${uuid}/details`);
};

const assertInitCardNotVisible = async (page: Page) => {
  const isHidden = await page.isHidden('[data-is-init="true"]');
  expect(isHidden).toBeTruthy();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/jobs');
});

test.describe('@mobile', () => {
  test('should navigate seamlessly when clicking cards', async ({ page }) => {
    await assertInitCardNotVisible(page);
    for (const n of cardNths) {
      await navigateToJobDetails(page, n);
      await navigateBackToJobListPage(page);
    }
  });

  test('should render correctly when changing cards then clicking nav', async ({
    page,
  }) => {
    await assertInitCardNotVisible(page);

    for (const n of cardNths) {
      await navigateToJobDetails(page, n);
      await openMobileNavFromDetails(page);
      await navigateToJobListPage(page);
    }
  });
});

test.describe('@tablet', () => {
  test('should navigate seamlessly when clicking cards', async ({ page }) => {
    await assertInitCardNotVisible(page);
    await assertNavActive(page, A11Y.LINK.SIDEBAR.JOBS);
    for (const n of cardNths) {
      await navigateToJobDetails(page, n);
      await assertNavActive(page, A11Y.LINK.SIDEBAR.JOBS);

      await navigateBackToJobListPage(page);
      await assertNavActive(page, A11Y.LINK.SIDEBAR.JOBS);
    }
  });
});

test.describe('@desktop', () => {
  test('should navigate seamlessly when clicking cards', async ({ page }) => {
    await assertInitCardNotVisible(page);
    await assertNavActive(page, A11Y.LINK.SIDEBAR.JOBS);
    for (const n of cardNths) {
      await navigateToJobDetails(page, n);
      await assertNavActive(page, A11Y.LINK.SIDEBAR.JOBS);
    }
  });
});

test.describe('@tablet/@desktop', () => {
  test('should render correctly when changing cards then clicking nav', async ({
    page,
  }) => {
    await assertInitCardNotVisible(page);
    await assertNavActive(page, A11Y.LINK.SIDEBAR.JOBS);

    for (const n of cardNths) {
      await navigateToJobDetails(page, n);
      await assertNavActive(page, A11Y.LINK.SIDEBAR.JOBS);

      await navigateToJobListPage(page);
      await assertNavActive(page, A11Y.LINK.SIDEBAR.JOBS);
    }
  });
});
