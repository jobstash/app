interface Props {
  title: string;
  subject: string;
  desc: string;
}

export const Stat = ({ title, subject, desc }: Props) => (
  <div className="mx-auto flex  w-full flex-col space-y-3 text-center md:mx-0 md:w-auto">
    <h3 className="text-4xl font-bold leading-normal text-primary md:text-8xl">
      {title}
    </h3>
    <div className="flex flex-col space-y-1">
      <h4 className="text-lg font-bold text-white">{subject}</h4>
      <p className="text-sm font-medium">{desc}</p>
    </div>
  </div>
);
