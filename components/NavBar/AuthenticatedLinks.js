import Link from 'next/link';

export default function AuthenticatedLinks({
  onClose,
  logoutClick,
  isAdmin,
  coloredBg,
}) {
  return (
    <div
      className={`flex flex-col items-center ${
        coloredBg ? 'bg-[#fff8f8]' : 'bg-white'
      } m-3 ml-0 md:m-3 md:mr-6 p-4 pl-0 md:p-4 border-t-2 md:border-none rounded-none md:rounded-xl w-full md:w-max md:shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px]`}
    >
      <div
        className="text-xl w-full text-left font-medium cursor-pointer my-2 hover:opacity-50"
        onClick={logoutClick}
      >
        Logout
      </div>
      {!isAdmin && (
        <Link href="/profile">
          <a
            className="text-xl w-full text-left font-medium my-2 hover:opacity-50"
            onClick={onClose}
          >
            My Tickets
          </a>
        </Link>
      )}
      {isAdmin && (
        <>
          <Link href="/qrscan">
            <a
              className="text-xl w-full text-left font-medium my-2 hover:opacity-50"
              onClick={onClose}
            >
              QR Scanner
            </a>
          </Link>
          <Link href="/createEvent">
            <a
              className="text-xl w-full text-left font-medium my-2 hover:opacity-50"
              onClick={onClose}
            >
              Create Events
            </a>
          </Link>
        </>
      )}
    </div>
  );
}
