import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { Route,Routes,Router } from 'react-router';
import Home from './pages/Home'
import Properties from './pages/Properties'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './pages/Register';
import axios from "axios";
import { useSelector } from 'react-redux';
import {useEffect}from 'react'
import AddProduct from './components/AddProduct';

function App() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/api"
      : "https://presidio-backend-52a0.onrender.com/api";
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  const selector = useSelector((state) => state.user);
  return (
    <div className="App">
      <Header user={selector} />

      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Properties />} path="/properties"></Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="addproduct" element={<AddProduct />} />
        </Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Register />} path="/register"></Route>
        <Route
          element={<h1 className="text-center">404 Not Found</h1>}
          path="*"
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
