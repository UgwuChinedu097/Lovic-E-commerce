import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import CTAButton from "../ui/CTAButton";
import { useNavigate } from "react-router-dom";

import { useSignupUserMutation } from "../service/UserApi";
import { useDispatch } from "react-redux";
import { setUser } from "../service/UserSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addNotification } from "../service/NotificationSlice";

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

// Define your Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  agreeToTerms: yup.bool().oneOf([true], "You must accept the terms and privacy policy"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const Nav = useNavigate();

  const [signupUser] = useSignupUserMutation();
  const dispatch = useDispatch();

  // useForm with yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // data contains all form fields validated by Yup
    try {
      const userData = await signupUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setUser({ user: userData.user }));
      dispatch(
        addNotification('new user signup'))
      Nav("/signin");
    } catch (err) {
      console.error("Signup failed:", err);
      // Optionally handle error display
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-gray-500 text-sm">
            Join Lumina Jewels to enjoy exclusive benefits
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="flex gap-5">
            <div className="flex flex-col w-[50%]">
              <label htmlFor="firstName" className="mb-2">First Name</label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                placeholder="First Name"
                className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${errors.firstName ? "focus:ring-red-500 border-red-500" : "focus:ring-neutral-400"
                  }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col w-[50%]">
              <label htmlFor="lastName" className="mb-2">Last Name</label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                placeholder="Last Name"
                className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${errors.lastName ? "focus:ring-red-500 border-red-500" : "focus:ring-neutral-400"
                  }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className={`w-full border px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500 border-red-500" : "focus:ring-neutral-400"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className={`w-full border px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 pr-10 ${errors.password ? "focus:ring-red-500 border-red-500" : "focus:ring-neutral-400"
                  }`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[60%] transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className={`w-full border px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 pr-10 ${errors.confirmPassword ? "focus:ring-red-500 border-red-500" : "focus:ring-neutral-400"
                  }`}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[60%] transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              {...register("agreeToTerms")}
              className="mr-2 accent-black cursor-pointer"
              required
            />
            I agree to the
            <a href="#" className="text-orange-600 ml-1 underline">Terms of Service</a>
            &nbsp;and&nbsp;
            <a href="#" className="text-orange-600 underline">Privacy Policy</a>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>
          )}

          <CTAButton
            // text={isSubmitting ? "Creating..." : "Create account"}
            text={
              isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Creating...
                </span>
              ) : (
                "Create account"
              )
            }
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition disabled:opacity-50"
          />
        </form>

        <div className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <span onClick={() => Nav("/signin")} className="text-orange-600 font-medium cursor-pointer">
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
