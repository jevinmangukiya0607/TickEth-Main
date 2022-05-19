import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import axios from 'axios';
import QRCode from 'qrcode';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { abi } from 'constants/EventAbi';
import PageHead from 'components/PageHead';
import { setTicketsApi } from 'utils/api';
import { useAuth } from 'lib/AuthProvider';
import { loadScript } from 'utils/util';

const Loading = dynamic(() => import('components/Loading'));

export default function Event({ eventData }) {
  const contractAddress = '0xE14b643328CDA7079E6A34fbdE78fFc0dcb2Bc71';
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const { isAuthenticated, user } = useMoralis();
  const router = useRouter();
  const { id } = router.query;
  const { setLogin } = useAuth();
  const [qrSrc, setQrSrc] = useState(null);
  const [account, setAccount] = useState();
  const [minting, setMinting] = useState(false);

  let email = '';
  if (typeof window !== 'undefined') email = localStorage.getItem('email');

  useEffect(() => {
    if (!user) return null;
    setAccount(user.attributes.accounts);
  }, [isAuthenticated, user]);

  const getQRSrc = useCallback(() => {
    let randomnumber = Math.floor(Math.random() * (1000 - 3 + 1)) + 3;
    let temp = {
      randomnumber: randomnumber.toString(),
      email: email,
      eventId: id,
    };
    let data = JSON.stringify(temp);
    QRCode.toDataURL(data, function (err, url) {
      setQrSrc(url);
    });
  }, [email, id]);

  useEffect(() => {
    async function fetchData() {
      if (id) getQRSrc();
    }
    fetchData();
  }, [getQRSrc, id]);

  async function displayRazorPay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const razorpayData = await axios({
      baseURL: window.location.origin,
      method: 'POST',
      url: '/api/razorpay',
      data: { price: eventData.price },
    });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      currency: razorpayData.data.currency,
      amount: razorpayData.data.amount.toString(),
      order_id: razorpayData.data.id,
      name: eventData.title,
      description: eventData.description.slice(0, 200),
      prefill: {
        email: email,
      },
      handler: async function (response) {
        toast.success('Payment success');
        toast.promise(mintingProcess(), {
          pending: {
            render() {
              return 'Minting your ticket...';
            },
          },
          success: {
            render() {
              router.push('/profile');
              return 'Your NFT has been minted, check your profile page in a few minutes';
            },
          },
          error: {
            render() {
              return 'Error Minting your Ticket. Please contact the administrator!';
            },
          },
        });
        // console.log('Payment id : ', response.razorpay_payment_id);
        // console.log('Order id : ', response.razorpay_order_id);
        // console.log('Signature : ', response.razorpay_signature);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', response => {
      // console.log(response.error.code);
      // console.log(response.error.description);
      // console.log(response.error.source);
      // console.log(response.error.step);
      // console.log(response.error.reason);
      // console.log(response.error.metadata.order_id);
      // console.log(response.error.metadata.payment_id);
      toast.error(response.error.description);
    });
    paymentObject.open();
  }

  const mintingProcess = async () => {
    try {
      const connection = new ethers.providers.JsonRpcProvider(
        'https://rpc-mumbai.maticvigil.com/'
      );
      let wallet = new ethers.Wallet(privateKey);
      let walletSigner = wallet.connect(connection);
      const contract = new ethers.Contract(contractAddress, abi, walletSigner);
      const data = await contract.createToken(
        account[0],
        qrSrc,
        eventData.imageUrl
      );

      const nonce = await connection.getTransactionCount(
        wallet.address,
        'latest'
      );

      const tx = {
        data,
        nonce,
        gasLimit: ethers.utils.hexlify(100000),
        gasPrice: ethers.utils.hexlify(
          parseInt(await connection.getGasPrice())
        ),
      };
      const trans = await walletSigner.sendTransaction(tx);
      const receipt = await trans.wait();
      const event = receipt.events.find(x => x.event === 'MarketItemCreated');
      console.log(event);
      setMinting(false);
    } catch (err) {
      console.log(err);
      setMinting(false);
    }
    // reduce the ticket count by one in backend
    const temp = {
      eventId: id,
      ticketsLeft: eventData.ticketsLeft - 1,
    };
    try {
      const res = await setTicketsApi(temp);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
    setMinting(false);
    console.log('end');
  };

  const registerEvent = async () => {
    if (!isAuthenticated && !email) {
      setLogin(true);
      toast.error('Login to register for an event!');
      return;
    }
    setMinting(true);
    try {
      let rzpInstance;
      if (eventData.price !== 0) rzpInstance = await displayRazorPay();
      else {
        toast.promise(mintingProcess(), {
          pending: {
            render() {
              return 'Minting your ticket...';
            },
          },
          success: {
            render() {
              router.push('/profile');
              return 'Your NFT has been minted, check your profile page in a few minutes';
            },
          },
          error: {
            render() {
              return 'Error Minting your Ticket. Please contact the administrator!';
            },
          },
        });
      }
    } catch (err) {
      console.log('Payment error', err);
    }
    // redirect to profile page
  };

  const shareWithTwitter = () => {
    const textStr = `Checkout my ticket for ${eventData.title} by @ticketh_io at `;
    const encodedText = encodeURI(textStr);
    const encodedUrl = encodeURI(window.location.href);
    const twitterLink = `http://twitter.com/share?text=${encodedText}&url=${encodedUrl}`;
    window.open(twitterLink, '_blank');
  };

  return (
    <>
      <PageHead
        title={`${eventData?.title || ''} | TickEth`}
        description={eventData?.description || ''}
      />
      {eventData ? (
        <div className="flex flex-col items-center md:flex-row my-10 px-5 md:px-16">
          <Image
            src={eventData.imageUrl || ''}
            alt="event-image"
            width={300}
            height={400}
          />
          <div className="flex flex-col justify-evenly bg-slate-100 rounded-md ml-0 md:ml-4 mt-5 md:mt-0 py-5 w-full">
            <div className="flex flex-col px-6 py-2 w-full">
              <div className="flex flex-col md:flex-row justify-between">
                <h1 className="text-3xl font-semibold self-center">
                  {eventData.title}
                </h1>
                <div className="flex justify-evenly mt-6 md:mt-0">
                  <button
                    className="mr-3 px-3 py-2 bg-white rounded-md"
                    onClick={shareWithTwitter}
                  >
                    Share
                  </button>
                  {eventData.ticketsLeft > 0 && (
                    <button
                      className="px-3 py-2 bg-red text-white rounded-md"
                      onClick={registerEvent}
                    >
                      {eventData.price === '0' ? 'Register' : 'Buy Ticket'}
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-10 md:mt-5 font-medium">
                Created by {eventData.createdBy}
              </p>
              <hr className="my-5" />
              <p>{eventData.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-5">
              <div className="flex flex-col items-center bg-white p-3 rounded-md">
                <span className="text-xl">
                  {eventData.ticketsLeft >= 0 ? eventData.ticketsLeft : 0}
                </span>
                <p>Tickets Left</p>
              </div>
              <div className="flex flex-col items-center bg-white p-3 rounded-md">
                <span className="text-xl">{eventData.ticketVolume}</span>
                <p>Ticket Volume</p>
              </div>
              <div className="flex flex-col items-center bg-white p-3 rounded-md">
                <span className="text-xl">
                  {eventData.price === 0 ? 'Free' : eventData.price}
                </span>
                <p>Price in INR</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {minting && <Loading />}
    </>
  );
}

export const getServerSideProps = async ({ res, query }) => {
  const { id } = query;
  if (id === 'undefined') {
    res.statusCode = 302;
    res.setHeader('Location', '/browse');
    return { props: {} };
  }
  let eventData = {};
  if (id) {
    try {
      const response = await fetch(
        `https://dev-ticketh.herokuapp.com/api/event/getEvent?eventId=${id}`
      );
      const res = await response.json();
      eventData = res.event;
    } catch (err) {
      console.error(err);
    }
  }
  return {
    props: {
      eventData,
    },
  };
};
