import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

interface Props {
  isLoading?: boolean;
  isDisabled: boolean;
  buttonText: string;
  tooltipText: { enabled: string; disabled?: string };
  isDisabledTooltip?: boolean;
  onClick?: () => void;
}

export const TableMultiSelectActionButton = ({
  isLoading,
  isDisabledTooltip,
  isDisabled,
  buttonText,
  tooltipText,
  onClick,
}: Props) =>
  isLoading ? (
    <Button isDisabled isLoading>
      {buttonText}
    </Button>
  ) : (
    <Tooltip
      isDisabled={isDisabledTooltip}
      content={
        isDisabled
          ? tooltipText.disabled ?? 'Select multiple applicants first'
          : tooltipText.enabled
      }
      placement="top-start"
    >
      <div>
        <Button isDisabled={isDisabled} onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </Tooltip>
  );
