import { setCurrentScreen } from 'firebase/analytics';
import { useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { analytics } from 'utils/firebase';
import PageHead from 'components/PageHead';
import { HOMEPAGE_CONTENT } from 'constants/Homepage';
import OurProcess from 'components/OurProcess';
import SideHex from 'assets/SideHex';

const WhyTicketh = dynamic(() => import('components/WhyTicketh'));
const Testimonial = dynamic(() => import('components/Testimonial'));

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const logEvent = url => {
      setCurrentScreen(analytics(), url);
    };
    router.events.on('routeChangeComplete', logEvent);
    logEvent(window.location.pathname);

    return () => {
      router.events.off('routeChangeComplete', logEvent);
    };
  }, [router.events]);

  return (
    <>
      <PageHead
        title="Buy and Sell tickets as NFTs | TickEth"
        description="Unlock the untapped potential of tickets!! Enable royalties, perks and numerous other benefits for offline and online events."
      />
      <section className="flex flex-col relative md:flex-row items-center justify-between py-20 px-10 pb-[18rem] lg:px-32 bg-[#FFF8F8]">
        <div className="absolute left-0 z-10 hidden sm:block md:hidden lg:block">
          <SideHex />
        </div>
        <div className="flex flex-col items-start max-w-sm lg:max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-3 md:text-4xl md:text-left lg:text-5xl lg:leading-tight">
            Redefining event experience using NFTs
          </h1>
          <p className="text-center text-base font-medium w-full md:text-left md:text-2xl md:font-semibold">
            Bringing the best out of the tickets
          </p>
          <Link href="/browse">
            <a className="mt-5 mx-auto md:mx-0 text-white font-semibold bg-red hover:opacity-90 py-3 px-10 rounded-3xl">
              Buy Tickets
            </a>
          </Link>
        </div>
        <div className="drop-shadow-[20px_30px_20px_rgba(136,136,136,1)] mt-16 md:mt-0">
          <Image
            src="/hero-banner.png"
            alt="TickEth"
            width={392}
            height={497}
          />
        </div>
        <div className="custom-shape-divider-bottom">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66 92.83C906.67 72 823.78 31 743.84 14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84 11.73-114 31.07-172 41.86A600.21 600.21 0 0 1 0 27.35V120h1200V95.8c-67.81 23.12-144.29 15.51-214.34-2.97Z"
              className="shape-fill"
            />
          </svg>
        </div>
      </section>
      <OurProcess />
      {HOMEPAGE_CONTENT.map((item, idx) => (
        <Fragment key={item.title}>
          {idx === 0 && (
            <div className="absolute right-0 rotate-180 z-10 hidden sm:block md:hidden lg:block">
              <SideHex />
            </div>
          )}
          <section className="p-10 lg:px-32 md:py-20 flex flex-wrap items-center justify-center flex-col lg:even:flex-row lg:odd:flex-row-reverse">
            <div className="w-full flex justify-center md:w-4/12 md:px-8 px-0">
              <Image
                alt={item.title}
                src={item.img}
                width={item.width}
                height={item.height}
              />
            </div>
            <div className="w-full max-w-2xl px-0 pt-10 md:pt-0 md:px-8 md:pr-12">
              <h3 className="text-3xl font-semibold">{item.title}</h3>
              <hr className="w-16 my-2 h-1 bg-black rounded-full" />
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {item.desc}
              </p>
            </div>
          </section>
          {idx === 0 && <WhyTicketh />}
        </Fragment>
      ))}
      <div className="absolute right-0 drop-shadow-2xl rotate-180 z-10 hidden sm:block md:hidden lg:block">
        <SideHex />
      </div>
      <Testimonial />
    </>
  );
}
