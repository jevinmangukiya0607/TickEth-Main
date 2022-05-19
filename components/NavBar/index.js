import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMoralis } from 'react-moralis';
import { LINKS } from './constants';
import BurgerIcon from './BurgerIcon';
import { useAuth } from 'lib/AuthProvider';

const Modal = dynamic(() => import('components/Modal'));
const LoginPart = dynamic(() => import('./loginpart'));
const AuthenticatedLinks = dynamic(() => import('./AuthenticatedLinks'));

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, logout } = useMoralis();
  const { isAdmin, setAdmin, isLoginOpen, setLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoginOpen) openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMobileMenu = () => setIsMenuOpen(false);
  const openModal = () => {
    setIsModalOpen(true);
    closeMobileMenu();
  };
  const closeModal = () => {
    setLogin(false);
    setIsModalOpen(false);
  };
  const closeAllModal = () => {
    closeMobileMenu();
    closeModal();
  };
  const logoutClick = () => {
    logout();
    setAdmin(false);
    localStorage.clear();
    closeAllModal();
    router.push('/');
  };

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LoginPart onClose={closeAllModal} />
        </Modal>
      )}
      <nav
        className={`py-6 px-10 lg:px-20 flex justify-between items-center z-20 relative ${
          router.pathname === '/' ? 'bg-[#fff8f8]' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-center">
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
        {/* Desktop NavBar */}
        <div className="hidden md:flex flex-col align-middle md:flex-row">
          {LINKS.map(link => (
            <Link href={link.id} key={link.id} passHref>
              <a className="hover:text-red text-xl font-thin mx-4 my-2 md:my-0">
                {link.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="hidden md:flex">
          {!isAuthenticated && !isAdmin ? (
            <button
              className="mx-auto md:mx-0 text-white font-medium bg-red hover:opacity-90 py-3 px-6 rounded-3xl focus-visible:outline-0"
              onClick={openModal}
            >
              Login / Signup
            </button>
          ) : (
            <div className="flex flex-col items-start md:items-center overflow-x-hidden dropdown-activator">
              <Image
                src="/user-icon.png"
                alt="User"
                width={40}
                height={26}
                className="cursor-pointer"
              />
              <div className="flex flex-col absolute top-80 right-0 md:top-20 px-6 py-4 rounded-lg dropdown-with-links">
                <AuthenticatedLinks
                  onClose={closeAllModal}
                  isAdmin={isAdmin}
                  logoutClick={logoutClick}
                />
              </div>
            </div>
          )}
        </div>
        {/* Mobile Navbar */}
        <div className="md:hidden">
          <BurgerIcon isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </nav>
      <div
        className={`md:hidden flex flex-col items-start px-4 bg-white z-10 pt-3 pb-5 w-screen absolute top-0 left-0 h-full will-change-transform -translate-y-full transition-all rounded-b-lg duration-500 ease-in-out ${
          isMenuOpen ? '-translate-y-2 top-28 z-10' : ''
        } ${router.pathname === '/' ? 'bg-[#fff8f8]' : 'bg-white'}`}
      >
        <div className="w-full flex flex-col">
          {LINKS.map(link => (
            <Link href={link.id} passHref key={link.id}>
              <a
                className="hover:opacity-50 text-xl font-medium my-2"
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>
        {!isAuthenticated && !isAdmin ? (
          <div
            className="hover:opacity-50 text-xl font-medium my-2 w-full"
            onClick={openModal}
          >
            Login/ Signup
          </div>
        ) : (
          <AuthenticatedLinks
            onClose={closeAllModal}
            isAdmin={isAdmin}
            logoutClick={logoutClick}
            coloredBg={router.pathname === '/'}
          />
        )}
      </div>
    </>
  );
}
