import { memo } from 'react';
import { type InViewHookResponse } from 'react-intersection-observer';

import Loader from '../base/loader';

interface Props {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  inViewRef: InViewHookResponse['ref'];
  itemsLength: number;
  text: string;
}

const ListNextPageLoader = (props: Props) => {
  const { isFetchingNextPage, hasNextPage, inViewRef, itemsLength, text } =
    props;

  if (itemsLength === 0) return null;

  return (
    <div ref={inViewRef} className="flex items-center justify-center pb-10">
      {isFetchingNextPage && <Loader />}
      {!hasNextPage && <p>{text}</p>}
    </div>
  );
};

export default memo(ListNextPageLoader);
