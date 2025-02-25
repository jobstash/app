import { Switch, SwitchProps } from '@heroui/switch';

import { cn } from '@jobstash/shared/utils';

interface Props extends SwitchProps {
  title: string;
  subtitle: string;
}

export const EditModalSwitch = ({ title, subtitle, ...props }: Props) => (
  <Switch
    color="secondary"
    classNames={{
      base: cn(
        'inline-flex flex-row-reverse w-full max-w-full bg-content2 items-center',
        'justify-between cursor-pointer rounded-md gap-2 px-4 py-2.5 border-2 border-transparent',
      ),
      wrapper: 'p-0 h-4 overflow-visible',
      thumb: cn(
        'w-6 h-6 border-2 shadow-lg',
        'group-data-[selected=true]:ml-6',
        'group-data-[pressed=true]:w-7',
        'group-data-[selected]:group-data-[pressed]:ml-4',
      ),
    }}
    {...props}
  >
    <div className="flex flex-col gap-1">
      <p className="text-md">{title}</p>
      <p className="text-tiny text-default-400">{subtitle}</p>
    </div>
  </Switch>
);
