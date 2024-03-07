import { expect, Page, test } from '@playwright/test';

import { JOB_TEST_IDS } from '~/jobs/core/constants';

import { getRandomInt, openMobileNavFromDetails } from '../shared/helpers';

import { navigateBackToJobListPage, navigateToJobListPage } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/jobs');
});

const getJobCardId = async (page: Page, n: number) => {
  const id = await page
    .getByTestId(JOB_TEST_IDS.JOB_CARD)
    .nth(n)
    .getAttribute('data-uuid');

  expect(id).not.toBeNull();

  return id as string;
};

const getFirstTwoJobIds = async (page: Page) => {
  const id1 = await getJobCardId(page, 0);
  const id2 = await getJobCardId(page, 1);
  return [id1, id2];
};

const reloadToJobDetails = (page: Page, id: string) =>
  page.goto(`/jobs/${id}/details`);

const assertInitCard = async (
  page: Page,
  expectedId: string,
): Promise<void> => {
  const initCard = page.locator('[data-is-init="true"]').first();
  await expect(initCard).toBeVisible();
  await expect(initCard).toHaveAttribute('data-uuid', expectedId);
};

const assertCardsSwapped = async (page: Page, id1: string, id2: string) => {
  const [firstId, secondId] = await getFirstTwoJobIds(page);
  expect(firstId).toBe(id2);
  expect(secondId).toBe(id1);
};

const assertListDeduped = async (
  page: Page,
  idToExclude: string,
): Promise<void> => {
  const allCards = await page.getByTestId(JOB_TEST_IDS.JOB_CARD).all();
  const cardIds = await Promise.all(
    allCards
      .slice(1) // Exclude init card
      .map(async (card) => await card.getAttribute('data-uuid')),
  );

  expect(cardIds.indexOf(idToExclude)).toBe(-1);
};

const clickCardExceptFirstTwo = async (page: Page) => {
  const allCards = await page.getByTestId(JOB_TEST_IDS.JOB_CARD).all();
  const [min, max] = [0, allCards.length - 3];
  await allCards.splice(2)[getRandomInt(min, max)].click();
};

test.describe('@mobile', () => {
  test('should render init-card correctly using nav', async ({ page }) => {
    const [id1, id2] = await getFirstTwoJobIds(page);

    await reloadToJobDetails(page, id2);

    await openMobileNavFromDetails(page);
    await navigateToJobListPage(page);
    await assertInitCard(page, id2);
    await assertCardsSwapped(page, id1, id2);
    await assertListDeduped(page, id2);

    await clickCardExceptFirstTwo(page);
    await openMobileNavFromDetails(page);
    await navigateToJobListPage(page);
    await assertInitCard(page, id2);
  });
});

test.describe('@desktop', () => {
  test('should render init-card correctly', async ({ page }) => {
    const [id1, id2] = await getFirstTwoJobIds(page);
    await reloadToJobDetails(page, id2);
    await assertInitCard(page, id2);
    await assertCardsSwapped(page, id1, id2);
    await assertListDeduped(page, id2);
    await clickCardExceptFirstTwo(page);
    await assertInitCard(page, id2);
  });
});

test.describe('@mobile/@tablet', () => {
  test('should render init-card correctly', async ({ page }) => {
    const [id1, id2] = await getFirstTwoJobIds(page);
    await reloadToJobDetails(page, id2);
    await navigateBackToJobListPage(page);
    await assertInitCard(page, id2);
    await assertCardsSwapped(page, id1, id2);
    await assertListDeduped(page, id2);
    await clickCardExceptFirstTwo(page);
    await navigateBackToJobListPage(page);
    await assertInitCard(page, id2);
  });
});

test.describe('@tablet / @desktop', () => {
  test('should render init-card correctly using nav', async ({ page }) => {
    const [id1, id2] = await getFirstTwoJobIds(page);

    await reloadToJobDetails(page, id2);

    await navigateToJobListPage(page);
    await assertInitCard(page, id2);
    await assertCardsSwapped(page, id1, id2);
    await assertListDeduped(page, id2);

    await clickCardExceptFirstTwo(page);
    await navigateToJobListPage(page);
    await assertInitCard(page, id2);
  });
});
