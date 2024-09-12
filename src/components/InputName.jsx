import React, { useState } from 'react';

const InputName = () => {
  const [name, setName] = useState('');

  return (
    <div className="mt-4">
      <div style={{ position: 'relative', width: '307px', height: '60px' }}>
        <input
          type="name"
          name="name"
          placeholder="Full Name"
          minLength="6"
          style={{
            width: '100%',
            height: '100%',
            padding: '18px 26px',
            paddingLeft: '50px', 
            borderRadius: '26px',
            border: '1px solid rgba(238, 238, 238, 1)',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            opacity: '1',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '21px',
            textAlign: 'left',
            position: 'relative',
          }}
          autoFocus
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name === '' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
            style={{
              position: 'absolute',
              top: '50%',
              left: '15px', 
              transform: 'translateY(-50%)',
              width: '24px',
              height: '18px',
              opacity: '0.2',
            }}
          >
            <path 
              fillRule="evenodd" 
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" 
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default InputName;
