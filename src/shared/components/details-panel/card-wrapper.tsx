import { getGradientBorderStyle } from '~/shared/utils/get-gradient-border-style';

interface Props {
  children: React.ReactNode;
  isPrimary?: boolean;
}

export const DetailsPanelCardWrapper = ({ children, isPrimary }: Props) => {
  const style = getGradientBorderStyle(isPrimary);

  return (
    <div className="flex flex-col gap-4 rounded-3xl p-6" style={style}>
      {children}
    </div>
  );
};
