import { CheckIcon, MinusIcon } from 'lucide-react';

interface Props {
  included: boolean | string;
  tierName: string;
}

export const FeatureIcon = ({ included, tierName }: Props) => {
  if (typeof included === 'string') {
    return (
      <div className="text-center text-md font-medium text-gray-500">
        {included}
      </div>
    );
  }

  return (
    <>
      {included ? (
        <CheckIcon
          aria-hidden="true"
          size={24}
          className="text-indigo-400 mx-auto"
        />
      ) : (
        <MinusIcon
          aria-hidden="true"
          size={20}
          className="text-gray-400 mx-auto"
        />
      )}
      <span className="sr-only">
        {included ? 'Included' : 'Not included'} in {tierName}
      </span>
    </>
  );
};
