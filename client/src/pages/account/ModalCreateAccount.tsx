import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { resetState, toggleModal } from "../../slices/account/accountSlice";
import { useAccount } from "./useAccount";

export const ModalCreateAccount: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    nameError,
    emailError,
    submitCreateAdmin,
    handleInputChange,
    localFormInputs,
  } = useAccount();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch(toggleModal());
        dispatch(resetState());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, dispatch]);

  const handleCloseModal = () => {
    dispatch(toggleModal());
    dispatch(resetState());
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
      <div ref={modalRef} className="relative max-w-[500px] w-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3>Create account</h3>
            <button
              onClick={handleCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form onSubmit={submitCreateAdmin}>
              <div className="mb-2 flex flex-col items-start">
                <label
                  htmlFor="name"
                  className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
                >
                  Name
                </label>
                <input
                  onChange={handleInputChange}
                  value={localFormInputs.name}
                  type="text"
                  id="name"
                  className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
                  required
                  maxLength={27}
                />
              </div>
              {nameError && (
                <p className="text-xs text-right text-red-500 my-1">
                  {nameError}
                </p>
              )}
              <div className="mb-2 flex flex-col items-start">
                <label
                  htmlFor="email"
                  className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
                >
                  Email
                </label>
                <input
                  onChange={handleInputChange}
                  value={localFormInputs.email}
                  type="email"
                  id="email"
                  className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
                  required
                />
                {emailError && (
                  <p className="text-xs text-right text-red-500 my-1">
                    {emailError}
                  </p>
                )}
              </div>
              <div className="mb-2 flex flex-col items-start">
                <label
                  htmlFor="password"
                  className="block sm:text-sm text-xs text-left my-auto mr-2 font-medium text-gray-600 sm:w-[40%]"
                >
                  Password
                </label>
                <input
                  onChange={handleInputChange}
                  value={localFormInputs.password}
                  type="password"
                  id="password"
                  className="mt-1 p-2 border rounded-md text-xs w-[100%] focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center justify-end pt-4 space-x-2 rounded-b dark:border-gray-600">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-orange-600 hover:bg-orange-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
