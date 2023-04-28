import { test, expect } from '../fixtures';
import * as metamask from '@synthetixio/synpress/commands/metamask';

let sharedPage;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ page }) => {
  sharedPage = page;
  await sharedPage.goto('https://localhost:3000');
});

test.afterAll(async ({ context }) => {
  await context.close();
});

test('auth flow', async ({ context }) => {
  // TODO: reset wallet role/flow to ANON/LOGIN

  await sharedPage.getByRole('button', { name: 'Connect Wallet' }).click();
  await sharedPage.getByRole('button', { name: 'MetaMask' }).click();

  const connectWalletPagePromise = context.waitForEvent('page');
  const connectWalletPopup = await connectWalletPagePromise;
  await connectWalletPopup.waitForLoadState();
  await connectWalletPopup.getByRole('button', { name: 'Next' }).click();
  await connectWalletPopup.getByRole('button', { name: 'Connect' }).click();
  await connectWalletPopup.close();

  const siwePagePromise = context.waitForEvent('page');

  await sharedPage.getByRole('button', { name: 'Sign In' }).click();

  const siwePopup = await siwePagePromise;
  await siwePopup.waitForLoadState();
  await siwePopup.getByTestId('request-signature__sign').click();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const devWallet = process.env.DEV_WALLET!;
  const expectedWalletText = `${devWallet.slice(0, 6)}...${devWallet?.slice(
    -4,
  )}`;
  await expect(
    sharedPage.getByRole('button', { name: expectedWalletText }),
  ).toBeVisible();
});

// test('import private key and connect wallet using imported metamask account', async ({
//   page,
// }) => {
//   await metamask.importAccount(
//     '0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97',
//   );
//   await page.click('#connectButton');
//   await metamask.acceptAccess();
//   await expect(page.locator('#accounts')).toHaveText(
//     '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f',
//   );
// });
