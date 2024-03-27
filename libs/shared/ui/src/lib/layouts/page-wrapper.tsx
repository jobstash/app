const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-screen overflow-x-hidden lg:pl-52 lg:pt-[100px] z-20 relative">{children}</div>
);

export default PageWrapper;
