import Link from 'next/link';
import Image from 'next/image';
import { WHY_TICKETH_CONTENT } from 'constants/WhyTicketh';

export default function WhyTicketh() {
  return (
    <div className="flex flex-col items-center bg-rose-50 py-[12rem] px-4 sm:px-10 relative">
      <div className="custom-shape-divider-top-whyTicketh-top">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            className="shape-fill"
          />
        </svg>
      </div>
      <h1 className="text-2xl sm:text-5xl mb-4 font-semibold text-center">
        Why TickEth?
      </h1>
      <p className="text-center text-base sm:text-xl font-normal max-w-2xl mb-10">
        We have the best features tailored for specific events and below are
        some of our common ones!
      </p>
      <div className="flex flex-wrap items-center justify-center">
        {WHY_TICKETH_CONTENT.map(item => (
          <div
            className="flex flex-col items-center px-6 py-10 rounded-xl border-2 max-w-sm sm:h-96 m-4 bg-white"
            key={item.title}
          >
            <div>
              <Image src={item.img} alt={item.title} width={100} height={100} />
            </div>
            <p className="font-semibold text-center text-xl sm:text-2xl">
              {item.title}
            </p>
            <p className="mt-5 text-sm text-center sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
      <Link href="/browse">
        <a className="bg-red text-white mt-5 font-semibold hover:opacity-90 py-3 px-10 rounded-3xl">
          Buy Tickets
        </a>
      </Link>
      <div className="custom-shape-divider-bottom-whyTicketh-bottom">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            className="shape-fill"
          />
        </svg>
      </div>
    </div>
  );
}
