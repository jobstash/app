import { expect, Locator, Page, ViewportSize } from '@playwright/test';

import { TEST_IDS } from '~/shared/core/constants';

// Need these helpers since playwright does not distinguish mobile from tablet
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1280;

export const checkIsMobile = (viewport: ViewportSize | null) => {
  const width = viewport?.width;
  return !!width && width < MOBILE_BREAKPOINT;
};

export const checkIsTablet = (viewport: ViewportSize | null) => {
  const width = viewport?.width;
  return !!width && width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
};

export const checkIsDesktop = (viewport: ViewportSize | null) => {
  const width = viewport?.width;
  return !!width && width >= TABLET_BREAKPOINT;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const openMobileNav = async (page: Page, exact = false) =>
  page.getByTestId(TEST_IDS.MOBILE_MENU).click();

export const openMobileNavFromDetails = async (page: Page) =>
  page.getByTestId(TEST_IDS.MOBILE_MENU).nth(1).click();

export const assertActive = async (locator: Locator, isActive = true) =>
  expect(locator).toHaveAttribute('data-active', isActive ? 'true' : 'false');

export const getNavLocator = (page: Page, name: string) => {
  const button = page.getByRole('button', { name });
  return page.getByTestId(TEST_IDS.NAV_SECTION).locator(button);
};

export const assertNavActive = async (
  page: Page,
  name: string,
  isActive?: boolean,
) => {
  const locator = getNavLocator(page, name);
  return assertActive(locator, isActive);
};
