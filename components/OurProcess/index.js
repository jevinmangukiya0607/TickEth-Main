import Image from 'next/image';
import { useAuth } from 'lib/AuthProvider';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';

export default function OurProcess() {
  const { setLogin, isAdmin } = useAuth();
  const { isAuthenticated } = useMoralis();
  const router = useRouter();

  const openLogin = () => {
    if (!isAdmin && !isAuthenticated) setLogin(true);
    else router.push('/browse');
  };

  return (
    <div className="flex flex-col py-20 px-10 pb-[50rem] md:pb-[16rem] lg:pb-[24rem] xl:pb-[32rem] lg:px-32 bg-transparent relative">
      <h1 className="text-2xl md:text-4xl font-semibold ">
        We have the simplest process!
      </h1>
      <h2 className="font-bold text-lg text-gray-600 mt-6">
        Email Login. Purchase. Use Perks
      </h2>
      <p className="text-gray-600 max-w-sm ">
        We remove the hassle of creating a public wallet, connecting it, blah
        blah blah...!
      </p>
      <button
        className="mt-5 text-white font-semibold bg-red hover:opacity-90 py-3 px-10 rounded-3xl w-fit"
        onClick={openLogin}
      >
        Get Started
      </button>
      <div className="hidden md:block absolute top-40 right-0 lg:right-10 xl:right-20">
        <Image src="/process.png" alt="Our Process" width={1200} height={580} />
      </div>
      <div className="md:hidden absolute top-[24rem] right-0 p-5">
        <Image
          src="/process-mobile.png"
          alt="Our Process"
          width={390}
          height={618}
        />
      </div>
    </div>
  );
}
