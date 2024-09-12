import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export function Navbar() {
  let navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      setTimeout(() => {
        navigate('/');
      }, 200);
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav
      style={{
        height: '64px',
        gap: '0px',
        opacity: '1',
        background: 'rgba(5, 113, 225, 1)',
      }}
      className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          style={{
            height: '64px',
            width: '240px',
            position: 'absolute',
            right: '140px', 
            top: '0',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {!isMobile && (
            <div
              style={{
                width: '2px',
                height: '64px',
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
              }}
            />
          )}
          <div
            style={{
              width: '30%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <svg
              version="1.1"
              viewBox="0 0 32 32"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ width: '40px', height: '40px',marginLeft: '40px' }}
            >
              <g>
                <circle
                  cx="16"
                  cy="16"
                  fill="none"
                  r="15"
                  stroke="#ffffff" 
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  d="M26,27L26,27 c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0"
                  fill="none"
                  stroke="#ffffff" 
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <circle
                  cx="16"
                  cy="11"
                  fill="none"
                  r="6"
                  stroke="#ffffff" 
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>
          <div
            style={{
              width: '70%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column', 
              justifyContent: 'center',
              padding: '0 10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px', 
              }}
            >
              <div
                style={{
                  width: '119px',
                  height: '16px',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  letterSpacing: '1.25px',
                  textAlign: 'right',
                  color: 'rgba(255, 255, 255, 1)',
                  opacity: 1,
                }}
              >
                Jason Lee L.W.
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffffff" 
                style={{ width: '10px', height: '10px', marginLeft: '2px', transform: 'rotate(90deg)'  }}
              >
                <path
                  d="M4.5 18.347c0 1.427 1.529 2.33 2.779 1.643l11.54-6.347c1.295-.712 1.295-2.573 0-3.286L7.28 2.99c-1.25-.687-2.779.217-2.779 1.643v14.714z"
                />
              </svg>
            </div>
            <div
              style={{
                width: '63px',
                height: '15px',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '14.52px',
                textAlign: 'right',
                color: 'rgba(255, 255, 255, 0.8)',
                opacity: 1,
                marginLeft: '5px'
              }}
            >
              Sales Lead
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
