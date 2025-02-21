import { cn } from '@jobstash/shared/utils';

interface Props {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
}: Props) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={cn(
        'text-white/60 bg-clip-text inline-block pointer-events-none',
        className,
        { 'animate-shine': !disabled },
      )}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration,
      }}
    >
      {text}
    </div>
  );
};
