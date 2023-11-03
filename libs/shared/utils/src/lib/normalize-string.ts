const specialChars = '!@#$%^&*()-+=,';

const specialCharsSet = new Set(specialChars);

const charToStringMap = new Map([
  ['!', '_bang_'],
  ['@', '_at_'],
  ['#', '_hash_'],
  ['$', '_dollar_'],
  ['%', '_percent_'],
  [',', '_comma_'],
  ['^', '_caret_'],
  ['&', '_and_'],
  ['*', '_asterisk_'],
  ['(', '_lparen_'],
  [')', '_rparen_'],
  ['<', '_langle_'],
  ['>', '_rangle_'],
  ['-', '_hyphen_'],
  ['+', '_plus_'],
  ['=', '_equals_'],
]);

export const normalizeString = (str: string): string =>
  [...str]
    .map((x) => (specialCharsSet.has(x) ? charToStringMap.get(x) : x))
    .join('')
    .replaceAll(/[^\dA-Za-z]/g, '')
    .toLowerCase();
