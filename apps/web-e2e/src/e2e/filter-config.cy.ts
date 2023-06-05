import { defaultVisitOptions } from '../support/constants';

describe('web', () => {
  const mwUrl = Cypress.env('MW_URL');

  it('can intercept xxx', async () => {
    //
    // cy.intercept('/api/asdf', {
    //   statusCode: 200,
    //   body: {
    //     msg: 'pakyu ka',
    //   },
    // });

    cy.visit('/jobs', defaultVisitOptions);

    cy.pause();
  });
});
