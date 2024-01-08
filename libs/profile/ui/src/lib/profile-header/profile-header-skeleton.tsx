import ProfileHeaderLayout from './profile-header-layout';

const ProfileHeaderSkeleton = () => (
  <ProfileHeaderLayout
    header={
      <div className="flex items-center gap-4">
        <div className="h-[55px] w-[55px] bg-white/20 rounded-full animate-pulse" />
        <div className="h-6 w-24 bg-white/20 rounded-lg animate-pulse" />
        <div className="h-6 w-12 bg-white/20 rounded-lg animate-pulse" />
        <div className="h-6 w-28 bg-white/20 rounded-lg animate-pulse" />
      </div>
    }
    preferredInput={
      <div className="h-12 bg-white/20 rounded-lg animate-pulse" />
    }
    selectedInput={
      <div className="h-12 bg-white/20 rounded-lg animate-pulse" />
    }
    countryInput={<div className="h-12 bg-white/20 rounded-lg animate-pulse" />}
    cityInput={<div className="h-12 bg-white/20 rounded-lg animate-pulse" />}
    saveButton={
      <div className="h-10 w-28 bg-white/20 rounded-lg animate-pulse" />
    }
  />
);

export default ProfileHeaderSkeleton;
