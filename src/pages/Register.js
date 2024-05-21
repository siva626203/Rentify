import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
function Register() {
  const navigate=useNavigate()
  const [user, setUser] = useState({
    email: String,
    firstname: String,
    lastname: String,
    phonenumber: String,
    type: String,
    password: String,
  });
  const Submit=async(e)=>{
  e.preventDefault(); 
        await axios.post("/user/create",user)
        .then((res)=>{
          console.log(res.data)
          navigate('/login')
          toast.success(res.data.message)
        }).catch((error)=>{
          console.log(error);
          toast.error(error.response.data.message);
        })      
  }
  return (
    <div>
      <ToastContainer/>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={Submit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="siva"
                    required
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        firstname: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="kumar"
                    required
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        lastname: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    for="number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone-input"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="+91 XXXXXXXXXX"
                    pattern="[6-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}"
                    required
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        phonenumber: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    for="default"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Default select
                  </label>
                  <select
                    id="default"
                    name="usertype"
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    required
                    class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" selected>
                      Choose a Type
                    </option>
                    <option value="seller">Seller</option>
                    <option value="buyer">Buyer</option>
                  </select>
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    minLength={6}
                    maxLength={10}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register