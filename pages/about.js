import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { setCurrentScreen } from 'firebase/analytics';
import PageHead from 'components/PageHead';
import { TEAM } from 'constants/TeamMembers';
import { analytics } from 'utils/firebase';

export default function AboutUs() {
  const router = useRouter();

  useEffect(() => {
    const logEvent = url => {
      setCurrentScreen(analytics(), url);
    };

    router.events.on('routeChangeComplete', logEvent);
    //For First Page
    logEvent(window.location.pathname);

    //Remvove Event Listener after un-mount
    return () => {
      router.events.off('routeChangeComplete', logEvent);
    };
  }, [router.events]);

  return (
    <>
      <PageHead
        title="About TickEth | Who we are and our mission"
        description="TickEth's vision is to revolutionize the ticketing industry by enhancing event experiences while maintaining smooth booking experience."
      />
      <section className="pt-10 pb-16 md:pb-12 px-4 flex flex-col justify-evenly ">
        <div className="flex flex-col justify-center text-center mb-5 w-full px-4">
          <h2 className="text-3xl font-semibold">Meet Our Team</h2>
          <p className="text-lg leading-relaxed mt-4 text-gray-600">
            We are a group of ethusiastic individuals who are passionate about
            Web3.
          </p>
        </div>
        <div className="grid gap-10 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mx-auto">
          {TEAM.map(member => (
            <div className="w-full px-4 py-6" key={member.name}>
              <div className="drop-shadow-lg mx-auto flex items-center justify-center">
                <Image
                  alt={member.name}
                  src={`/members${member.img}`}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
              <div className="pt-6 text-center">
                <h5 className="text-xl font-bold">{member.name}</h5>
                <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  {member.title}
                </p>
              </div>
              <div className="flex justify-center my-2">
                {member.linkedin.length > 0 && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-8 mx-2"
                  >
                    <Image
                      src="/linkedin.png"
                      alt="LinkedIn"
                      width={32}
                      height={32}
                    />
                  </a>
                )}
                {member.twitter.length > 0 && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-8 mx-2"
                  >
                    <Image
                      src="/twitter.png"
                      alt="Twitter"
                      width={32}
                      height={32}
                    />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-evenly mt-10">
        <h1 className="text-3xl font-semibold">Founder Story</h1>
        <div className="flex w-auto mx-auto my-10 justify-between">
          <Image src="/founder1.png" alt="founder" width={160} height={160} />
          <Image src="/founder2.png" alt="founder" width={160} height={160} />
          <Image src="/founder3.png" alt="founder" width={160} height={160} />
        </div>
        <p className="w-10/12 md:w-3/5 text-center md:text-justify mb-10 text-lg sm:text-xl text-medium">
          Started off as 3 curious crypto investors. As time progressed we
          became fascinated by blockchain technology and embarked on this
          journey of building something in this space. We believe this could be
          a disruptive technology and change the digital world as we know it.
          After multiple brainstorming sessions and failed ideas, we identified
          a valid use-case in the ticketing industry. Ticket scalping is a big
          problem in today&apos;s world and TickEth aims to put an end to this
          by using Blockchain technology to the fullest. NFTs are a cool way to
          leverage this technology with added benefits of unique collectibles
          and digital assets attached to it.
        </p>
      </section>

      <section className="flex flex-col items-center justify-evenly mt-5">
        <h1 className="text-3xl font-semibold">Our Vision</h1>
        <div className="my-10">
          <Image
            src="/vision-img.png"
            alt="Our Vision"
            width={214}
            height={320}
          />
        </div>
        <p className="w-10/12 md:w-3/5 text-center md:text-justify mb-10 text-lg sm:text-xl text-medium">
          TickEth&apos;s vision is to revolutionize the ticketing industry by
          enhancing event experiences. Preventing scalping will culminate in the
          ticketing industry being transparent and authentic which is a massive
          jump from the current industry standards. Tickets will go from being
          just a mode of entry to a collectible that has value, even after the
          completion of the event. We aim to set the industry standards for
          ticketing.
        </p>
      </section>
    </>
  );
}
