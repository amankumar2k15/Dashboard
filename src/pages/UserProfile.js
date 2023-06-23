import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from "../assets/images/avatar-1.jpg"
import Toast from "../common/Toast";

const UserProfile = () => {
  const [editToggle, setEditToggle] = useState(false)
  const [userObj, setUserObj] = useState()
  const [editProfile, setEditProfile] = useState({
    name: null,
    username: null,
    email: null,
    password: null,
    post: null,
    company: null,
    contact: null,
    image: null,
    address: null,
  })

  const getUserData = () => {
    axios.get("http://localhost:3200/User").then((res) => {
      console.log(res.data[0])
      setUserObj(res.data[0])
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    getUserData()
  }, [])


  const handleSaveData = () => {
    axios.patch("http://localhost:3200/User/1", {
      username: editProfile.username ? editProfile.username : userObj.username,
      email: editProfile.email ? editProfile.email : userObj.email,
      contact: editProfile.contact,
      address: editProfile.address,
      password: editProfile.password ? editProfile.password : userObj.password,

    }).then((res) => {
      Toast(false, "Edit Successfully")
      setEditToggle(false)
      getUserData()
      // setEditProfile(null)
      console.log(res)
    }).catch((err) => console.log(err))
  }


  return (



    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Profile</h4>
                <div className='cursor-pointer'>
                  {editToggle ?
                    <>
                      <i className='bx bxs-user-x  p-2 h3' title='Cancel' onClick={() => setEditToggle(false)}></i>
                      <i className='bx bxs-user-check  h3' title='Save' onClick={handleSaveData}></i>
                    </>
                    :
                    <i className='bx bx-edit h3' onClick={() => setEditToggle(true)}></i>}
                </div>
              </div>
            </div>
          </div>

          {/* code Start here */}
          <section style={{ backgroundColor: 'inherit' }}>
            <div className="container py-5">


              <div className="row">
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      <img src={Avatar} alt="avatar"
                        className="rounded-circle img-fluid" style={{ width: '150px' }} />
                      <h5 className="my-3">Aman Kumar</h5>
                      <p className="text-muted mb-1">Fronte nd Developer</p>
                      <p className="text-muted mb-4">Sonipat (Haryana), INDIA</p>

                    </div>
                  </div>

                </div>
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {editToggle ?
                              <input className='form-control w-50'
                                onChange={(e) => setEditProfile((prev) => ({ ...prev, username: e.target.value }))}
                                defaultValue={userObj?.username} />
                              :
                              userObj?.username}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {editToggle ?
                              <input className='form-control w-50'
                                onChange={(e) => setEditProfile((prev) => ({ ...prev, email: e.target.value }))}
                                defaultValue={userObj?.email} />
                              :
                              userObj?.email}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Mobile</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">"(+91) 7357432123"</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">"Near Nav Durga Mandir, Kabirpur (Sonipat)</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Password</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {editToggle ?
                              <input className='form-control w-50'
                                onChange={(e) => setEditProfile((prev) => ({ ...prev, password: e.target.value }))}
                                defaultValue={userObj?.password} />
                              :
                              userObj?.password}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>

      </div>


    </div>
  )
}

export default UserProfile