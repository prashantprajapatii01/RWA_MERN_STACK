

import React, { useEffect, useState } from 'react'

import {
    Link,
    useNavigate
} from 'react-router-dom'

import {
    useDispatch,
    useSelector
} from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import {
    getUser,
    createUser
} from "../../../Redux/ActionCreators/UserActionCreators"

export default function AdminCreateUserPage() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

   const UserStateData = useSelector(
    state => state.UserStateData || []
)
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        role: "Admin",
        status: true
    })

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: ""
    })

    const [show, setShow] = useState(false)

    // ✅ Load users once
    useEffect(() => {
        dispatch(getUser())
    }, [])

    // ✅ Input Handler
    function getInputData(e) {

        const { name, value } = e.target

        setData(prev => ({
            ...prev,

            [name]:
                name === "status"
                    ? value === "true"
                    : value
        }))

        setErrorMessage(prev => ({
            ...prev,
            [name]: FormValidators(e)
        }))
    }

    // ✅ Submit
    function postData(e) {

        e.preventDefault()

        const error = Object.values(errorMessage)
            .find(x => x !== "")

        if (error) {
            setShow(true)
            return
        }

        // password match
        if (data.password !== data.cpassword) {

            setShow(true)

            setErrorMessage(prev => ({
                ...prev,
                password:
                    "Password and Confirm Password do not match"
            }))

            return
        }

        // duplicate check
        const duplicateUser = UserStateData.find(
            x =>
                x.username?.toLowerCase()
                === data.username?.toLowerCase()

                ||

                x.email?.toLowerCase()
                === data.email?.toLowerCase()
        )

        if (duplicateUser) {

            setShow(true)

            setErrorMessage(prev => ({

                ...prev,

                username:
                    duplicateUser.username?.toLowerCase()
                        === data.username?.toLowerCase()
                        ? "Username already exists"
                        : "",

                email:
                    duplicateUser.email?.toLowerCase()
                        === data.email?.toLowerCase()
                        ? "Email already exists"
                        : ""
            }))

            return
        }

        // ✅ Create user
        dispatch(createUser({

            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: data.role,
            status: data.status
        }))
setTimeout(() => {
        navigate("/admin/user")
    }, 500)
    }

    return (
        <>
            <div className="container-fluid my-3">

                <div className="row">

                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>

                    <div className="col-md-9">

                        <h4 className='mybackground text-light text-center p-3 mb-3'>

                            Create User

                            <Link to="/admin/user">
                                <i className='bi bi-arrow-left text-light float-end'></i>
                            </Link>

                        </h4>

                        <form onSubmit={postData}>

                            <div className="row">

                                {/* Name */}
                                <div className="col-md-6 mb-3">

                                    <label>Name*</label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.name
                                                ? 'border-danger'
                                                : 'myborder'
                                            }`}
                                        placeholder='Full Name'
                                    />

                                    {
                                        show && errorMessage.name &&
                                        <p className='text-danger'>
                                            {errorMessage.name}
                                        </p>
                                    }

                                </div>

                                {/* Phone */}
                                <div className="col-md-6 mb-3">

                                    <label>Phone*</label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.phone
                                                ? 'border-danger'
                                                : 'myborder'
                                            }`}
                                        placeholder='Phone Number'
                                    />

                                    {
                                        show && errorMessage.phone &&
                                        <p className='text-danger'>
                                            {errorMessage.phone}
                                        </p>
                                    }

                                </div>

                                {/* Username */}
                                <div className="col-md-6 mb-3">

                                    <label>User Name*</label>

                                    <input
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.username
                                                ? 'border-danger'
                                                : 'myborder'
                                            }`}
                                        placeholder='User Name'
                                    />

                                    {
                                        show && errorMessage.username &&
                                        <p className='text-danger'>
                                            {errorMessage.username}
                                        </p>
                                    }

                                </div>

                                {/* Email */}
                                <div className="col-md-6 mb-3">

                                    <label>Email*</label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.email
                                                ? 'border-danger'
                                                : 'myborder'
                                            }`}
                                        placeholder='Email Address'
                                    />

                                    {
                                        show && errorMessage.email &&
                                        <p className='text-danger'>
                                            {errorMessage.email}
                                        </p>
                                    }

                                </div>

                                {/* Password */}
                                <div className="col-md-6 mb-3">

                                    <label>Password*</label>

                                    <input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.password
                                                ? 'border-danger'
                                                : 'myborder'
                                            }`}
                                        placeholder='Enter Password'
                                    />

                                    {
                                        show && errorMessage.password &&
                                        <p className='text-danger'>
                                            {errorMessage.password}
                                        </p>
                                    }

                                </div>

                                {/* Confirm Password */}
                                <div className="col-md-6 mb-3">

                                    <label>Confirm Password*</label>

                                    <input
                                        type="password"
                                        name="cpassword"
                                        value={data.cpassword}
                                        onChange={getInputData}
                                        className='form-control myborder'
                                        placeholder='Confirm Password'
                                    />

                                </div>

                                {/* Role */}
                                <div className="col-md-6 mb-3">

                                    <label>Role*</label>

                                    <select
                                        name="role"
                                        value={data.role}
                                        onChange={getInputData}
                                        className='form-select myborder'
                                    >
                                        <option value="Admin">
                                            Admin
                                        </option>

                                        <option value="Super Admin">
                                            Super Admin
                                        </option>

                                        <option value="user">
                                            User
                                        </option>
                                    </select>

                                </div>

                                {/* Status */}
                                <div className="col-md-6 mb-3">

                                    <label>Status*</label>

                                    <select
                                        name="status"
                                        value={data.status.toString()}
                                        onChange={getInputData}
                                        className='form-select myborder'
                                    >
                                        <option value="true">
                                            Active
                                        </option>

                                        <option value="false">
                                            Inactive
                                        </option>
                                    </select>

                                </div>

                            </div>

                            <div className="col-12 text-center">

                                <button
                                    type='submit'
                                    className="btn btn-primary btn-lg p-3 my-3 w-100 border-0"
                                >
                                    Create Account
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <div style={{ height: 100 }}></div>
        </>
    )
}