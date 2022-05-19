import React from 'react';

const PhoneIcon = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <defs>
      <style>
        {'.a{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round}'}
      </style>
    </defs>
    <path className="a" d="M18.5 19.5h-13" />
    <path d="M12 20.75a.75.75 0 1 0 .75.75.749.749 0 0 0-.75-.75Z" />
    <rect className="a" x={5.5} y={0.5} width={13} height={23} rx={2} ry={2} />
  </svg>
);

export default PhoneIcon;
