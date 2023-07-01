import React, { useEffect } from 'react'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wrapper from './layouts/Wrapper';
import ForgotPassword from './pages/ForgotPassword';

// Toaster css 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // checking while component is being mounted weather it is auth check or not
    if (location.pathname === "" || location.pathname === "/") {
      navigate("/login");
    } else if (!localStorage.getItem('isValid')) {
      navigate("/login");
    }
  }, []);

  const gotoLogin = () => {
    return (
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    );
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      {
        location.pathname === "" || location.pathname === "/login" || location.pathname === "/forgotpassword" || location.pathname === "/"
          ?
          gotoLogin()
          :
          <Wrapper />
      }
    </>
  );
}

export default App