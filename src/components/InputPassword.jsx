import React, { useState } from 'react';

const InputPassword = ({ name }) => {
  const [password, setPassword] = useState('');

  return (
    <div className="mt-4">
      <div style={{ position: 'relative', width: '307px', height: '60px' }}>
        <input
          type="password"
          name={ name }
          placeholder="Password"
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
          autoComplete="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password === '' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              position: 'absolute',
              top: '50%',
              left: '15px',
              transform: 'translateY(-50%)',
              width: '21px',
              height: '18px',
              opacity: '0.2',
            }}
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default InputPassword;
