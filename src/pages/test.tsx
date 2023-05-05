import Image from 'next/image';

const TestPage = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div>
      <div className="relative">
        <div className="absolute left-0 top-0 w-fit animate-spin">
          <div className="h-16 w-16">
            <Image src="/Logo-01.svg" height={300} width={300} alt="" />
          </div>
        </div>

        <div className="absolute left-0 top-0 w-fit animate-reverse-spin">
          <div className="h-16 w-16">
            <Image src="/Logo-02.svg" height={300} width={300} alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TestPage;
