import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { analytics } from 'utils/firebase';
import { setCurrentScreen } from 'firebase/analytics';
import { validateEmail } from 'utils/util';
import PageHead from 'components/PageHead';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const routers = useRouter();

  useEffect(() => {
    const logEvent = url => {
      setCurrentScreen(analytics(), url);
    };

    routers.events.on('routeChangeComplete', logEvent);
    //For First Page
    logEvent(window.location.pathname);

    //Remvove Event Listener after un-mount
    return () => {
      routers.events.off('routeChangeComplete', logEvent);
    };
  }, [routers.events]);

  const validateForm = () => {
    if (name.length === 0 || mail.length === 0 || message.length === 0) {
      toast.error('Input empty!', {
        position: 'top-right',
        autoClose: 4000,
      });
      return false;
    }
    if (!validateEmail(mail)) {
      toast.error('Invalid Email format', {
        position: 'top-right',
        autoClose: 4000,
      });
      return false;
    }
    return true;
  };

  const submitForm = () => {
    if (!validateForm()) {
      setName('');
      setEmail('');
      setMessage('');
      return;
    }
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, message: message }),
    });
    setName('');
    setEmail('');
    setMessage('');
    toast.success('Message Sent', {
      position: 'top-right',
      autoClose: 4000,
    });
  };

  return (
    <>
      <PageHead
        title="Contact Us | TickEth"
        description="Add value to your ticketed events by contacting us today!"
      />
      <section className="text-gray-700 px-5 py-10">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Contact Us
          </h1>
          <p className="lg:w-1/2 mx-auto leading-relaxed text-base">
            If you are willing to work with us or learn more about the product
            please drop in your contact, we will get in touch with you shortly,
            thank you!
          </p>
        </div>
        <div className="flex flex-col max-w-2xl mx-auto shadow-lg rounded-lg px-4 md:px-10 py-5">
          <div className="p-2 flex items-center justify-between w-full flex-col md:flex-row">
            <div className="w-full md:pr-2">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="w-full md:pl-2">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full">
            <button
              onClick={submitForm}
              className="flex mx-auto text-white bg-red border-0 py-2 px-8 focus:outline-none hover:opacity-90 rounded text-lg font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
