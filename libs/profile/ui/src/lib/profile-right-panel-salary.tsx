import { memo, useCallback, useMemo, useState } from 'react';

import { Checkbox, LoadingOverlay, NumberInput, Select } from '@mantine/core';

import { type ProfileOrgReview } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useSalaryMutation } from '@jobstash/profile/state';

import { Button, Heading, Text } from '@jobstash/shared/ui';

interface Props {
  orgReview: ProfileOrgReview | null;
}

const ProfileRightPanelSalary = ({ orgReview }: Props) => {
  const { org, salary } = orgReview || ({} as ProfileOrgReview);
  const { currency, amount, token } = salary;

  const [currentCurrency, setCurrentCurrency] = useState<string | null>(
    currency.value,
  );
  const [currentAmount, setCurrentAmount] = useState<number | null>(amount);
  const [currentToken, setCurrentToken] = useState<string | null>(token.value);
  const [currentNoAllocation, setCurrentNoAllocation] = useState(
    token.noAllocation,
  );

  const disableSave = useMemo(() => {
    const prev = JSON.stringify({
      currency: currency.value,
      amount,
      tokenValue: token.value,
      tokenNoAllocation: token.noAllocation,
    });
    const next = JSON.stringify({
      currency: currentCurrency,
      amount: currentAmount,
      tokenValue: currentToken,
      tokenNoAllocation: currentNoAllocation,
    });

    return prev === next;
  }, [
    amount,
    currency,
    currentAmount,
    currentCurrency,
    currentNoAllocation,
    currentToken,
    token.noAllocation,
    token.value,
  ]);

  const { isLoading, mutate } = useSalaryMutation();

  const onClickSave = useCallback(() => {
    mutate({
      orgId: org.id,
      currencyValue: currentCurrency,
      salaryAmount: currentAmount ?? null,
      tokenValue: currentToken,
      tokenNoAllocation: currentNoAllocation,
    });
  }, [
    currentAmount,
    currentCurrency,
    currentNoAllocation,
    currentToken,
    mutate,
    org.id,
  ]);

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Heading size="lg" fw="semibold">
        Salary
      </Heading>
      <Text color="dimmed">
        By sharing your own experiences and honest feedback, you can help other
        developers make more informed decisions about where to work.
      </Text>

      <div className="py-2 pb-4">
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-8 items-center justify-end">
          <div className="flex justify-end">
            <Text size="lg">Currency</Text>
          </div>
          <div className="w-[70%] pr-[5%]">
            <Select
              data={currency.options}
              value={currentCurrency}
              placeholder="Select ..."
              size="lg"
              classNames={{
                input: cn(
                  'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
                  // { 'border border-white': Boolean(preferredWOC) },
                ),
                itemsWrapper: 'bg-dark-gray',
                item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
              }}
              onChange={setCurrentCurrency}
            />
          </div>
        </div>

        <div className="flex gap-8 items-center justify-end">
          <div className="flex justify-end">
            <Text size="lg">Amount (Per Year)</Text>
          </div>
          <div className="w-[70%] pr-[5%]">
            <NumberInput
              hideControls
              placeholder="(Per Year)"
              size="lg"
              classNames={{
                input: cn(
                  'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-md focus:border-white/40',
                  // { 'border border-white': Boolean(selectedWOC) },
                ),
              }}
              value={currentAmount ?? ''}
              onChange={(v) => setCurrentAmount(v ? Number(v) : null)}
            />
          </div>
        </div>

        <div className="flex gap-8 items-center justify-end">
          <div className="flex justify-end">
            <Text
              size="lg"
              className={cn({ 'opacity-40': currentNoAllocation })}
            >
              Token
            </Text>
          </div>
          <div className="w-[70%] pr-[5%]">
            <Select
              disabled={currentNoAllocation}
              data={token.options}
              value={currentNoAllocation ? null : currentToken}
              placeholder={currentNoAllocation ? '' : 'Select ...'}
              size="lg"
              classNames={{
                input: cn(
                  'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
                  // { 'border border-white': Boolean(preferredWOC) },
                ),
                itemsWrapper: 'bg-dark-gray',
                item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
              }}
              onChange={setCurrentToken}
            />
          </div>
        </div>

        <div className="flex justify-end items-center pr-[5%] pt-2">
          <Checkbox
            label="No token allocation"
            checked={currentNoAllocation}
            onChange={(e) => setCurrentNoAllocation(e.currentTarget.checked)}
          />
        </div>

        <div className="flex items-center justify-center pt-8 w-full gap-8">
          <Button
            variant="primary"
            className="px-8"
            isDisabled={disableSave}
            onClick={onClickSave}
          >
            Save & Next
          </Button>
          <Button
            variant="outline"
            className="px-8 bg-darker-gray"
            isDisabled={disableSave}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileRightPanelSalary);
