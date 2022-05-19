import React from 'react';

const InstaIcon = props => (
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
      d="M40.422 38.762a1.14 1.14 0 1 0 0-2.28 1.14 1.14 0 0 0 0 2.28Z"
      fill="#0A142F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.75 42.5c0 2.62 2.13 4.75 4.75 4.75s4.75-2.13 4.75-4.75-2.13-4.75-4.75-4.75-4.75 2.13-4.75 4.75Zm2.375 0a2.377 2.377 0 0 1 2.375-2.375 2.377 2.377 0 0 1 2.375 2.375 2.377 2.377 0 0 1-2.375 2.375 2.377 2.377 0 0 1-2.375-2.375Z"
      fill="#0A142F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.75 52h9.5c2.441 0 4.75-2.309 4.75-4.75v-9.5c0-2.441-2.309-4.75-4.75-4.75h-9.5C28.308 33 26 35.309 26 37.75v9.5c0 2.441 2.308 4.75 4.75 4.75Zm-2.375-14.25c0-1.11 1.265-2.375 2.375-2.375h9.5c1.11 0 2.375 1.265 2.375 2.375v9.5c0 1.11-1.265 2.375-2.375 2.375h-9.5c-1.132 0-2.375-1.243-2.375-2.375v-9.5Z"
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_17_351" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-7} />
        <feGaussianBlur stdDeviation={5} />
        <feColorMatrix values="0 0 0 0 0.294118 0 0 0 0 0.294118 0 0 0 0 0.294118 0 0 0 0.01 0" />
        <feBlend
          in2="effect1_dropShadow_17_351"
          result="effect2_dropShadow_17_351"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_17_351"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default InstaIcon;
