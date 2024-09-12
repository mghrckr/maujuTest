import EclipseOne from '@/components/EclipseOne';
import EclipseTwo from '@/components/EclipseTwo';
import InputEmail from '@/components/InputEmail';
import InputName from '@/components/InputName';
import InputPassword from '@/components/InputPassword';
import { registerUser } from '@/store/actionCreators';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const SignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (event) => {
    event.preventDefault();

    const userData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      await dispatch(registerUser(userData));

      Swal.fire({
        icon: 'success',
        title: 'Registered successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setTimeout(() => {
          navigate('/auth/sign-in');
        }, 200);
      });
    } catch (error) {
      console.log(error.message);

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen relative"
        style={{
          background: 'linear-gradient(180deg, #0575E6 0%, #02298A 84.79%, #021B79 100%)',
        }}
      >
        <EclipseOne />
        <EclipseTwo />
        <div
          style={{
            position: 'absolute',
            width: '350px',
            height: '200px',
            top: '260px',
            left: '157px',
            display: 'flex',
            flexDirection: 'column',
            opacity: '1',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '20px',
              color: 'rgba(255, 255, 255, 1)',
            }}
          >
            <div
              style={{
                width: '220px',
                height: '60px',
                fontFamily: 'Poppins',
                fontSize: '40px',
                fontWeight: '700',
                lineHeight: '60px',
                textAlign: 'left',
                color: 'rgba(255, 255, 255, 1)',
                marginBottom: '8px',
              }}
            >
              GoFinance
            </div>
            <div
              style={{
                width: '249px',
                height: '27px',
                fontFamily: 'Poppins',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '27px',
                textAlign: 'left',
                color: 'rgba(255, 255, 255, 1)'
              }}
            >
              Lorem ipsum dolor sit amet
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '50%',
            }}
          >
            <button
              style={{
                width: '135px',
                height: '37px',
                padding: '8px 30px',
                borderRadius: '30px 30px 30px 30px',
                backgroundColor: 'rgba(5, 117, 230, 1)',
                border: 'none',
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '21px',
                textAlign: 'left',
                cursor: 'pointer',
                opacity: '1',
                marginLeft: '15px',
                marginTop: '10px'
              }}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div
          style={{
            width: '307px',
            height: '356px',
            top: '272px',
            left: '973px',
            borderRadius: '30px 0 0 0',
            gap: '0px'
          }}
        >
          <h1 className="font-poppins font-bold" style={{ fontSize: '26px', lineHeight: '39px', textAlign: 'left' }}>
            Hello Again!
          </h1>
          <p
            style={{
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: '27px',
              textAlign: 'left',
            }}
          >
            Sign Up to Get Started
          </p>
          <form className="mt-6" onSubmit={handleRegister}>
            <InputName name="name" />
            <InputEmail name="email" />
            <InputPassword name="password" />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white"
              style={{
                width: '307px',
                height: '57px',
                padding: '18px 26px',
                borderRadius: '26px 26px 26px 26px',
                opacity: '1',
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: 'rgba(5, 117, 230, 1)'
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
