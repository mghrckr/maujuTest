import React, { useState } from 'react';

const EclipseOne = () => {
  const [email, setEmail] = useState('');

  return (
    <div
      style={{
        position: 'absolute',
        width: '557px',
        height: '557px',
        bottom: '0px',
        right: '620px',
        top: '500px',
        borderRadius: '50%',
        border: '1px solid rgba(5, 117, 230, 1)',
        opacity: '1',
      }}
    ></div>
  );
};

export default EclipseOne;
