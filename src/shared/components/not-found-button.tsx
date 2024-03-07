'use client';

import { reloadPage } from '~/shared/utils/reload-page';

import { ErrorActionButton } from './error-action-button';

export const NotFoundButton = () => (
  <ErrorActionButton text={TEXT} onClick={goToHomePage} />
);

const TEXT = 'Take me Home';
const goToHomePage = () => reloadPage('/');
