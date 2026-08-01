import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import FeaturesPage from './Pages/FeaturesPage'

import TestimonialPage from './Pages/TestimonialPage'
import FaqPage from './Pages/FaqPage'
import ContactUsPage from './Pages/ContactUsPage'
import Error404Page from './Pages/Error404Page'
import PrivacyPolicyPage from './Pages/Policies/PrivacyPolicyPage'
import TermsAndConditions from './Pages/Policies/TermsAndConditions'

import SignupPage from './Pages/User/SignupPage'
import LoginPage from './Pages/User/LoginPage'
import ProfilePage from './Pages/User/ProfilePage'


import AdminHomePage from './Pages/Admin/AdminHomePage'

import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminCreateFeaturePage from './Pages/Admin/Feature/AdminCreateFeaturePage'
import AdminUpdateFeaturePage from './Pages/Admin/Feature/AdminUpdateFeaturePage'

import AdminFaqPage from './Pages/Admin/Faq/AdminFaqPage'
import AdminCreateFaqPage from './Pages/Admin/Faq/AdminCreateFaqPage'
import AdminUpdateFaqPage from './Pages/Admin/Faq/AdminUpdateFaqPage'

import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'


import AdminNewsletterPage from './Pages/Admin/Newsletter/AdminNewsletterPage'

import AdminContactUsPage from './Pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './Pages/Admin/ContactUs/AdminContactUsShowPage'



import AdminNoticePage from './Pages/Admin/Notice/AdminNoticePage'
import AdminCreateNoticePage from './Pages/Admin/Notice/AdminCreateNoticePage'
import AdminUpdateNoticePage from './Pages/Admin/Notice/AdminUpdateNoticePage'

import AdminComplaintPage from './Pages/Admin/Complaint/AdminComplaintPage'
import AdminCreateComplaintPage from './Pages/Admin/Complaint/AdminCreateComplaintPage'
import AdminUpdateComplaintPage from './Pages/Admin/Complaint/AdminUpdateComplaintPage'
import UserComplaintPage from './Pages/User/UserComplaintPage'




import AdminCreateEventsPage from './Pages/Admin/Events/AdminCreateEventsPage'
import AdminUpdateEventsPage from './Pages/Admin/Events/AdminUpdateEventsPage'
import AdminEventsPage from './Pages/Admin/Events/AdminMainEventsPage'
import AdminResidentPage from './Pages/Admin/Resident/AdminResidentPage'
import AdminCreateResidentPage from './Pages/Admin/Resident/AdminCreateResidentPage'
import AdminUpdateResidentPage from './Pages/Admin/Resident/AdminUpdateResidentPage'
import JoinEvent from './Pages/User/JoinEvent'
import UserCreateComplaintPage from './Pages/User/UserCreateComplaintPage'
import UserUpdateComplaintPage from './Pages/User/UserUpdateComplaintPage'
import AdminUserPage from './Pages/Admin/User/AdminUserPage'
import AdminCreateUserPage from './Pages/Admin/User/AdminCreateUserPage'
import AdminUpdateUserPage from './Pages/Admin/User/AdminUpdateUserPage'




export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />

                <Route path='/features' element={<FeaturesPage />} />


                <Route path='/testimonial' element={<TestimonialPage />} />
                <Route path='/faq' element={<FaqPage />} />
                <Route path='/contactus' element={<ContactUsPage />} />
                <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
                <Route path="/join-event" element={<JoinEvent />} />
                <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
                <Route path='/terms-conditions' element={<TermsAndConditions />} />

                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />

                {/* User Routes */}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path='/profile' element={<ProfilePage />} />

                        </> : null
                }


                {/* Admin Routes */}

                <>
                    <Route path='/admin' element={<AdminHomePage />} />

                    <Route path='/admin/notice' element={<AdminNoticePage />} />
                    <Route path='/admin/notice/create' element={<AdminCreateNoticePage />} />
                    <Route path='/admin/notice/update/:id' element={<AdminUpdateNoticePage />} />

                    <Route path='/admin/events' element={<AdminEventsPage />} />
                    <Route path='/admin/events/create' element={<AdminCreateEventsPage />} />
                    <Route path='/admin/events/update/:id' element={<AdminUpdateEventsPage />} />

                    <Route path='/user/complaints' element={<UserComplaintPage />} />
                    <Route path='/user/complaints/create' element={<UserCreateComplaintPage />} />
                    <Route path='/user/complaints/update/:id' element={<UserUpdateComplaintPage />} />

                    <Route path='/admin/complaints' element={<AdminComplaintPage />} />
                    <Route path='/admin/complaints/create' element={<AdminCreateComplaintPage />} />
                    <Route path='/admin/complaints/update/:id' element={<AdminUpdateComplaintPage />} />

                    <Route path='/admin/residents' element={<AdminResidentPage />} />
                    <Route path='/admin/residents/create' element={<AdminCreateResidentPage />} />
                    <Route path='/admin/residents/update/:id' element={<AdminUpdateResidentPage />} />

                    <Route path='/admin/feature' element={<AdminFeaturePage />} />
                    <Route path='/admin/feature/create' element={<AdminCreateFeaturePage />} />
                    <Route path='/admin/feature/update/:id' element={<AdminUpdateFeaturePage />} />

                    <Route path='/admin/faq' element={<AdminFaqPage />} />
                    <Route path='/admin/faq/create' element={<AdminCreateFaqPage />} />
                    <Route path='/admin/faq/update/:id' element={<AdminUpdateFaqPage />} />

                    <Route path='/admin/setting' element={<AdminSettingPage />} />



                    <Route path='/admin/newsletter' element={<AdminNewsletterPage />} />

                    <Route path='/admin/contactus' element={<AdminContactUsPage />} />
                    <Route path='/admin/contactus/show/:id' element={<AdminContactUsShowPage />} />




                    <Route path='/admin/user' element={<AdminUserPage />} />
                    <Route path='/admin/user/create' element={<AdminCreateUserPage />} />
                    <Route path='/admin/user/update/:id' element={<AdminUpdateUserPage/>} />


                </>


                <Route path='/*' element={<Error404Page />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
