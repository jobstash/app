'use client';

import { Button } from '@nextui-org/button';

import { cn } from '~/shared/utils/cn';

interface Props {
  isLoading: boolean;
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export const CustomButton = ({ isLoading, isActive, ...props }: Props) => {
  return (
    <div
      className={cn('flex min-h-[40px] w-full justify-center', {
        'aria-hidden opacity-30 pointer-events-none select-none': isLoading,
      })}
    >
      <MobileButton isActive={isActive} {...props} />
      <DesktopButton isActive={isActive} {...props} />
    </div>
  );
};

type ButtonProps = Omit<Props, 'isLoading'> & {
  isActive: boolean;
};

const MobileButton = ({ children, onClick, isActive }: ButtonProps) => {
  const btnClassName = cn(
    'flex h-14 w-full max-w-md items-center justify-center rounded-xl hover:brightness-110 md:hidden',
    {
      'justify-center rounded-lg bg-gradient-to-r from-[#8743FF] to-[#D68800] p-0.5':
        isActive,
    },
  );

  const btnStyle = isActive
    ? undefined
    : {
        background:
          'linear-gradient(90deg, #4637F2, #8242FE) padding-box, linear-gradient(90deg, #8743FF, #D68800) border-box',
        border: '4px solid transparent',
      };

  const innerClassName = cn(
    'flex h-full w-full items-center justify-center text-lg font-semibold transition-all duration-300',
    {
      'rounded-lg bg-transparent hover:bg-dark-gray hover:brightness-110':
        isActive,
    },
  );

  return (
    <Button
      onClick={onClick}
      type="button"
      className={btnClassName}
      style={btnStyle}
    >
      <div className={innerClassName}>{children}</div>
    </Button>
  );
};

const DesktopButton = ({ children, onClick, isActive }: ButtonProps) => {
  const innerClassName = cn(
    'flex h-full w-full items-center justify-center rounded-lg bg-darker-gray text-sm font-semibold transition-all duration-300 hover:bg-dark-gray',
    { 'bg-transparent hover:brightness-110': isActive },
  );

  return (
    <Button
      onClick={onClick}
      type="button"
      className="hidden h-10 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#8743FF] to-[#D68800] p-0.5 md:flex"
    >
      <div className={innerClassName}>{children}</div>
    </Button>
  );
};
