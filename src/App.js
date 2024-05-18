import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router';
import Home from './pages/Home'
import Properties from './pages/Properties'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './pages/Register';
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Properties />} path="/properties"></Route>
        <Route element={<Profile />} path="/profile"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Register />} path="/register"></Route>
        <Route
          element={<h1 className="text-center">404 Not Found</h1>}
          path="*"
        ></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
