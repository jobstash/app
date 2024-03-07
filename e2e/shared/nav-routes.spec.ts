import { expect, Page, test } from '@playwright/test';

import { A11Y, HREFS } from '~/shared/core/constants';

import { assertNavActive, getNavLocator, openMobileNav } from './helpers';

const sidebarLinks = Object.values(A11Y.LINK.SIDEBAR);
const sidebarHrefs = [HREFS.JOBS_PAGE, HREFS.ORGS_PAGE, HREFS.PROJECTS_PAGE];
const testCases = sidebarLinks.map((linkName, i) => ({
  linkName,
  href: sidebarHrefs[i],
}));

const clickSidebarTab = async (page: Page, name: string) =>
  getNavLocator(page, name).click();

const assertPageUrl = async (page: Page, href: string) =>
  expect(page).toHaveURL(href);

const assertInactiveLinks = async (page: Page, linkName: string) => {
  const inactiveLinks = sidebarLinks.filter((link) => link !== linkName);
  for (const name of inactiveLinks) {
    await assertNavActive(page, name, false);
  }
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('@mobile', () => {
  for (const { linkName, href } of testCases) {
    test(`should navigate to ${href} using ${linkName} sidebar`, async ({
      page,
    }) => {
      await openMobileNav(page);
      await clickSidebarTab(page, linkName);
      await assertPageUrl(page, href);

      await openMobileNav(page);
      await assertNavActive(page, linkName);
      await assertInactiveLinks(page, linkName);
    });
  }
});

test.describe('@tablet/@desktop', () => {
  for (const { linkName, href } of testCases) {
    test(`should navigate to ${href} using ${linkName} sidebar`, async ({
      page,
    }) => {
      await clickSidebarTab(page, linkName);
      await assertPageUrl(page, href);
      await assertNavActive(page, linkName);
      await assertInactiveLinks(page, linkName);
    });
  }
});
