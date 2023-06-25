import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Toast from "../common/Toast"
import axios from 'axios';
import emailjs from 'emailjs-com';
import { SERVER_URL } from '../constants';

const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [fetchEmail, setFetchEmail] = useState(null)
    const [generateOtp, setGenerateOtp] = useState(null)
    const [changePassScreen, setChangePassScreen] = useState(false);
    const [isLoding, setLoding] = useState(false);
    const [changePaswordData, setChangePasswordData] = useState({
        otp: null,
        newPassword: null,
        confirmPassword: null
    })
    const navigate = useNavigate()

    // Email.js
    const USER_ID = "V7MAXBMie3CQ9wRFH";
    const TEMPLATE_ID = "template_0ucfef8";
    const SERVICE_ID = "amankumar2k15"
    // email.js ends

    const sendOtpToMail = (randomOtp) => {
        let data = {
            otp: randomOtp,
            from_name: "Todo App",
            to_name: "Aman",
            to_email: "aman.kumar2k15@gmail.com"
        };
        emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
            function (response) {
                if (response.status == 200) {
                    setChangePassScreen(true)
                }
                console.log(response.status, response.text);
            },
            function (err) {
                console.log(err);
            }
        );
    }


    const sendOTP = (e) => {
        e.preventDefault();
        setLoding(true)
        console.log(fetchEmail)
        if (fetchEmail === email) {
            let randomOtp = Math.ceil(Math.random(100) * 10000)
            setGenerateOtp(randomOtp)
            sendOtpToMail(randomOtp)

        } else {
            setLoding(false)
            Toast(true, "Email doesn't exist")
        }
    }

    const getUserData = () => {
        axios.get(`${SERVER_URL}/User`).then((res) => setFetchEmail(res.data[0].email)).catch((err) => console.log(err))
    }

    useEffect(() => {
        getUserData()
    }, [])



    const resetPassword = (e) => {
        let passwordVal = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@]).{8,}/
        if (changePaswordData.otp <= 0) Toast(true, "Please fill otp")
        else if (changePaswordData.otp != generateOtp) Toast(true, "Otp doesn't match")
        else if (changePaswordData.newPassword <= 0) Toast(true, "Please fill the password")
        else if (!changePaswordData.newPassword.match(passwordVal)) Toast(true, "Password must contain 8 letters, one uppercase, one lowercase and @ symbol")
        else if (changePaswordData.confirmPassword <= 0) Toast(true, "To proceed, please fill the confirm password")
        else if (changePaswordData.newPassword != changePaswordData.confirmPassword) Toast(true, "Password doesn't match")
        else {
            axios.patch(`${SERVER_URL}/User/1`, {
                password: changePaswordData.confirmPassword
            }).then((res) => {
                console.log(res)
                Toast(false, "Password successfully changed")
                navigate("/login")
            }).catch((err) => console.log(err))
        }
    }

    return (
        <div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-xl-9">
                        <div className="auth-full-bg pt-lg-5 p-4">
                            <div className="w-100">
                                <div className="bg-overlay"></div>
                                <div className="d-flex h-100 flex-column">
                                    <div className="p-4 mt-auto">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-7">
                                                <div className="text-center">

                                                    <h4 className="mb-3"><i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i><span className="text-primary">5k</span>+ Satisfied clients</h4>

                                                    <div dir="ltr">
                                                        <div className="owl-carousel owl-theme auth-review-carousel" id="auth-review-carousel">
                                                            <div className="item">
                                                                <div className="py-3">
                                                                    <p className="font-size-16 mb-4">" Fantastic theme with a ton of options. If you just want the HTML to integrate with your project, then this is the package. You can find the files in the 'dist' folder...no need to install git and all the other stuff the documentation talks about. "</p>

                                                                    <div>
                                                                        <h4 className="font-size-16 text-primary">Abs1981</h4>
                                                                        <p className="font-size-14 mb-0">- Skote User</p>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="item">
                                                                <div className="py-3">
                                                                    <p className="font-size-16 mb-4">" If Every Vendor on Envato are as supportive as Themesbrand, Development with be a nice experience. You guys are Wonderful. Keep us the good work. "</p>

                                                                    <div>
                                                                        <h4 className="font-size-16 text-primary">nezerious</h4>
                                                                        <p className="font-size-14 mb-0">- Skote User</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                            <h5 className="text-primary"> Reset Password</h5>
                                        </div>

                                        <div className="mt-2">
                                            <div className="alert alert-success text-center mb-4" role="alert">
                                                Enter your {changePassScreen ? "OTP" : "Email and instructions will be sent to you!"}
                                            </div>
                                            <form>
                                                {
                                                    changePassScreen && changePaswordData ?
                                                        (
                                                            <>
                                                                <div className="mb-2">
                                                                    <label htmlFor="useremail" className="form-label">Enter OTP</label>
                                                                    <input type="number" className="form-control" id="otp" placeholder="Enter OTP"
                                                                        onChange={(e) => setChangePasswordData((prev) => ({ ...prev, otp: parseInt(e.target.value) }))} />
                                                                </div>
                                                                <div className="mb-2">
                                                                    <label htmlFor="useremail" className="form-label">Password</label>
                                                                    <input type="email" className="form-control" id="password" placeholder="Password"
                                                                        onChange={(e) => setChangePasswordData((prev) => ({ ...prev, newPassword: e.target.value }))} />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="useremail" className="form-label">Confirm Password</label>
                                                                    <input type="email" className="form-control" id="cnfpass" placeholder="Confirm password"
                                                                        onChange={(e) => setChangePasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))} />
                                                                </div>
                                                            </>
                                                        )

                                                        :
                                                        (
                                                            <div className="mb-3">
                                                                <label htmlFor="useremail" className="form-label">Email</label>
                                                                <input type="email" className="form-control" id="useremail" placeholder="Enter email"
                                                                    onChange={(e) => setEmail(e.target.value)} />
                                                            </div>
                                                        )

                                                }



                                                <div className="text-end">
                                                    {
                                                        changePassScreen && changePassScreen ?
                                                            <button className="btn btn-primary w-md waves-effect waves-light" type="button" onClick={resetPassword}>Reset</button>
                                                            :
                                                            <button className="btn btn-primary w-md waves-effect waves-light " type="button" onClick={sendOTP}>{isLoding ? 'Loading...' : 'Send OTP'}</button>

                                                    }

                                                </div>

                                            </form>
                                            <div className="mt-5 text-center">
                                                <p>Remember It ? <Link to="/login" className="fw-medium text-primary"> Sign In here</Link> </p>
                                            </div>
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
}

export default ForgotPassword