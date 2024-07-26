import { cn } from '@jobstash/shared/utils';

export const wrapperStyle = {
  background:
    'linear-gradient(0deg, #1E1E1E, #1E1E1E) padding-box, linear-gradient(90deg, #8743FF, #D68800) border-box',
  border: '2px solid transparent',
};

interface Props {
  children: React.ReactNode;
}

export const ButtonWrapper = ({ children }: Props) => (
  <div className={cn('h-10 w-36 rounded-xl')} style={wrapperStyle}>
    {children}
  </div>
);
