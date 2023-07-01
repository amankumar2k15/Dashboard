import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../common/Toast";
import axios from "axios";
import { SERVER_URL } from "../constants"
import LeftPage from "./LeftPage";

const Login = () => {
    const [userData, setUserData] = useState([])
    const [preview, setpreview] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    // console.log(navigate)

    const handleSubmit = () => {
        // console.log(userData)
        if (!credentials.username) {
            Toast(true, 'please enter username')
        } else if (!credentials.password) {
            Toast(true, 'Please enter password');
        } else if (credentials.username && credentials.password) {
            if (userData[0].username === credentials.username && userData[0].password === credentials.password) {
                localStorage.setItem("username", userData[0].username)
                localStorage.setItem("email", userData[0].email)
                localStorage.setItem("isValid", true)
                Toast(false, 'Log in successfully')
                navigate('/dashboard');
            } else {
                Toast(true, "Invalid Credentials")
            }
        }
    }

    const getUserData = () => {
        axios.get(`${SERVER_URL}/User`).then((res) => setUserData(res.data)).catch((err) => console.log(err))
    }
    useEffect(() => {
        getUserData()
    }, [])


    return (
        <div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <LeftPage />
                    <div className="col-xl-3">
                        <div className="auth-full-page-content p-md-5 p-4">
                            <div className="w-100">
                                <div className="d-flex flex-column h-100">
                                    <div className="mb-4 mb-md-5">
                                        <a href="index.html" className="d-block auth-logo">
                                            <img src="assets/images/logo-dark.png" alt="" height="18" className="auth-logo-dark" />
                                            <img src="assets/images/logo-light.png" alt="" height="18" className="auth-logo-light" />
                                        </a>
                                    </div>

                                    <div className="my-auto">
                                        <div>
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Zashed.</p>
                                        </div>

                                        <div className="mt-4">
                                            <form >

                                                <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">Username</label>
                                                    <input type="text" className="form-control" id="username" placeholder="Enter username"
                                                        value={credentials?.username}
                                                        onChange={(event) => setCredentials((prev) => ({ ...prev, username: event.target.value }))} />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link className="text-muted" to="/forgotpassword" >Forgot password?</Link>
                                                    </div>
                                                    <label className="form-label">Password</label>
                                                    <div className="input-group auth-pass-inputgroup">
                                                        <input type={preview ? "text" : "password"} className="form-control" placeholder="Enter password" aria-label="Password"
                                                            value={credentials?.password}
                                                            onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))} aria-describedby="password-addon" />

                                                        <button className="btn btn-light " type="button" id="password-addon"
                                                            onClick={() => setpreview(!preview)}>
                                                            {preview ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="remember-check" />
                                                    <label className="form-check-label" htmlFor="remember-check">
                                                        Remember me
                                                    </label>
                                                </div>

                                                <div className="mt-3 d-grid">
                                                    <button className="btn btn-primary waves-effect waves-light" type="button" onClick={handleSubmit}>Log In</button>
                                                </div>


                                            </form>

                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    )
};
export default Login;


