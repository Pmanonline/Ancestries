import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../features/auth/authActions";
import { resetSuccess } from "../features/auth/authSlice";
import Error from "../components/tools/Error";
import Spinner from "../components/tools/Spinner";
import familytree from "../assets/images/familytree.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { DirectionButton2 } from "../components/d-button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, success } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  console.log("User:", user);
  console.log("User id:", user?.id);
  console.log("User Email:", user?.email);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitForm = ({ email, password }) => {
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      console.log("Logged in");
      navigate("/");
      dispatch(resetSuccess());
    }
    if (error) {
      console.error("Login error:", error);
    }
  }, [navigate, success, error, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen m-[1px]">
      {/* Image Section */}
      <div className="hidden md:block md:w-[50%] bg-gray-200 shadow-lg">
        <img
          className="object-cover w-full h-full"
          src={familytree}
          alt="Login Image"
        />
      </div>

      {/* Login Form Section */}
      <div className="md:w-[50%] flex sm:p-8">
        <form onSubmit={handleSubmit(submitForm)} className="w-full">
          <div className="text-center">
            <h3 className="text-3xl font-semibold mb-8">Sign in</h3>
          </div>
          <div className="my-8 w-[22rem] mx-auto">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold">
              Email
            </label>
            <input
              placeholder="*****"
              id="email"
              name="email"
              type="email"
              {...register("email")}
              autoComplete="current-email"
              required
              className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-black sm:text-md focus:outline-none bg-transparent"
            />
          </div>

          <div className="my-8 w-[22rem] mx-auto">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                placeholder="*****"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                autoComplete="current-password"
                required
                className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-black sm:text-md focus:outline-none bg-transparent"
              />
              <span
                className="absolute right-3 top-[14px] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <MdOutlineRemoveRedEye />
              </span>
            </div>
          </div>

          <div className="text-center ml-[12rem] mb-6">
            <Link
              to="/forgotpassword"
              className="text-sm text-black hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="mx-auto text-center">
            <button
              type="submit"
              className="border flex justify-center mx-auto bg-green text-white py-2 px-[8rem] rounded-2xl hover:scale-105 focus:outline-none focus:bg-green"
              disabled={loading}
            >
              {loading ? <Spinner /> : <>Login</>}
            </button>
          </div>

          <div className="flex justify-center">
            {error && <Error>{error}</Error>}
          </div>

          <p className="mt-5 text-sm text-gray-400 text-center">
            Don't have an account?
            <Link
              to="/register"
              className="text-black font-bold hover:underline ml-2"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
