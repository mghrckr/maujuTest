import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/actionCreators';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import InputPassword from '@/components/InputPassword';
import InputEmail from '@/components/InputEmail';
import EclipseOne from '@/components/EclipseOne';
import EclipseTwo from '@/components/EclipseTwo';

export const SignIn = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await dispatch(loginUser(email, password));
      const token = localStorage.getItem('access_token');
      if (token) {
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/contain/table');
        });
      } else {
        throw new Error('Access token is missing');
      }
    } catch (error) {
      console.log(error.message);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Email or password is incorrect. Please try again.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen relative"
        style={{ background: 'linear-gradient(180deg, #0575E6 0%, #02298A 84.79%, #021B79 100%)' }}>
        <EclipseOne />
        <EclipseTwo />
        <div className="absolute w-[350px] h-[200px] top-[260px] left-[157px] flex flex-col opacity-100">
          <div className="w-full h-1/2 flex flex-col items-start justify-center p-5 text-white">
            <div className="w-[220px] h-[60px] text-[40px] font-bold mb-2">
              GoFinance
            </div>
            <div className="w-[249px] h-[27px] text-[18px] font-medium">
              Lorem ipsum dolor sit amet
            </div>
          </div>
          <div className="w-full h-1/2">
            <button className="w-[135px] h-[37px] px-8 py-2 rounded-full bg-[#0575E6] text-white text-[14px] font-medium mt-2">
              Read More
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-[307px] h-[356px] rounded-tl-[30px] gap-0">
          <h1 className="text-[26px] font-bold leading-[39px]">
            Hello Again!
          </h1>
          <p className="text-[18px] font-normal leading-[27px]">
            Welcome Back
          </p>
          <form className="mt-6" onSubmit={handleLogin}>
            <InputEmail name="email" />
            <InputPassword name="password" />
            <button
              type="submit"
              className="w-[307px] h-[57px] px-6 py-4 rounded-full bg-[#0575E6] text-white mt-5 flex items-center justify-center gap-2"
            >
              Login
            </button>

            <div className="text-center mt-2">
              <a
                href="#"
                className="text-[#4a5568] text-[14px] font-normal opacity-70 hover:text-blue-700"
              >
                Forgot Password
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
