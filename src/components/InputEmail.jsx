import React, { useState } from 'react';

const InputEmail = ({ name }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="mt-4">
      <div style={{ position: 'relative', width: '307px', height: '60px' }}>
        <input
          type="email"
          name={name}
          placeholder="Emal Address"
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
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email === '' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#152730"
            strokeWidth="2"
            strokeMiterlimit="10"
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
            <rect x="3" y="7" width="26" height="18" />
            <path d="M5,9" />
            <path d="M16,20" />
            <polyline points="29,7 16,18 3,7" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default InputEmail;
