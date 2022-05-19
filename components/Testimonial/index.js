import InvertedCommaIcon from 'assets/InvertedCommaIcon';
import Star from 'assets/Star';
import Image from 'next/image';

export default function Testimonial() {
  return (
    <div className="py-12 px-4 sm:px-10">
      <div className="flex flex-wrap justify-center items-center">
        <div className="m-4 sm:m-10 md:m-14">
          <h1 className="font-semibold text-4xl mb-8">NBC NFT Collectibles</h1>
          <Image src="/nbc.png" alt="NBC NFT" width={589} height={340} />
        </div>
        <div className="flex flex-col flex-wrap m-4 sm:m-10 md:m-14">
          <InvertedCommaIcon />
          <h1 className="font-bold text-2xl max-w-xs my-4">
            Custom NFT Collectibles for the speakers
          </h1>
          <p className="max-w-md text-gray-500 ">
            Peppercontent hosted the &quot;Next Big Creator&quot; event
            (www.nextbigcreator.com) on the last week of February &apos;22 and
            TickEth minted 70 unique NFTs in total for their speakers and the
            organizers in such a tight timeframe. Kudos to their team for
            pulling this off and wishing them all the best for their future!
          </p>
          <div className="flex mt-10">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <h3 className="font-semibold">Pawan Rochwani</h3>
          <p className="text-gray-500">
            Lead Community, Events and Partnerships at Pepper Content
          </p>
        </div>
      </div>
    </div>
  );
}
