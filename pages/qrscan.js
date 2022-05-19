import { useState } from 'react';
import dynamic from 'next/dynamic';
import { QrReader } from 'react-qr-reader';
import { toast } from 'react-toastify';
import styles from 'styles/Qrscan.module.css';
import PageHead from 'components/PageHead';
import { sendQrApi } from 'utils/api';

const Modal = dynamic(() => import('components/Modal'));

const Qrscan = () => {
  const [data, setData] = useState(null);
  const [qrValue, setQrValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const sendQr = async () => {
    try {
      const res = await sendQrApi({ qrid: qrValue });
      if (res.exists === 'false') {
        setData(qrValue);
        closeModal();
      } else if (res.exists === 'true') {
        toast.error('Qr has been scanned previously!');
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error scanning the QR. Try again!');
    }
  };

  const sendScannedQR = async result => {
    if (!!result) {
      if (result.text) {
        let temp = JSON.parse(result.text);
        temp = `${temp.email}_${temp.eventId}`;
        setQrValue(temp);
        setIsModalOpen(true);
      }
    }
  };

  return (
    <>
      <PageHead
        title="QR Scanner | TickEth"
        description="Revolutionising the ticketing Industry using NFTs"
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} hideClose>
          <div className="py-6 px-2 w-80 h-auto bg-white rounded-lg flex flex-col justify-between z-10">
            <button
              className="bg-green-500 hover:opacity-80 rounded-md text-white font-semibold text-2xl mb-4 p-2 w-full"
              onClick={sendQr}
            >
              Enter
            </button>
            <button
              className="bg-rose-500 hover:opacity-80 rounded-md text-white font-semibold text-2xl p-2 w-full"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <div className="flex flex-col justify-center items-center py-12">
        <h1 className="text-3xl font-semibold mb-5">QR Scanner</h1>
        {data ? (
          <>
            <div className={styles.wrapper}>
              <svg
                className={styles.checkmark}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className={styles.checkmark__circle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className={styles.checkmark__check}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            <h2
              className="text-red font-semibold cursor-pointer text-xl"
              onClick={() => setData(null)}
            >
              Scan Another?
            </h2>
          </>
        ) : (
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={sendScannedQR}
            containerStyle={{
              padding: '15px',
              width: '300px',
              height: '230px',
              border: '1px solid black',
            }}
            videoStyle={{ width: '300px', height: '200px' }}
          />
        )}
        <p className="mt-5">Hold the camera near QR Code</p>
      </div>
    </>
  );
};

export default Qrscan;
