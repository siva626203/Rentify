import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout}from '../store/Slice/UsersSlice'
function Header(state) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  return (
    <>
      <div class="max-w-2xl mx-auto">
        <nav class="border-gray-200">
          <div class="container mx-auto flex flex-wrap items-center justify-between">
            <Link to={"/"} class="flex">
              <span class="self-center text-lg font-semibold whitespace-nowrap">
                Rentify
              </span>
            </Link>
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              class="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div class="md:block w-full md:w-auto" id="mobile-menu">
              <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link
                    to={"/"}
                    class="bg-blue-700 md:bg-transparent text-black block pl-3 pr-4 py-2 md:p-0 rounded focus:outline-none"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>

                {state?.user?.type == "seller" ||
                state?.user?.type == "buyer" ? null : (
                  <>
                    <li>
                      <Link
                        to={"/register"}
                        class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/login"}
                        class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}

                {state?.user?.type === "seller" ? (
                  <>
                    <li>
                      <Link
                        to={"/properties"}
                        class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                      >
                        Your Properties
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/profile/addproduct"}
                        class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                      >
                        Add Property
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={(e) => {
                          dispatch(logout());
                          navigate("/");
                        }}
                        class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                      >
                        logout
                      </button>
                    </li>
                  </>
                ) : null}
                {state?.user?.type==="buyer" ? (
                  <li>
                    <button
                      onClick={(e) => {
                        dispatch(logout());
                        navigate("/");
                      }}
                      class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                    >
                      logout
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <script src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></script>
    </>
  );
}

export default Header