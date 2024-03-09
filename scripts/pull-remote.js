/**
 * Cleanup local branches after successful merging feature.
 * Assumes you're on local feature-branch.
 */

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

(async function () {
  try {
    // Get branch name
    const { stdout: branchName } = await exec(
      'git rev-parse --abbrev-ref HEAD',
    );

    // Checkout app-router
    await exec('git checkout app-router');

    // Pull origin app-router
    await exec('git pull origin app-router');

    // Delete local feature-branch
    await exec(`git branch -D ${branchName}`);

    // Delete remote feature-branch
    await exec(`HUSKY=0 git push origin :${branchName}`);
  } catch (error) {
    console.error('remove-branch error =', error);
  }
})();
