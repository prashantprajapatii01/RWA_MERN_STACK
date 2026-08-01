import React, { useState } from 'react'
import FormValidators from '../../Validators/FormValidators'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        flatNo: "",
        block: "",
        residentType: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        username: "User Name Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "Password Field is Mendatory",
        flatNo: "Flat No Field is Mendatory",
        block: "Block Field is Mendatory",
        residentType: "Resident Type Field is Mendatory"
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
    }

    async function postData(e) {
    e.preventDefault()

    let error = Object.values(errorMessage).find(x => x !== "")

    if (error) {
        setShow(true)
    }
    else if (data.password !== data.cpassword) {
        setShow(true)
        setErrorMessage({
            ...errorMessage,
            password: 'Password And Confirm Password Does not Matched'
        })
    }
    else {
        try {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/auth/register`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    flatNo: data.flatNo,
                    block: data.block,
                    residentType: data.residentType
                })
            })

            let result = await response.json()

            if (response.ok) {
                navigate("/login")
            } else {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    username: result.message
                })
            }

        } catch (error) {
            console.log(error)
            setShow(true)
            setErrorMessage({
                ...errorMessage,
                username: "Server error"
            })
        }
    }
}
    return (
        <>
            <section className="login  footer-padding">
                <div className="container p-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-10 m-auto bg-light p-5 rounded my-5" style={{ marginTop: "100px !important" }}>
                            <h5 className="text-center mb-3">Create Your Free Account</h5>
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Name*</label>
                                        <input type="text" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Phone*</label>
                                        <input type="text" name="phone" onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
                                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>User Name*</label>
                                        <input type="text" name="username" onChange={getInputData} className={`form-control ${show && errorMessage.username ? 'border-danger' : 'myborder'}`} placeholder='User Name' />
                                        {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Email*</label>
                                        <input type="email" name="email" onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
                                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Flat No*</label>
                                        <input
                                            type="text"
                                            name="flatNo"
                                            onChange={getInputData}
                                            className={`form-control ${show && errorMessage.flatNo ? 'border-danger' : 'myborder'}`}
                                            placeholder='Flat Number'
                                        />
                                        {show && errorMessage.flatNo && <p className='text-danger'>{errorMessage.flatNo}</p>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Block*</label>
                                        <input
                                            type="text"
                                            name="block"
                                            onChange={getInputData}
                                            className={`form-control ${show && errorMessage.block ? 'border-danger' : 'myborder'}`}
                                            placeholder='Block (A, B, C...)'
                                        />
                                        {show && errorMessage.block && <p className='text-danger'>{errorMessage.block}</p>}
                                    </div>

                                    <div className="col-md-6 mb-3">
  <label>Resident Type*</label>
  <select
    name="residentType"
    onChange={getInputData}
    className={`form-select ${show && errorMessage.residentType ? 'border-danger' : 'myborder'}`}
  >
    <option value="">Select Type</option>
    <option value="Owner">Owner</option>
    <option value="Tenant">Tenant</option>
  </select>
  {show && errorMessage.residentType && <p className='text-danger'>{errorMessage.residentType}</p>}
</div>
                                    <div className="col-md-6 mb-3">
                                        <label>Password*</label>
                                        <input type="password" name="password" onChange={getInputData} className={`form-control ${show && errorMessage.password ? 'border-danger' : 'myborder'}`} placeholder='Enter Password' />
                                        {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Confirm Password*</label>
                                        <input type="password" name="cpassword" onChange={getInputData} className={`form-control ${show && errorMessage.password ? 'border-danger' : 'myborder'}`} placeholder='Enter Password' />
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button type='submit' className="btn btn-primary mybackground btn-lg rounded-pill p-3 my-3 w-50 border-0">Create an Account</button>
                                    <span className="shop-account d-block">Already have an account ?<Link to="/login">Log In</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
