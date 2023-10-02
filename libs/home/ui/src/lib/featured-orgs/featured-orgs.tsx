const FeaturedOrganizations = () => (
  <div className="flex flex-col gap-8">
    <div className="flex w-full justify-between">
      <p>Featured Organizations</p>
      <p>View All</p>
    </div>
    <div className="flex gap-4 justify-around">
      <div className="w-80 h-32 border border-red-500 flex justify-center items-center">
        <p>Org 1</p>
      </div>
      <div className="w-80 h-32 border border-red-500 flex justify-center items-center">
        <p>Org 2</p>
      </div>
      <div className="w-80 h-32 border border-red-500 flex justify-center items-center">
        <p>Org 3</p>
      </div>
    </div>
  </div>
);

export default FeaturedOrganizations;
