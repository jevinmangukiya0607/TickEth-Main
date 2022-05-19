import ButtonWithLoader from 'components/ButtonWihLoader';
import { useState } from 'react';

export default function OtpLogin({ onClick, isLoading }) {
  const [otp, setOtp] = useState('');

  return (
    <div className="py-6 px-2 w-80 h-auto bg-white rounded-lg flex flex-col justify-between z-10">
      <div className="flex flex-col items-center justify-evenly">
        <h3 className="text-center font-semibold py-3 text-xl ">
          Enter your OTP to continue
        </h3>
        <input
          autoFocus
          type="text"
          className="p-2.5 rounded-2xl mb-8 w-full border-2 border-solid border-gray-400 focus-within:border-blue-500 focus-visible:outline-none text-center"
          placeholder="OTP"
          value={otp}
          onChange={e => {
            setOtp(e.target.value);
          }}
        />
        <ButtonWithLoader
          onClick={() => onClick(otp)}
          isLoading={isLoading}
          text="Login/ Signup"
        />
      </div>
    </div>
  );
}
