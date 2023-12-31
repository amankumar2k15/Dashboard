import React from 'react'

const LeftPage = () => {
    return (
        <>
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
        </>
    )
}

export default LeftPage