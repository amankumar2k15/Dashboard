import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from "../common/Toast";
import Logo from "../assets/images/zashedlogo.png"
import Avatar from "../assets/images/avatar-1.jpg"


const Header = ({ setSideBarToggle, sideBarToggle, }) => {
  const [profile, setprofile] = useState(false);
  const navigate = useNavigate();


  const LogOut = () => {
    Toast(false, "Logout successfully");
    localStorage.clear();
    navigate("/login")
  }
  const handleSideBarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  }


  return (
    <>
      <header id="page-topbar"  >
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box ">

              <span className="logo logo-dark">
                <span className="logo-sm">
                  <img src={Logo} alt="Logo" className='ms-1' height="40" width="50" />
                </span>
                <span className="logo-lg">
                  <img src={Logo} alt="Logo" height="80" width="100" />
                </span>
              </span>

            </div>
            <button type="button" onClick={handleSideBarToggle} className="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block">
              <button type="button" onClick={() => setprofile(!profile)} className={profile ? "btn header-item waves-effect show" : "btn header-item waves-effect"} id="page-header-user-dropdown"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className="rounded-circle header-profile-user" src={Avatar}
                  alt="Header Avatar" />
                <span className="d-none d-xl-inline-block ms-1" key="t-henry">{localStorage.getItem('username')?.toUpperCase()}</span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
              </button>

              <div className={profile ? "dropdown-menu dropdown-menu-end show drop-showing" : "dropdown-menu dropdown-menu-end"}>
                <label className="dropdown-item cursor-pointer" >
                  <i className="bx bxs-user font-size-16 align-middle me-1"></i>
                  <span key="t-profile"><Link to="/profile" onClick={() => setprofile(profile)}>Profile</Link></span>
                </label>
                <div className="dropdown-divider"></div>

                <button className='dropdown-item text-danger'
                  type='button'
                  onClick={LogOut}>
                  <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
                  <span key="t-logout">Logout</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;