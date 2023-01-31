import { ToggleButton } from './base/toggle-button';
import { BookmarkActiveButtonIcon, BookmarkButtonIcon } from './icons';

export const BookmarkButton = () => (
  <ToggleButton activeEl={<BookmarkActiveButtonIcon />}>
    <BookmarkButtonIcon />
  </ToggleButton>
);
