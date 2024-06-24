import { useState } from 'react';

import { Spinner } from '@nextui-org/spinner';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';

import CardSet from '../base/card-set';
import BookmarkIcon from '../icons/bookmark-icon';
import BookmarkedIcon from '../icons/bookmarked-icon';

interface Props {
  isBookmarked: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const BookmarkButton = ({
  isBookmarked,
  isLoading,
  isDisabled,
  onClick,
}: Props) => {
  const role = CHECK_WALLET_ROLES.DEV;
  const bypassDevSignup = true;
  const callback = () => {
    if (onClick) {
      setBookmarked((prev) => !prev);
      onClick();
    }
  };

  const { isAuthd, roleClick } = useRoleClick({
    role,
    bypassDevSignup,
    callback,
  });

  const [bookmarked, setBookmarked] = useState(isBookmarked);

  return (
    <div className="flex items-center justify-center h-6 w-6">
      {isLoading ? (
        <Spinner size="sm" color="white" />
      ) : (
        <CardSet
          icon={isAuthd && bookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
          className="px-[3px]"
          isDisabled={isDisabled}
          onClick={roleClick}
        >
          {null}
        </CardSet>
      )}
    </div>
  );
};

export default BookmarkButton;
