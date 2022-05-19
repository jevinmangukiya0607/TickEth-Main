import React from 'react';

const Star = props => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10 15-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
      fill="#F9896B"
    />
  </svg>
);
export default Star;
