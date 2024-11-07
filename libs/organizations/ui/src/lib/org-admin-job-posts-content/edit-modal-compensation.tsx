import { useState } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Input, InputProps } from '@nextui-org/react';

import { UpdateOrgJobPayload } from '@jobstash/organizations/core';

import { EditModalSwitch } from './edit-modal-switch';
import { HandleFieldChange } from './types';

const COMMON_INPUT_PROPS: Partial<InputProps> = {
  size: 'lg',
  classNames: {
    label: 'text-md',
    inputWrapper: 'text-md rounded-md bg-content2',
    input: 'text-sm appearance-none clean-number-input',
  },
  endContent: null,
};

interface Props {
  formState: UpdateOrgJobPayload;
  handleFieldChange: HandleFieldChange;
  isPending: boolean;
}

export const EditModalCompensation = ({
  formState,
  handleFieldChange,
  isPending,
}: Props) => {
  const [animateRef] = useAutoAnimate();

  const [preferRange, setPreferRange] = useState(false);

  const onTogglePreferRange = (isSelected: boolean) => {
    setPreferRange(isSelected);

    if (isSelected) {
      handleFieldChange('salary', null);
    } else {
      handleFieldChange('minimumSalary', null);
      handleFieldChange('maximumSalary', null);
    }
  };

  return (
    <div ref={animateRef} className="grid grid-cols-2 gap-4">
      <EditModalSwitch
        title="Use Salary Range"
        subtitle="Prefer range with minimum and maximum values"
        isSelected={preferRange}
        isDisabled={isPending}
        onValueChange={onTogglePreferRange}
      />
      <Input
        {...COMMON_INPUT_PROPS}
        label="Currency"
        placeholder="USD, EUR, USDT, BTC, ETH, etc."
        value={formState.salaryCurrency || ''}
        isDisabled={isPending}
        onChange={(e) => handleFieldChange('salaryCurrency', e.target.value)}
      />

      {preferRange ? (
        <>
          <Input
            {...COMMON_INPUT_PROPS}
            type="number"
            label="Minimum Salary"
            placeholder="Enter minimum salary amount"
            value={
              formState.minimumSalary ? formState.minimumSalary.toString() : ''
            }
            isDisabled={isPending}
            onChange={(e) =>
              handleFieldChange('minimumSalary', Number(e.target.value) || null)
            }
          />
          <Input
            {...COMMON_INPUT_PROPS}
            type="number"
            label="Maximum Salary"
            placeholder="Enter maximum salary amount"
            value={
              formState.maximumSalary ? formState.maximumSalary.toString() : ''
            }
            isDisabled={isPending}
            onChange={(e) =>
              handleFieldChange('maximumSalary', Number(e.target.value) || null)
            }
          />
        </>
      ) : (
        <Input
          {...COMMON_INPUT_PROPS}
          label="Salary"
          type="number"
          placeholder="Enter exact salary amount"
          value={formState.salary ? formState.salary.toString() : ''}
          isDisabled={isPending}
          onChange={(e) =>
            handleFieldChange('salary', Number(e.target.value) || null)
          }
        />
      )}

      <EditModalSwitch
        title="Pays In Crypto"
        subtitle="Salary paid in cryptocurrency"
        isSelected={Boolean(formState.paysInCrypto)}
        isDisabled={isPending}
        onValueChange={(value) => handleFieldChange('paysInCrypto', value)}
      />
      <EditModalSwitch
        title="Offer Token Allocation"
        subtitle="Salary includes allocation of tokens"
        isSelected={Boolean(formState.offersTokenAllocation)}
        isDisabled={isPending}
        onValueChange={(value) =>
          handleFieldChange('offersTokenAllocation', value)
        }
      />
    </div>
  );
};
