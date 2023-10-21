import ShowcaseItemLayout from './showcase-item-layout';

const ShowcaseSkeleton = () => (
  <>
    {[0, 1].map((i) => (
      <ShowcaseItemLayout
        key={i}
        labelInput={
          <div className="h-12 bg-white/20 rounded-lg animate-pulse" />
        }
        urlInput={<div className="h-12 bg-white/20 rounded-lg animate-pulse" />}
        iconButton={
          <div className="h-10 bg-white/20 rounded-md w-[5%] animate-pulse" />
        }
      />
    ))}
  </>
);

export default ShowcaseSkeleton;
