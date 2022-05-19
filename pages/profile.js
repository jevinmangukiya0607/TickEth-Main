import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { setCurrentScreen } from 'firebase/analytics';
import { useMoralis } from 'react-moralis';
import Image from 'next/image';
import { ethers } from 'ethers';
import Loading from 'components/Loading';
import { abi } from 'constants/EventAbi';
import PageHead from 'components/PageHead';
import { analytics } from 'utils/firebase';
import { useAuth } from 'lib/AuthProvider';
import Link from 'next/link';

const contractAddress = '0xE14b643328CDA7079E6A34fbdE78fFc0dcb2Bc71';
const rpcLink = 'https://rpc-mumbai.maticvigil.com/';

export default function Profile() {
  const { user } = useMoralis();
  const [loadingState, setLoadingState] = useState(true);
  const [myTickets, setMyTickets] = useState([]);
  const [account, setAccount] = useState();
  const { isAdmin } = useAuth();

  const router = useRouter();
  let email = '';
  if (typeof window !== 'undefined') email = localStorage.getItem('email');

  const loadMyTickets = useCallback(async () => {
    const connection = new ethers.providers.JsonRpcProvider(rpcLink);
    try {
      const contract = new ethers.Contract(contractAddress, abi, connection);
      const myNfts = await contract.fetchMyNFTs(account[0]);
      const t = myNfts.map(e => ({
        img: e.imageLink,
        qr: e.qrLink,
      }));
      setMyTickets(t);
    } catch (err) {
      console.log(err);
    }
    setLoadingState(false);
  }, [account]);

  useEffect(() => {
    if (user) setAccount(user.attributes.accounts);
    if (account && !isAdmin) loadMyTickets();
  }, [user, account, loadMyTickets, isAdmin]);

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
      <PageHead title="Profile | TickEth" description="Profile" />
      <div className="flex flex-col justify-around px-16 my-10 md:my-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 mr-0 md:mr-10 rounded-full">
            <Image src="/avatar.png" alt="Avatar" width={128} height={128} />
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-medium mt-4 md:mt-0">{email}</p>
            <p className="text-xl font-medium mt-4 md:mt-0">
              {account?.length > 0 ? account[0] : ''}
            </p>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-10">My Tickets</h1>
          {!loadingState && myTickets.length === 0 && (
            <>
              <h2>No Tickets Present</h2>
              <Link href="/browse">
                <a className="text-white bg-red px-8 py-2 mt-4 rounded-full text-lg font-medium md:text-xl text-center">
                  Purchase your first Ticket
                </a>
              </Link>
            </>
          )}
          {loadingState && !isAdmin && <Loading />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
            {myTickets.map((ticket, i) => (
              <div
                className="bg-slate-200 rounded-lg flex flex-col items-center h-fit"
                key={i}
              >
                <Image
                  src={ticket.img}
                  alt="Ticket Image"
                  width={420}
                  height={630}
                  className="rounded-t-lg"
                />
                <div className="p-4 lg:p-8">
                  <Image
                    src={ticket.qr}
                    alt="Ticket QR code"
                    width={350}
                    height={350}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
