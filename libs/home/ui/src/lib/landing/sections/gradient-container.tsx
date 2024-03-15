import { cn } from '@jobstash/shared/utils';

export const GradientContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 p-6 md:p-10',
      className,
    )}
    style={gradientStyles}
  >
    {children}
  </div>
);

const gradientStyles = {
  background:
    'linear-gradient(90deg, #1C1253, #140D2F) padding-box, linear-gradient(90deg, rgba(135,67,255,0.8) 60%, rgba(214,136,0,0.8) 80%) border-box',

  border: '3px solid transparent',
};
