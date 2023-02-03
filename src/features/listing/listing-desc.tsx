interface Props {
  desc: string;
}

export const ListingDesc = ({ desc }: Props) => (
  <div>
    <h3 className="text-sm text-white/70">{desc}</h3>
  </div>
);
