import ShowcaseItemLayout from './showcase-item-layout';

interface Props {
  itemCount: number;
}

const ShowcaseSkeleton = ({ itemCount }: Props) => (
  <>
    {[...Array.from({ length: itemCount }).keys()].map((i) => (
      <ShowcaseItemLayout
        key={i}
        labelInput={
          <div className="h-12 p-2 bg-white/20 rounded-lg animate-pulse-tw" />
        }
        urlInput={
          <div className="h-12 p-2 bg-white/20 rounded-lg animate-pulse-tw" />
        }
        iconButton={
          <div className="h-10 p-2 bg-white/20 rounded-md w-10 animate-pulse-tw" />
        }
      />
    ))}
  </>
);

export default ShowcaseSkeleton;
