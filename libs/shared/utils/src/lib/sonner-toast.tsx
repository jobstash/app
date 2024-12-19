import { Button, Spinner } from '@nextui-org/react';
import { XIcon } from 'lucide-react';
import { ExternalToast, toast } from 'sonner';

const DURATION = 8000;

interface Props extends ExternalToast {
  title: string;
  message?: string;
  cta?: (t: string | number) => React.ReactNode;
  withCloseButton?: boolean;
  isPending?: boolean;
}

export const sonnerToast = ({
  title,
  message,
  cta,
  withCloseButton = true,
  isPending,
  ...options
}: Props) => {
  toast.custom(
    (t) => (
      <div className="bg-dark border border-white/10 w-fit min-w-[320px] px-4 py-2 rounded-lg flex items-center justify-between relative">
        <div className="flex gap-4 items-center">
          {isPending && <Spinner size="sm" color="white" />}
          <div className="flex flex-col">
            <span className="font-bold text-sm">{title}</span>
            {message && <span className="text-sm">{message}</span>}
          </div>
        </div>
        <div>{cta?.(t)}</div>
        {withCloseButton && (
          <div className="absolute top-0 right-0 -mt-2 -mr-2">
            <Button
              isIconOnly
              className="w-6 h-6 rounded-full"
              onClick={() => toast.dismiss(t)}
            >
              <XIcon size={12} />
            </Button>
          </div>
        )}
      </div>
    ),
    {
      duration: DURATION,
      ...options,
    },
  );
};
