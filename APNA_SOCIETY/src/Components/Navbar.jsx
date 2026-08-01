import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getNotice } from "../Redux/ActionCreators/NoticeActionCreators"
import { getComplaint } from "../Redux/ActionCreators/ComplaintActionCreators"
import { getResident } from "../Redux/ActionCreators/ResidentActionCreators"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Navbar() {
  let [settingData, setSettingData] = useState({
    logoTop: import.meta.env.VITE_APP_LOGO_TOP,
    map1: import.meta.env.VITE_APP_MAP1,
    address: import.meta.env.VITE_APP_ADDRESS,
    email: import.meta.env.VITE_APP_EMAIL,
    phone: import.meta.env.VITE_APP_PHONE,
    whatsapp: import.meta.env.VITE_APP_WHATSAPP,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    linkedin: import.meta.env.VITE_APP_LINKEDIN,
    instagram: import.meta.env.VITE_APP_INSTAGRAM,
    youtube: import.meta.env.VITE_APP_YOUTUBE
  })
  let [data, setData] = useState([])
  let [subtotal, setSubtotal] = useState(0)

  
  let navigate = useNavigate()

  let NoticeStateData = useSelector((state) => state.NoticeStateData)
  let ComplaintStateData = useSelector((state) => state.ComplaintStateData)
  let ResidentStateData = useSelector((state) => state.ResidentStateData)

  let SettingStateData = useSelector(state => state.SettingStateData)

  let dispatch = useDispatch()

  
  let [showDropDown, setShowDropDown] = useState(false)

  function logout() {
    localStorage.clear()
    navigate("/login")
  }

  function deleteRecord(id) {
    if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
      dispatch(deleteCart({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  function calculate(cart) {
    let total = 0
    cart.forEach(x => total = total + x.total)
    setSubtotal(total)
  }

  useEffect(() => {
    (() => dispatch(getNotice()))()
  }, [NoticeStateData.length])

  useEffect(() => {
    (() => dispatch(getComplaint()))()
  }, [ComplaintStateData.length])

  useEffect(() => {
    (() => dispatch(getResident()))()
  }, [ResidentStateData.length])



  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        let data = SettingStateData[0]
        setSettingData({
          logoTop: data.logoTop ? import.meta.env.VITE_APP_IMAGE_SERVER + data.logoTop : settingData.logoTop,
          map1: data.map1 ? data.map1 : settingData.map1,
          address: data.address ? data.address : settingData.address,
          email: data.email ? data.email : settingData.email,
          phone: data.phone ? data.phone : settingData.phone,
          whatsapp: data.whatsapp ? data.whatsapp : settingData.whatsapp,
          facebook: data.facebook ? data.facebook : settingData.facebook,
          twitter: data.twitter ? data.twitter : settingData.twitter,
          linkedin: data.linkedin ? data.linkedin : settingData.linkedin,
          instagram: data.instagram ? data.instagram : settingData.instagram,
          youtube: data.youtube ? data.youtube : settingData.youtube,
        })
      }
    })()
  }, [SettingStateData.length])

  //    for protected route of complaint and resident in navbar

  function handleProtectedRoute(path) {
    const isLogin = localStorage.getItem("login")
    const role = localStorage.getItem("role")

    if (!isLogin) {
      toast.error("Please login first 🚫")
      navigate("/login")
      return
    }

    if (["Super Admin", "Admin", "user"].includes(role)) {
      navigate(path)
    } else {
      toast.warning("Access Denied ⚠️")
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <header id="header" className="header">
        <div className="header-top-section">
          <div className="container">
            <div className="header-top">
              <div className="header-contact">
                <Link to={settingData.facebook} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-facebook fs-2'></i></span></Link>
                <Link to={settingData.twitter} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-twitter fs-2'></i></span></Link>
                <Link to={settingData.linkedin} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-linkedin fs-2'></i></span></Link>
                <Link to={settingData.instagram} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-instagram fs-2'></i></span></Link>
                <Link to={settingData.youtube} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-youtube fs-2'></i></span></Link>
              </div>
              <div className="header-contact">
                <Link to={settingData.map1} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-geo-alt fs-2 me-2'></i><span className='d-none d-lg-inline-block'>{settingData.address}</span></span></Link>
                <Link to={`mailto:${settingData.email}`} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-envelope fs-2 me-2'></i><span className='d-none d-lg-inline-block'>{settingData.email}</span></span></Link>
                <Link to={`tel:${settingData.phone}`} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-phone fs-2 me-2'></i><span className='d-none d-lg-inline-block'>{settingData.phone}</span></span></Link>
                <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank' rel='noreferrer'><span className="contact-number me-4"><i className='bi bi-whatsapp fs-2 me-2'></i><span className='d-none d-lg-inline-block'>{settingData.whatsapp}</span></span></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header-center-section d-none d-lg-block">
          <div className="container me-5">
            <div className="header-center">
              <div className="logo">
                <Link to="/">
                  <img src="../../assets/images/homepage-one/logo.png" style={{ height: 70 }} alt="logo" />
                </Link>
              </div>
              <div className="header-cart-items">
                

                <div className="header-user me-3">
                  <Link to="/profile">
                    <span>
                      <i className='bi bi-person fs-1'></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="mobile-menu d-block d-lg-none">
          <div className="mobile-menu-header d-flex justify-content-between align-items-center">
            <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions">
              <i className='bi bi-list' style={{ fontSize: "30px" }}></i>
            </button>
            <Link to="/" className="mobile-header-logo">
              <img src="../../assets/images/homepage-one/logo.png" style={{ height: 60 }} alt="logo" />
            </Link>


          </div>

          <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions">

            <div className="offcanvas-body">
              <div className="header-top">
                <div className="header-cart ">
                  <div className="header-compaire">

                  </div>
                </div>

              </div>

              <div className="header-top">
                <div className="header-contact">
                  <Link className='contact-number d-block' to="/">Home</Link>
                  <Link className='contact-number d-block' to="/about">About</Link>


                  <Link className='contact-number d-block' to="/features">Features</Link>
                  <Link className='contact-number d-block' to="/user/complaints">My Complaints</Link>
                  <Link className='contact-number d-block' to="/faq">Faq</Link>
                  <Link className='contact-number d-block' to="/testimonial">Testimonials</Link>
                  <Link className='contact-number d-block' to="/contactus">Contact</Link>
                  {/* {localStorage.getItem("login") ? <Link className='contact-number d-block' to="/profile">Profile</Link> : null}
                  {localStorage.getItem("login") && localStorage.getItem("role") !== "Admin" ?  <Link className='contact-number d-block' to="/admin">Admin Dasboard</Link> : null}
                  {localStorage.getItem("login") ? <button className='contact-number d-block' onClick={logout}>Logout</button> : <Link className='contact-number d-block' to="/login">Login</Link>} */}
               {localStorage.getItem("login") && (
  <Link className='contact-number d-block' to="/profile">
    Profile
  </Link>
)}

{
  localStorage.getItem("login") &&
  ["Admin", "Super Admin"].includes(localStorage.getItem("role")) && (
    <Link className='contact-number d-block' to="/admin">
      Admin Dashboard
    </Link>
  )
}

{
  localStorage.getItem("login")
    ? <button className='contact-number d-block' onClick={logout}>Logout</button>
    : <Link className='contact-number d-block' to="/login">Login</Link>
}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="header-bottom d-lg-block d-none">
          <div className="container">
            <div className="header-nav">
              <div className="category-menu-section position-relative">
                {/* <div className={`empty position-fixed ${showDropDown ? 'active' : ''}`} onClick={() => setShowDropDown(!showDropDown)}></div> */}
                {/* <button className="dropdown-btn" onClick={() => setShowDropDown(!showDropDown)}>
                  <span className="dropdown-icon">
                    <i className={`bi ${showDropDown ? 'bi-x' : 'bi-list'} fs-1 text-light`}></i>
                  </span>
                  <span className="list-text">
              APNA SOCIETY
                  </span>
                </button> */}
                <span className='sitename text-light'>APNA SOCIETY</span> <i className="bi bi-house text-light fs-1"></i>
              </div>
              <div className="header-nav-menu me-5">
                <ul className="menu-list me-5">
                  <li>
                    <Link to="/">
                      <span className="list-text">Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <span className="list-text">About</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/features">
                      <span className="list-text">Features</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/admin/resident">
                      <span className="list-text">Residents</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/complaints">
                      <span className="list-text">Complaints</span>
                    </Link>
                  </li> */}
{/* 
                  <li>
                    <span
                      className="list-text"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProtectedRoute("/admin/residents")}
                    >
                      Residents
                    </span>
                  </li> */}

                  <li>
                    <span
                      className="list-text"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProtectedRoute("/user/complaints")}
                    >
                      Complaints
                    </span>
                  </li>
                    {/* <li>
                    <Link to="/userdashboard">
                      <span className="list-text">Dashboard</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/testimonial">
                      <span className="list-text">Testimonals</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq">
                      <span className="list-text">Faq</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contactus">
                      <span className="list-text">Contact Us</span>
                    </Link>
                  </li>
                  {
                    localStorage.getItem("login") && !window.location.pathname.includes("/admin") ?
                      <li>
                        <Link to="/profile">
                          <span className="list-text">{localStorage.getItem("name")}</span>
                        </Link>
                        <ul className="header-sub-menu">
                          <li><Link to="/profile">Profile</Link></li>
                         {["Super Admin", "Admin"].includes(localStorage.getItem("role")) ? (
  <li>
    <Link to="/admin">Admin Dashboard</Link>
  </li>
) : null}
                          <li><button className='fs-3' onClick={logout}>Logout</button></li>
                        </ul>
                      </li> :
                      localStorage.getItem("login") ?
                        <li>
                          <button onClick={logout} className="list-text">Logout</button>
                        </li> :
                        <li>
                          <Link to="/login">
                            <span className="list-text">Login</span>
                          </Link>
                        </li>
                  }
                </ul>
              </div>
              {/* <div className="header-vendor-btn">
                <a href="become-vendor.html" className="shop-btn">
                  <span className="list-text shop-text">Became Vendor</span>
                  <span className="icon">
                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.257 7.07205C20.038 7.07205 19.8474 7.07205 19.6563 7.07205C17.4825 7.07205 15.3086 7.07205 13.1352 7.07205C10.1545 7.07205 7.17336 7.0725 4.19265 7.0725C3.30392 7.0725 2.41519 7.07024 1.52646 7.07295C1.12124 7.07431 0.809811 7.25265 0.625785 7.62651C0.43866 8.00623 0.488204 8.37556 0.737704 8.70426C0.932347 8.96027 1.20529 9.08173 1.52867 9.08037C2.20948 9.07766 2.8903 9.07902 3.57111 9.07902C5.95285 9.07902 8.33415 9.07902 10.7159 9.07902C13.782 9.07902 16.8485 9.07902 19.9146 9.07902C20.0274 9.07902 20.1398 9.07902 20.2822 9.07902C20.1871 9.18332 20.1141 9.26865 20.0358 9.34857C19.5656 9.82672 19.0922 10.3022 18.6229 10.7812C18.1363 11.2779 17.6541 11.7791 17.1675 12.2757C16.4942 12.9634 15.8116 13.6415 15.1476 14.3391C14.9096 14.5893 14.8455 14.9157 14.9406 15.2575C15.156 16.0305 16.0567 16.2499 16.6119 15.6769C17.4342 14.8286 18.2655 13.9892 19.0927 13.1458C19.6948 12.5317 20.2968 11.9172 20.8985 11.3023C21.5952 10.5902 22.2911 9.87729 22.9878 9.1648C23.1059 9.04425 23.2249 8.9246 23.3435 8.8045C23.6903 8.45367 23.7239 7.84278 23.3943 7.4766C22.998 7.03683 22.5852 6.61241 22.1756 6.18573C21.7965 5.79066 21.4134 5.39965 21.0303 5.00909C20.6733 4.64473 20.3132 4.28306 19.9553 3.91915C19.6147 3.57284 19.2754 3.22563 18.9356 2.87887C18.5154 2.44948 18.0951 2.01964 17.6744 1.5907C17.2511 1.15861 16.8198 0.734188 16.4057 0.29261C16.0363 -0.101559 15.3697 -0.0816927 15.0344 0.257392C14.6238 0.672782 14.5999 1.26381 14.995 1.68552C15.3378 2.0517 15.6957 2.40342 16.0465 2.76192C16.929 3.66449 17.8111 4.56797 18.6937 5.47054C19.1829 5.97081 19.6735 6.47018 20.1632 6.97046C20.1885 6.99574 20.2123 7.02329 20.257 7.07205Z" />
                    </svg>
                  </span>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
