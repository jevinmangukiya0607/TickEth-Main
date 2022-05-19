import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { setCurrentScreen } from 'firebase/analytics';
import { useMoralis } from 'react-moralis';
import { validateEmail } from 'utils/util';
import { analytics } from 'utils/firebase';
import { emailLoginApi, logUserEmailApi, verifyOtpApi } from 'utils/api';
import { ADMIN_USERS } from 'constants/seo';
import { setAuthToken, setLs } from 'utils/localStorage';
import { useAuth } from 'lib/AuthProvider';

const OtpLogin = dynamic(() => import('./OtpLogin'));
const EmailLogin = dynamic(() => import('./EmailLogin'));

export default function LoginPart({ onClose = () => {} }) {
  const { authenticate, authError } = useMoralis();
  const router = useRouter();
  const { setAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);

  const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
    chainId: 80001, // Polygon chain id
  };

  useEffect(() => {
    const logEvent = url => {
      setCurrentScreen(analytics(), url);
    };

    router.events.on('routeChangeComplete', logEvent);
    logEvent(window.location.pathname);

    if (authError) {
      toast.error(JSON.stringify(authError.message));
    }
    return () => {
      router.events.off('routeChangeComplete', logEvent);
    };
  }, [router.events, authError]);

  const logUserEmail = async () => {
    try {
      const res = await logUserEmailApi({ email });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const toastPromise = () => {
    toast.promise(
      authenticate({
        provider: 'magicLink',
        email: email,
        apiKey: 'pk_live_31F451EB35669F14',
        network: customNodeOptions,
      }),
      {
        pending: {
          render() {
            setIsLoading(true);
            return 'Authenticating... Do not refresh the page!';
          },
        },
        success: {
          render() {
            setIsLoading(false);
            logUserEmail();
            localStorage.setItem('email', email);
            onClose();
            return 'Welcome Back!';
          },
        },
        error: {
          render() {
            setIsLoading(false);
            return 'Error Logging In. Try again!';
          },
        },
      }
    );
  };

  const handleCustomLogin = async () => {
    if (!validateEmail(email)) {
      toast.error('Invalid Email Format!');
      return;
    }
    if (ADMIN_USERS.includes(email)) {
      emailLogin();
    } else {
      toastPromise();
    }
  };

  const emailLogin = () => {
    setIsLoading(true);
    emailLoginApi({ email })
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        setIsOtpEnabled(true);
        toast.error(err);
        console.log(err);
        setIsLoading(false);
      });
  };

  const onOtpLogin = otp => {
    if (!otp && otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }
    setIsLoading(true);
    verifyOtpApi({ email, otp }).then(res => {
      if (res && res.message === 'Verified' && res.token) {
        setIsLoading(false);
        toast.success('Welcome Back!');
        setAuthToken(res.token);
        setLs('isAdmin', true);
        setAdmin(true);
        localStorage.setItem('email', email);
        onClose();
      }
    });
  };

  return (
    <>
      {isOtpEnabled ? (
        <OtpLogin onClick={onOtpLogin} isLoading={isLoading} />
      ) : (
        <EmailLogin
          onClick={handleCustomLogin}
          isLoading={isLoading}
          email={email}
          setEmail={setEmail}
        />
      )}
    </>
  );
}
