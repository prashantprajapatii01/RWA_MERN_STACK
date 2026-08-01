import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"

export default function About() {

    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSetting())
    }, [])

    useEffect(() => {
        if (SettingStateData.length) {
            let data = SettingStateData[0]
            setSettingData({
                siteName: data.siteName ? data.siteName : settingData.siteName,
            })
        }
    }, [SettingStateData])

    return (
        <>
            <section className="about">
                <div className="container">
                    <div className="about-section">
                        <div className="row align-items-center gy-5">

                            {/* Image */}
                            <div className="col-lg-6">
                                <div className="about-img" data-aos="fade-right">
                                    <img src="/images/banner5.png" alt="RWA" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="col-lg-6">
                                <div className="about-content" data-aos="fade-up">

                                    <h3 className="about-title">
                                        About {settingData.siteName}
                                    </h3>

                                    <p className="about-info">
                                        {settingData.siteName} is a modern Resident Welfare Association (RWA) platform designed to simplify and digitize society management. 
                                        Our goal is to improve communication, transparency, and efficiency within residential communities by providing a centralized system for residents, admins, and committees.
                                    </p>

                                    <div className="about-list">
                                        <ul>

                                            <li>
                                                <span>✔</span>
                                                <p>Manage resident directory with complete details of owners and tenants.</p>
                                            </li>

                                            <li>
                                                <span>✔</span>
                                                <p>Easy complaint management system for residents with status tracking.</p>
                                            </li>

                                            <li>
                                                <span>✔</span>
                                                <p>Post and manage community notices and announcements.</p>
                                            </li>

                                            <li>
                                                <span>✔</span>
                                                <p>Secure and role-based access for Admins, Residents, and Staff.</p>
                                            </li>

                                            <li>
                                                <span>✔</span>
                                                <p>Maintain transparency in society operations and activities.</p>
                                            </li>

                                            <li>
                                                <span>✔</span>
                                                <p>Improve communication between residents and management committee.</p>
                                            </li>

                                        </ul>
                                    </div>

                                    <Link to="/contactus" className="shop-btn w-100">
                                        Contact Society Office
                                    </Link>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
