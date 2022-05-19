import ButtonWithLoader from 'components/ButtonWihLoader';
import { detectEnter } from 'utils/util';

export default function EmailLogin({ isLoading, onClick, email, setEmail }) {
  return (
    <div className="py-6 px-2 w-80 h-auto bg-white rounded-lg flex flex-col justify-between z-10">
      <div className="flex flex-col items-center justify-evenly">
        <h3 className="text-center font-semibold py-3 text-xl ">
          Login / Signup to purchase your NFT tickets
        </h3>
        <input
          autoFocus
          type="email"
          className="p-2.5 rounded-2xl mb-8 w-full border-2 border-solid border-gray-400 focus-within:border-blue-500 focus-visible:outline-none"
          placeholder="Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          onKeyUp={e => detectEnter(e, onClick)}
        />
        <ButtonWithLoader onClick={onClick} isLoading={isLoading} text="Next" />
      </div>
    </div>
  );
}
