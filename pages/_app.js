import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { MoralisProvider } from 'react-moralis';
import { setCurrentScreen } from 'firebase/analytics';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import { analytics } from 'utils/firebase';
import { checkAdminApi } from 'utils/api';
import 'styles/globals.css';
import 'styles/navbar.css';
import 'styles/home.css';
import { AuthProvider } from 'lib/AuthProvider';

function Marketplace({ Component, pageProps }) {
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

  useEffect(() => {
    let email = localStorage.getItem('email');
    if (email) {
      isAdminCheck(email);
    }
  }, []);

  const isAdminCheck = async () => {
    try {
      let res = await checkAdminApi();
      if (res && res.message === 'verified')
        localStorage.setItem('isAdmin', true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MoralisProvider
      serverUrl="https://cq8frz7yfaia.usemoralis.com:2053/server"
      appId="N3Hfmm9zwVtoHhtbICdrqyPfFmiUndTfL1ZjT5sy"
    >
      <AuthProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          closeOnClick
          hideProgressBar
        />
      </AuthProvider>
    </MoralisProvider>
  );
}

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch('/api/check')
//   const posts = await res.json()

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }

export default Marketplace;
