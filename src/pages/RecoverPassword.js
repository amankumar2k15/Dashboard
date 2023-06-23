import React from "react";
import { Link } from 'react-router-dom';

const RecoverPassword = () => {


    return (
        <>
            <body className="auth-body-bg">
                <div>
                    <div className="container-fluid p-0">
                        <div className="row g-0">
                            <div className="col-xl-4 m-auto">
                                <div className="auth-full-page-content p-md-5 p-4">
                                    <div className="w-100">

                                        <div className="d-flex flex-column h-100">
                                            <div className="mb-4 mb-md-5">

                                                <img src="assets/images/logo-dark.png" alt="" height="18" className="auth-logo-dark" />
                                                <img src="assets/images/logo-light.png" alt="" height="18" className="auth-logo-light" />

                                            </div>
                                            <div className="my-auto">

                                                <div>
                                                    <h5 className="text-primary"> Reset Password</h5>
                                                    <p className="text-muted">Reset Password with Skote.</p>
                                                </div>

                                                <div className="mt-4">
                                                    <div className="alert alert-success text-center mb-4" role="alert">
                                                        Enter your Email and instructions will be sent to you!
                                                    </div>
                                                    <form action="https://themesbrand.com/skote/layouts/index.html">

                                                        <div className="mb-3">
                                                            <label htmlFor="useremail" className="form-label">Email</label>
                                                            <input type="email" className="form-control" id="useremail" placeholder="Enter email" />
                                                        </div>

                                                        <div className="text-end">
                                                            <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Reset</button>
                                                        </div>

                                                    </form>
                                                    <div className="mt-5 text-center">
                                                        <p>Login <Link to="/login" href="auth-login-2.html" className="fw-medium text-primary"> Back to login</Link> </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 mt-md-5 text-center">
                                                <p className="mb-0">© <script>document.write(new Date().getFullYear())</script> Skote. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </body>
        </>
    )
};
export default RecoverPassword;