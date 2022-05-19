import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { validateEmail } from 'utils/util';
import { toast } from 'react-toastify';
import { SOCIAL_MEDIA } from 'constants/seo';
import PhoneIcon from 'assets/PhoneIcon';
import EmailIcon from 'assets/EmailIcon';

export default function Footer() {
  const [email, setEmail] = useState('');
  const submitEmail = () => {
    if (email.length === 0) {
      toast.error('Please enter your email', {
        position: 'top-right',
        autoClose: 4000,
      });
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Invalid email format');
      setEmail('');
      return;
    }
    // sending the request
    fetch('/api/waitList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then(res => {
        if (res.status === 200) {
          toast.success('Email registered!');
          setEmail('');
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Error sending Form. Try again in some time.');
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="text-3xl font-bold text-center">Trusted by</p>
        <div className="self-center my-5">
          <Image src="/antler-logo.png" alt="Antler" width={160} height={62} />
        </div>
      </div>

      <div className="bg-red w-full mb-10 p-3 text-center text-white">
        <div className="text-lg sm:text-xl text-center flex justify-center items-center flex-wrap">
          <div className="font-bold text-2xl flex items-center lg:mr-6">
            <Image
              src="/footer-img.png"
              alt="List events"
              width={42}
              height={54}
            />
            <p className="ml-2">List Your Show</p>
          </div>
          Got a show, event, activity or a great experience? Partner with us and
          and get listed on TickEth
        </div>
      </div>

      <footer>
        <div className="flex-none md:flex justify-evenly items-center px-8 py-3">
          <div className="flex mb-4 md:mb-0 justify-center px-10">
            <Link href="/">
              <a>
                <Image
                  src="/new_logo.svg"
                  alt="TickEth"
                  width={135}
                  height={48}
                />
              </a>
            </Link>
          </div>

          <div className="flex-col text-center mb-3 md:mb-0">
            <p className="font-semibold mb-3">Stay tuned for more updates</p>
            <div className="relative m-auto w-full max-w-xs md:w-80">
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="
                    h-auto text-sm p-3
                    border border-grey-light
                    round text-grey-dark
                    w-full rounded-full"
                placeholder="Your email"
              />
              <div className="cursor-pointer rounded-full absolute right-1 md:right-2 top-1">
                <Image
                  src="/send-icon.png"
                  onClick={submitEmail}
                  alt="send"
                  width={36}
                  height={36}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center">
              {SOCIAL_MEDIA.map(item => (
                <a
                  href={item.href}
                  key={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2"
                >
                  <item.icon />
                </a>
              ))}
            </div>
            <a
              href="tel:+919940453399"
              className="flex justify-center items-center mt-2 hover:text-red transition-all no-underline"
            >
              <div className="w-8 mr-2">
                <PhoneIcon />
              </div>
              +91 99404 53399
            </a>
            <a
              href="mailto:contact@ticketh.io"
              className="flex justify-center items-center mt-2 hover:text-red transition-all no-underline"
            >
              <div className="w-8 mr-2">
                <EmailIcon />
              </div>
              contact@ticketh.io
            </a>
          </div>
        </div>
        <div className="flex text-center justify-evenly mx-auto my-10">
          <Link href="/privacy">
            <a className="text-gray-600 pb-2">Privacy Policy</a>
          </Link>
          <Link href="/terms">
            <a className="text-gray-600 pb-2">T & C</a>
          </Link>
          <Link href="/refund-policy">
            <a className="text-gray-600 pb-2">Refund Policy</a>
          </Link>
        </div>
        <div className="flex text-center justify-evenly mx-auto my-10">
          <p className=" text-gray-600 pb-2">
            ©2022 TickEth. All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
}
