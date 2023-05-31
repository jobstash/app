import { createFetchDeets } from './create-fetch-deets';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('createFetchDeets', () => {
  // Arrange
  const reqUrl = 'test-url';
  const searchText = 'test-search';
  const testParam = { search: searchText };
  const testPayload = { id: 'test-id' };

  test('get w/o param', () => {
    expect(createFetchDeets(reqUrl, 'GET')).toStrictEqual({
      url: reqUrl,
      body: undefined,
    });
  });

  test('get w/ param', () => {
    expect(createFetchDeets(reqUrl, 'GET', testParam)).toStrictEqual({
      url: reqUrl + '?search=test-search',
      body: undefined,
    });
  });

  test('post w/o payload', () => {
    expect(createFetchDeets(reqUrl, 'POST')).toStrictEqual({
      url: reqUrl,
      body: undefined,
    });
  });

  test('post w/ payload', () => {
    expect(createFetchDeets(reqUrl, 'POST', testPayload)).toStrictEqual({
      url: reqUrl,
      body: '{"id":"test-id"}',
    });
  });
});
