import { type NextRouter } from 'next/router';
import { memo, useCallback } from 'react';

import { Button, EmptyResult } from '@jobstash/shared/ui';

interface Props {
  prevLink: string | null;
  push: NextRouter['push'];
}

const ProjectListEmptyResult = ({ prevLink, push }: Props) => {
  const onClick = useCallback(() => {
    const url = prevLink ?? '/projects';
    push(url, undefined, { shallow: true });
  }, [prevLink, push]);

  return (
    <EmptyResult
      description="Your search criteria is too restrictive and yielded no results."
      actionSection={
        prevLink ? (
          <div>
            <Button
              variant="primary"
              textProps={{ fw: 'semibold' }}
              size="md"
              onClick={onClick}
            >
              Back to Previous Results
            </Button>
          </div>
        ) : null
      }
    />
  );
};

export default memo(ProjectListEmptyResult);
