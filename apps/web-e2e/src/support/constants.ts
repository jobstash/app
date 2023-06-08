export const defaultVisitOptions = {
  failOnStatusCode: false,
  headers: {
    authorization: `Basic ${Cypress.env('BASIC_AUTH')}`,
  },
};
