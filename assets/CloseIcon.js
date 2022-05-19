import React from 'react';

const CloseIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    width={24}
    height={24}
    {...props}
  >
    <path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: '#666',
        fillOpacity: 1,
      }}
      d="M7 4a.993.993 0 0 0-.707.293l-2 2a1 1 0 0 0 0 1.414L11.586 15l-7.293 7.293a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414 0L15 18.414l7.293 7.293a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414L18.414 15l7.293-7.293a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 0L15 11.586 7.707 4.293A.993.993 0 0 0 7 4Zm0 0"
    />
  </svg>
);

export default CloseIcon;
