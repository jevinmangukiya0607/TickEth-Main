import React from 'react';

const TwitterIcon = props => (
  <svg
    width={70}
    height={84}
    viewBox="0 0 70 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35 67c13.807 0 25-11.193 25-25S48.807 17 35 17 10 28.193 10 42s11.193 25 25 25Z"
        fill="#fff"
      />
      <path
        d="M58.5 42c0 12.979-10.521 23.5-23.5 23.5S11.5 54.979 11.5 42 22.021 18.5 35 18.5 58.5 29.021 58.5 42Z"
        stroke="#fff"
        strokeWidth={3}
      />
    </g>
    <path
      d="M44 36.846c-.712.37-1.425.493-2.256.616.831-.493 1.425-1.231 1.662-2.216-.712.492-1.544.739-2.493.985C40.2 35.492 39.13 35 38.063 35c-2.02 0-3.8 1.846-3.8 4.062 0 .369 0 .615.118.861-3.206-.123-6.175-1.723-8.075-4.184-.356.615-.475 1.23-.475 2.092 0 1.354.713 2.584 1.782 3.323-.594 0-1.188-.246-1.782-.493 0 1.97 1.306 3.57 3.088 3.939-.357.123-.713.123-1.069.123-.238 0-.475 0-.713-.123.476 1.6 1.9 2.83 3.682 2.83-1.306 1.108-2.969 1.724-4.869 1.724H25C26.781 50.26 28.8 51 30.938 51c7.125 0 11.043-6.154 11.043-11.446v-.492c.831-.616 1.544-1.354 2.019-2.216Z"
      fill="#0A142F"
    />
    <defs>
      <filter
        id="a"
        x={0}
        y={0}
        width={70}
        height={84}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={7} />
        <feGaussianBlur stdDeviation={5} />
        <feColorMatrix values="0 0 0 0 0.294118 0 0 0 0 0.294118 0 0 0 0 0.294118 0 0 0 0.1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_17_347" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-7} />
        <feGaussianBlur stdDeviation={5} />
        <feColorMatrix values="0 0 0 0 0.294118 0 0 0 0 0.294118 0 0 0 0 0.294118 0 0 0 0.01 0" />
        <feBlend
          in2="effect1_dropShadow_17_347"
          result="effect2_dropShadow_17_347"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_17_347"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default TwitterIcon;
