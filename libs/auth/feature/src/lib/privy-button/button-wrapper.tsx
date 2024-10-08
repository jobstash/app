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
  <div className={cn('h-8 lg:h-10 rounded-xl max-w-[10rem]')} style={wrapperStyle}>
    {children}
  </div>
);
