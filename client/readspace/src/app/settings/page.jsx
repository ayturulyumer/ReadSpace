"use client";
import Image from "next/image.js";
import { uploadAvatar } from "../actions/profileActions.js";
import { updateUserProfile } from "../actions/authActions.js";
import { useAuth } from "../context/authContext.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function Settings() {
  const { session, refreshSession, logoutUser } = useAuth();
  const [passwordType, setPasswordType] = useState("password");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");

  const router = useRouter();

  const userId = session?.id;

  // Toggle Show/Hide Password
  const handlePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  //
  useEffect(() => {
    if (session?.user_metadata?.avatar) {
      setAvatarUrl(session.user_metadata.avatar);
    }
    setIsLoading(false);
  }, [session]);

  // Upload the avatar to storage and update the user's profile with the uploaded avatar
  const handleAvatarChange = async (e) => {
    const avatar = e.target.files[0];

    if (avatar) {
      if (avatar.type.startsWith("image/") && !avatar.type.includes("gif")) {
        toast.promise(
          uploadAvatar(avatar, userId).then(async (uploadedAvatarUrl) => {
            if (uploadedAvatarUrl) {
              const urlWithTimestamp = `${uploadedAvatarUrl}?t=${new Date().getTime()}`;
              setAvatarUrl(urlWithTimestamp); // Update avatar preview

              const { error } = await updateUserProfile({
                metadata: { avatar: urlWithTimestamp },
              });

              if (error) {
                throw new Error(error.message);
              }

              await refreshSession();
              return "Your avatar is updated successfully!";
            } else {
              throw new Error("Avatar upload failed.");
            }
          }),
          {
            loading: "Uploading avatar...",
            success: (message) => message,
            error: (err) => err.message || "Could not update avatar.",
          }
        );
      } else {
        toast.error(
          "Please select a valid image file (JPEG, PNG, JPG). GIFs are not allowed."
        );
      }
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  // Handle the email change functionality
  const submitEmailChange = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(newEmail);

    if (!isEmailValid) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (newEmail === session?.email) {
      toast.error("You are already using this email !");
      return;
    }

    toast.promise(
      updateUserProfile({ email: newEmail }).then(async (result) => {
        const { error } = result;
        if (error) {
          throw new Error(error.message);
        } else {
          return "Email updated successfully! We've sent a confirmation link to your current and new email address ! ";
        }
      }),
      {
        loading: "Updating email...",
        success: (message) => message,
        error: (err) => err.message || "Could not update email.",
      }
    );
  };

  // Handle input validations
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      // Update the user's password
      toast.promise(
        updateUserProfile({ password: values.password }).then(
          async (result) => {
            const { error } = result;
            if (error) {
              throw new Error(error.message);
            } else {
              logoutUser();
              router.push("/login");
              return "Your password has been updated successfully! You will be logged out for security reasons. Please log in with your new password.";
            }
          }
        ),
        {
          loading: "Updating password...",
          success: (message) => message,
          error: (err) => err.message || "Could not update password.",
        }
      );
    },
  });

  return (
    <div className="text-accent" data-theme="cupcake">
      <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
        <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10"> 
          <div className="relative my-4 w-56 sm:hidden">
            <input
              className="peer hidden"
              type="checkbox"
              name="select-1"
              id="select-1"
            />
            <label
              htmlFor="select-1"
              className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
            >
              Account{" "}
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                Account
              </li>
              <li className=" cursor-pointer px-3 py-2 text-sm  text-slate-600 hover:bg-blue-700 hover:text-white">
                Order History
                <span className="indicator-item indicator-middle badge ml-1 font-medium badge-accent text-white">
                  Coming Soon
                </span>
              </li>
            </ul>
          </div>
          <div className="col-span-2 hidden sm:block">
            <ul>
              <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">
                Account
              </li>
              <li className="indicator mt-5 cursor-pointer border-l-2 border-transparent text-black px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                <span className="indicator-item indicator-center indicator-end badge ml-2   font-medium badge-accent text-white animate-pulse">
                  Coming Soon
                </span>
                Order History
              </li>
            </ul>
          </div>
          <div className="col-span-8 overflow-hidden py-4 rounded-xl border  sm:px-8 sm:shadow">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
            </div>
            <hr className="mt-4 mb-8" />
            <div className="grid max-w-2xl  my-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                {loading ? (
                  <div className="skeleton object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-orange-500"></div>
                ) : (
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-orange-500 "
                    src={avatarUrl}
                    alt="avatar"
                  />
                )}

                <div className="flex flex-col space-y-5 sm:ml-8">
                  <input
                    type="file"
                    id="avatar-input"
                    className="hidden"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={handleAvatarChange}
                  />
                  <button
                    onClick={() =>
                      document.getElementById("avatar-input").click()
                    }
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                  >
                    Change avatar
                  </button>
                </div>
              </div>
            </div>
            <p className="py-2 text-xl font-semibold">Email Address</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <label htmlFor="change-email">
                  <span className="text-sm text-gray-500">Current Email</span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="text"
                      id="change-email"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder={session?.email}
                      disabled
                    />
                  </div>
                </label>
                <label htmlFor="change-email-new">
                  <span className="text-sm text-gray-500">New Email</span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      onChange={handleEmailChange}
                      type="text"
                      id="change-email-new"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Your new email"
                    />
                  </div>
                </label>
              </div>
            </div>
            <button
              onClick={submitEmailChange}
              className=" mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Save Email
            </button>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Password</p>
            <div className="flex items-center">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <label htmlFor="password">
                  <span className="text-sm text-gray-500">New Password</span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type={passwordType}
                      id="password"
                      name="password"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="***********"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </label>
                <label htmlFor="confirmPassword">
                  <span className="text-sm text-gray-500">
                    Confirm Password
                  </span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type={passwordType}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="***********"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                  </div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </label>
              </div>
              <button
                onClick={handlePasswordType}
                className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Save Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
