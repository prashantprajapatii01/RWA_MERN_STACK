// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import FormValidators from '../../../Validators/FormValidators'

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// import { getUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"
// export default function AdminUpdateUserPage() {
//     let { id } = useParams()
//     let [data, setData] = useState({
//         name: "",
//         username: "",
//         email: "",
//         phone: "",
//         role: "Admin"
//     })
//     let [errorMessage, setErrorMessage] = useState({
//         name: "",
//         username: "",
//         email: "",
//         phone: "",
//     })
//     let [show, setShow] = useState(false)
//     let navigate = useNavigate()

//     let UserStateData = useSelector(state => state.UserStateData)
//     let dispatch = useDispatch()

//     function getInputData(e) {
//         let { name, value } = e.target

//         setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
//         setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
//     }
//     function postData(e) {
//         e.preventDefault()
//         let error = Object.values(errorMessage).find(x => x !== "")
//         if (error)
//             setShow(true)
//         else {
//             let item = UserStateData.find(x => x.id !== id && (x.username?.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase()))
//             if (item) {
//                 setShow(true)
//                 setErrorMessage({
//                     ...errorMessage,
//                     username: item.username?.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
//                     email: item.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Address Already Registered" : "",
//                 })
//             }
//             else {
//                 dispatch(updateUser({ ...data }))
//                 navigate("/admin/user")
//             }
//         }
//     }

//     useEffect(() => {
//         (() => {
//             dispatch(getUser())
//             if (UserStateData.length) {
//                 let item = UserStateData.find(x => x.id === id)
//                 if (item) {
//                     setData({ ...data, ...item })
//                 }
//                 else
//                     navigate("/admin/user")
//             }
//         })()
//     }, [UserStateData.length])
//     return (
//         <>
//             <div className="container-fluid my-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <AdminSidebar />
//                     </div>
//                     <div className="col-md-9">
//                         <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Update User
//                             <Link to="/admin/user"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link>
//                         </h6>
//                         <form onSubmit={postData}>
//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <label>Name*</label>
//                                     <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
//                                     {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <label>Phone*</label>
//                                     <input type="text" name="phone" value={data.phone} onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
//                                     {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <label>User Name*</label>
//                                     <input type="text" name="username" value={data.username} onChange={getInputData} className={`form-control ${show && errorMessage.username ? 'border-danger' : 'myborder'}`} placeholder='User Name' />
//                                     {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <label>Email*</label>
//                                     <input type="email" name="email" value={data.email} onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
//                                     {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
//                                 </div>

//                                 <div className="col-md-6 mb-3">
//                                     <label>Role*</label>
//                                     <select name="role" value={data.role} onChange={getInputData} className='form-select myborder'>
//                                         <option>Admin</option>
//                                         <option>Super Admin</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <label>Status*</label>
//                                     <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select myborder'>
//                                         <option value="1">Active</option>
//                                         <option value="0">Inactive</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="col-12 text-center">
//                                 <button type='submit' className="btn btn-primary mybackground btn-lg p-3 my-3 w-100 border-0">Update an Account</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <div style={{ height: 100 }}></div>
//         </>
//     )
// }
import React, { useEffect, useState } from 'react'

import {
    Link,
    useNavigate,
    useParams
} from 'react-router-dom'

import {
    useDispatch,
    useSelector
} from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import {
    getUser,
    updateUser
} from "../../../Redux/ActionCreators/UserActionCreators"

export default function AdminUpdateUserPage() {

    const { id } = useParams()

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
        role: "Admin",
        status: true
    })

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: ""
    })

    const [show, setShow] = useState(false)

    // ✅ Load users once
    useEffect(() => {
        dispatch(getUser())
    }, [])

    // ✅ Find current user
    useEffect(() => {

        if (UserStateData.length) {

            const item = UserStateData.find(
                x => x._id === id
            )

            if (item) {
                setData(item)
            }
            else {
                navigate("/admin/user")
            }
        }

    }, [UserStateData, id])

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

        // duplicate user check
        const duplicateUser = UserStateData.find(
            x =>
                x._id !== id &&
                (
                    x.username?.toLowerCase()
                    === data.username?.toLowerCase()

                    ||

                    x.email?.toLowerCase()
                    === data.email?.toLowerCase()
                )
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

        // ✅ Update user
        dispatch(updateUser(data))
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

                            Update User

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
                                        value={data.name || ""}
                                        onChange={getInputData}
                                        className={`form-control ${
                                            show && errorMessage.name
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
                                        value={data.phone || ""}
                                        onChange={getInputData}
                                        className={`form-control ${
                                            show && errorMessage.phone
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
                                        value={data.username || ""}
                                        onChange={getInputData}
                                        className={`form-control ${
                                            show && errorMessage.username
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
                                        value={data.email || ""}
                                        onChange={getInputData}
                                        className={`form-control ${
                                            show && errorMessage.email
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

                                {/* Role */}
                                <div className="col-md-6 mb-3">

                                    <label>Role*</label>

                                    <select
                                        name="role"
                                        value={data.role || "Admin"}
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
                                        value={data.status?.toString()}
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
                                    Update Account
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