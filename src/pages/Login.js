import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from 'react-redux';
import {login} from '../store/Slice/UsersSlice'
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router';
function Login() {
  const [user,setUser]=useState({email:String,password:String})
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const selector = useSelector((state) => state.user);
  const Submit = async (e) => {
    e.preventDefault();
    await axios
      .get("/user/login", {params:user})
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Invalid email") return toast.error(res.data.message)
          localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.data))
        toast.success(res.data.message);
        setTimeout(navigate("/properties"), 3000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  useEffect(()=>{
    console.log(selector)
  },[])
  return (
    <div>
      <ToastContainer/>
      <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Login
      </h1>
      <form class="max-w-sm mx-auto mt-10" onSubmit={Submit}>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setUser((prev) => ({ ...prev, email: e.target.value }));
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setUser((prev) => ({ ...prev, password: e.target.value }));
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login