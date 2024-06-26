import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalDelete } from "../../../slices/shift/shiftSlice";
import { useClickOutside } from "../../../sharedCustomHooks/useClickOutside";
import { AppDispatch, RootState } from "../../../store/store";
import { resetState } from "../../../slices/zones/zonesSlice";
import { useShift } from "./useShift";

const ModalDeleteShift: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { id_shiftToDelete } = useSelector((state: RootState) => state.shift);
  const { handleDeleteShift } = useShift();

  useClickOutside(modalRef, () => {
    dispatch(toggleModalDelete(null));
  });

  const handleCloseModal = () => {
    dispatch(toggleModalDelete(null));
  };

  const handleDelete = () => {
    handleCloseModal();
    if (id_shiftToDelete) {
      handleDeleteShift(id_shiftToDelete);
    }
    dispatch(resetState());
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
      <div ref={modalRef} className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delete shift
            </h3>
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
            <p>Are you sure you want to delete?</p>
            <div className="flex items-center justify-end pt-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleCloseModal}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-white bg-orange-600 hover:bg-orange-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteShift;
