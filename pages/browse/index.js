// import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import { transferNft } from '../transfer';
// import { useMoralis } from 'react-moralis';
import PageHead from 'components/PageHead';
import Image from 'next/image';
import { getAllEventsApi } from 'utils/api';

const Modal = dynamic(() => import('components/Modal'));
const Loading = dynamic(() => import('components/Loading'));

// import web3 from "web3";
// import axios from "axios";
// import Web3Modal from "web3modal";
// import { nftaddress, nftmarketaddress } from "../config";
// import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
// import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
// import Ticket from "../components/Ticket";
// import { blockLinks } from "../components/blocklinks";

// let rpcEndpoint = "https://matic-mumbai.chainstacklabs.com";

// if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
//   rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
// }

export default function BrowseNFT() {
  const [events, setEvents] = useState();
  // eslint-disable-next-line no-unused-vars
  const [loadingState, setLoadingState] = useState('not-loaded');
  // const [itemId, setItemId] = useState(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const router = useRouter();
  // const [query, setQuery] = useState('');
  // const [backUpNFTs, setbackUpNFTs] = useState([]);
  // const [search, setSearch] = useState('');
  // const { user } = useMoralis();

  //   useEffect(() => {
  //     if (query != "") {
  //       let filtered = backUpNFTs.filter((nft) => {
  //         return nft.name.toLowerCase().includes(query.toLowerCase());
  //       });

  //       if (filtered.length > 0) {
  //         setNfts(filtered);
  //       } else {
  //         setNfts(backUpNFTs);
  //       }
  //     } else {
  //       setNfts(backUpNFTs);
  //     }
  //   }, [query]);

  //   useEffect(() => {
  //     const logEvent = (url) => {
  //       setCurrentScreen(analytics(), url);
  //     };

  //     routers.events.on("routeChangeComplete", logEvent);
  //     //For First Page
  //     logEvent(window.location.pathname);

  //     //Remvove Event Listener after un-mount
  //     return () => {
  //       routers.events.off("routeChangeComplete", logEvent);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     loadNFTs();
  //   }, []);

  //   async function loadNFTs() {
  //     const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
  //     const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  //     const marketContract = new ethers.Contract(
  //       nftmarketaddress,
  //       Market.abi,
  //       provider
  //     );
  //     const data = await marketContract.fetchAllNFTs();

  //     let items = await Promise.all(
  //       data.map(async (i) => {
  //         const tokenUri = await tokenContract.tokenURI(i.tokenId);
  //         const meta = await axios.get(tokenUri);
  //         let price = ethers.utils.formatUnits(i.price.toString(), "ether");
  //         let item = {
  //           price,
  //           itemId: i.itemId.toNumber(),
  //           seller: i.seller,
  //           owner: i.owner,
  //           image: meta.data.image,
  //           name: meta.data.name,
  //           description: meta.data.description,
  //         };
  //         return item;
  //       })
  //     );

  //     items = items.filter(ele => (ele.itemId!==41 && ele.itemId!==62 && ele.itemId!==29 && ele.itemId!==65 && ele.itemId!==67));
  //     setNfts(items);
  //     setbackUpNFTs(items);
  //     setLoadingState("loaded");
  //     console.log(items);
  //   }

  //   async function buyNft(nft) {
  //     const web3Modal = new Web3Modal();
  //     const connection = await web3Modal.connect();
  //     const provider = new ethers.providers.Web3Provider(connection);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

  //     const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  //     const transaction = await contract.createMarketSale(
  //       nftaddress,
  //       nft.itemId,
  //       {
  //         value: price,
  //       }
  //     );
  //     await transaction.wait();
  //     loadNFTs();
  //   }

  //   const transferNFT = async () => {
  //     const senderAddress = address;
  //     console.log("itemId : ", itemId);
  //     console.log("address : ", senderAddress);
  //     if (!web3.utils.isAddress(senderAddress)) {
  //       alert("invalid address!");
  //       closeModal();
  //       return;
  //     }

  //     // web3 stuff in this page
  //     const web3Modal = new Web3Modal({});
  //     const connection = await web3Modal.connect();
  //     const provider = new ethers.providers.Web3Provider(connection);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

  //     let transaction = await contract.transferNFT(
  //       nftaddress,
  //       senderAddress,
  //       itemId
  //     );
  //     await transaction.wait();

  //     console.log("done!");
  //     setAddress('');
  //     closeModal();
  //     routers.push("/");
  //   };

  const closeTransferModal = () => setIsTransferModalOpen(false);

  const redirectTo = id => {
    router.push(`/browse/${id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllEventsApi();
        setEvents(res.result.docs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <PageHead
        title="Browse for events"
        description="Find and book your event now and enjoy a unique ticketed experience."
      />
      <Modal isOpen={isTransferModalOpen} onClose={closeTransferModal}>
        <div className="w-72 h-full md:h-auto">
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
              Transfering NFT
            </h3>
          </div>
          <form className="mb-3 py-4 px-2">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              Address of the account
            </label>
            <input
              autoFocus
              required
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </form>
          <div className="flex flex-col md:flex-row items-center justify-evenly p-4 pb-0 w-full border-t border-gray-200">
            <button
              // onClick={transferNFT}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 rounded-lg text-md font-medium px-5 py-2.5 w-full mb-2 md:mb-0 md:mr-2"
            >
              Send
            </button>
            <button
              onClick={closeTransferModal}
              type="button"
              className="text-white bg-red hover:bg-rose-700 focus:ring-4 rounded-lg text-md font-medium px-5 py-2.5 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <div className="pb-10 md:pb-42 overflow-x-hidden">
        <div className="p-12 flex justify-between items-center flex-col md:flex-row">
          <h2 className="text-3xl text-center md:text-left font-semibold">
            Events in Chennai
          </h2>

          {/* Search Bar to be activated later */}

          {/* <div className="relative w-fit mt-5 md:ml-5 md:mt-0">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-full w-80 border px-3 py-2 pr-12 md:w-72"
            />
            <div className="cursor-pointer absolute right-5 top-2 md:right-4">
              <Image
                src="/search-icon.svg"
                alt="search-icon"
                width={20}
                height={20}
              />
            </div>
          </div> */}
        </div>
        {loadingState === 'loaded' && !nfts.length ? (
          <h1 className="px-20 py-10 text-3xl item-center flex">
            Server Error
          </h1>
        ) : (
          <>
            <div className="px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-6">
                {events ? (
                  events.map(event => (
                    <div
                      className="rounded-md cursor-pointer flex flex-col my-5 md:my-0"
                      key={event.eventId}
                      onClick={() => redirectTo(event.eventId)}
                    >
                      <div className="rounded-t-md">
                        <Image
                          layout="responsive"
                          src={event.imageUrl}
                          alt="Event Image"
                          width={250}
                          height={320}
                          className="rounded-t-md"
                        />
                      </div>
                      <div className="w-full bg-gray-700 flex flex-col px-3 py-2 text-white ro justify-self-end rounded-b-md">
                        <p className="text-green-400">{event.eventId}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-xl text font-semibold">
                            {event.title}
                          </p>
                          <p>
                            {event.price === 0 ? 'Free' : event.price + 'INR'}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p>{event.createdBy}</p>
                          <p>
                            {new Date(event.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Loading />
                )}

                {/* <div className="rounded-md cursor-pointer flex flex-col">
                  <img src="/event-img.png" alt="Event Image" className="h-full rounded-md" />
                  <div className="z-10 w-full backdrop-blur-md -translate-y-20 bg-gray-600 flex flex-col px-3 py-2 text-white ro justify-self-end rounded-md">
                    <p className="text-green-400">Series 1</p>
                    <div className="flex justify-between">
                      <p>Money Heist</p>
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between">
                      <p>#EventId</p>
                      <p>13 days left</p>
                    </div>
                  </div>
                </div> */}

                {/* <div className="rounded-md cursor-pointer flex flex-col">
                  <img src="/event-img.png" alt="Event Image" className="h-full rounded-md" />
                  <div className="z-10 w-full backdrop-blur-md -translate-y-20 bg-gray-600 flex flex-col px-3 py-2 text-white ro justify-self-end rounded-md">
                    <p className="text-green-400">Series 1</p>
                    <div className="flex justify-between">
                      <p>Money Heist</p>
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between">
                      <p>#EventId</p>
                      <p>13 days left</p>
                    </div>
                  </div>
                </div> */}

                {/* <div className="rounded-md cursor-pointer flex flex-col">
                  <img src="/event-img.png" alt="Event Image" className="h-full rounded-md" />
                  <div className="z-10 w-full backdrop-blur-md -translate-y-20 bg-gray-600 flex flex-col px-3 py-2 text justify-self-end text-white rounded-md">
                    <p className="text-green-400">Series 1</p>
                    <div className="flex justify-between">
                      <p>Money Heist</p>
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between">
                      <p>#EventId</p>
                      <p>13 days left</p>
                    </div>
                  </div>
                </div> */}

                {/* <div className="rounded-md cursor-pointer flex flex-col">
                  <img src="/event-img.png" alt="Event Image" className="h-full rounded-md" />
                  <div className="z-10 w-full backdrop-blur-sm -translate-y-20 bg-gray-600 flex flex-col justify-self-end px-3 py-2 text-white rounded-md">
                    <p className="text-green-400">Series 1</p>
                    <div className="flex justify-between">
                      <p>Money Heist</p>
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between">
                      <p>#EventId</p>
                      <p>13 days left</p>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 px-10">
                {nfts.map((nft, i) => {
                  return (
                    <div key={i} className="">
                      <a href={nft.image} download={nft.name + ".nft"}>
                        <div className=" bg-gradient-to-br from-pink-400 to-pink-600 shadow-inner flex items-center justify-center rounded-t-lg w-3/4 mx-auto -mb-5 h-10">
                          <a
                            href={blockLinks[i]}
                            data-bs-toggle="tooltip"
                            className="text-blue-600 flex items-center hover:text-blue-700 transition duration-150 ease-in-out"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-arrow-up-right-square mx-2 text-white"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                              />
                            </svg>
                            <p className="text-sm mx-2 text-white">
                              Open in Block Explorer - {nft.itemId}
                            </p>
                          </a>
                        </div>
                        <img
                          src={nft.image}
                          className="hover:opacity-75 transition ease-in-out duration-150"
                          alt={nft.name}
                        />
                      </a>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
}
