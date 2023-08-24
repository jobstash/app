import { Button } from '@jobstash/shared/ui';

const BlockedTermsActions = () => {
  const xxx = 42;

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 items-center">
        <Button variant="outline" className="px-6">
          Reset
        </Button>
        <Button variant="primary" className="px-6">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BlockedTermsActions;
