import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';

interface Props {
  applicants: Set<string>;
}

export const MultiSelectActions = ({ applicants }: Props) => {
  const isDisabled = applicants.size === 0;

  return (
    <div className="flex items-center gap-4">
      <ActionButton
        isDisabled={isDisabled}
        buttonText="Bulk Shortlist"
        tooltipText={{ enabled: 'Shortlist selected applicants' }}
      />
      <ActionButton
        isDisabled={isDisabled}
        buttonText="Bulk Archive"
        tooltipText={{ enabled: 'Archive selected applicants' }}
      />
      <ActionButton
        isDisabled={isDisabled}
        buttonText="Export CSV"
        tooltipText={{ enabled: 'Download CSV for selected applicants' }}
      />
    </div>
  );
};

const ActionButton = ({
  isDisabled,
  buttonText,
  tooltipText,
}: {
  isDisabled: boolean;
  buttonText: string;
  tooltipText: { enabled: string; disabled?: string };
}) => (
  <Tooltip
    content={
      isDisabled
        ? tooltipText.disabled ?? 'Select multiple applicants first'
        : tooltipText.enabled
    }
    placement="top-start"
  >
    <div>
      <Button isDisabled={isDisabled}>{buttonText}</Button>
    </div>
  </Tooltip>
);
