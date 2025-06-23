import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import CTAButton from "../ui/CTAButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../service/UserSlice"; // Adjust path if needed
import { useLoginUserMutation } from "../service/UserApi"; // Adjust path if needed

// Spinner component
const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

// Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [loginUser] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      const response = await loginUser(data).unwrap();

      dispatch(setUser({ user: response.user, token: response.token }));

      if (response.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setApiError(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email")}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-neutral-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                className={`w-full border rounded-md p-2 pr-10 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-neutral-400"
                }`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              required
              id="remember"
              className="mr-2 accent-black"
              {...register("rememberMe")}
            />
            <label htmlFor="remember" className="text-sm">
              Remember me for 7 days
            </label>
          </div>

          {apiError && <p className="text-red-600 text-center mb-2">{apiError}</p>}

          <CTAButton
            type="submit"
            text={
              isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )
            }
            disabled={isSubmitting}
            className="w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition disabled:opacity-50"
          />
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span
            className="text-amber-600 font-medium cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
