import React from 'react';

const LinkedinIcon = props => (
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
      d="M39.333 39.667a5 5 0 0 1 5 5V50.5H41v-5.833a1.667 1.667 0 0 0-3.333 0V50.5h-3.334v-5.833a5 5 0 0 1 5-5ZM31 40.5h-3.333v10H31v-10ZM29.333 38a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Z"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_17_344" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-7} />
        <feGaussianBlur stdDeviation={5} />
        <feColorMatrix values="0 0 0 0 0.294118 0 0 0 0 0.294118 0 0 0 0 0.294118 0 0 0 0.01 0" />
        <feBlend
          in2="effect1_dropShadow_17_344"
          result="effect2_dropShadow_17_344"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_17_344"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default LinkedinIcon;
