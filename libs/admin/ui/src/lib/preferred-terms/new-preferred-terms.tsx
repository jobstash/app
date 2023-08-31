import { LoadingOverlay } from '@mantine/core';

const NewPreferedTerms = () => {
  // TODO: Add preferred-terms-mutation hook here
  const isLoading = false;

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col p-12 pb-8 w-1/2 gap-8 relative border border-gray rounded-lg">
        <LoadingOverlay visible={isLoading} />
        <p>TODO</p>
      </div>
    </div>
  );
};

export default NewPreferedTerms;
