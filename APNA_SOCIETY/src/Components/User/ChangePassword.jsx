import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import FormValidators from '../../Validators/FormValidators'

export default function ChangePassword() {

    let [data, setData] = useState({
        oldPassword: '',
        password: '',
        cpassword: ''
    })

    let [errorMessage, setErrorMessage] = useState("")
    let [show, setShow] = useState(false)

    function getInputData(e) {
        let { name, value } = e.target
        setShow(false)
        setData({ ...data, [name]: value })

        if (name === "password") {
            setErrorMessage(FormValidators(e))
        }
    }

    async function postData(e) {
        e.preventDefault()

        let user = JSON.parse(localStorage.getItem("user"))

        if (!user) {
            setErrorMessage("User not logged in")
            setShow(true)
            return
        }

        if (errorMessage) {
            setShow(true)
            return
        }

        if (data.password === data.oldPassword) {
            setErrorMessage("Old and new password cannot be same")
            setShow(true)
            return
        }

        if (data.password !== data.cpassword) {
            setErrorMessage("Password and confirm password do not match")
            setShow(true)
            return
        }

        try {
            let response = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/change-password/${user._id}`,
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        oldPassword: data.oldPassword,
                        newPassword: data.password
                    })
                }
            )

            let result = await response.json()

            if (response.ok) {
                toast("Password Updated Successfully ✅")
                setData({ oldPassword: "", password: "", cpassword: "" })
            } else {
                setErrorMessage(result.message)
                setShow(true)
            }

        } catch (error) {
            console.log(error)
            setErrorMessage("Server error")
            setShow(true)
        }
    }

    return (
        <>
            <div className="row align-items-center">

                <div className="col-lg-6">

                    {show && errorMessage && (
                        <p className='text-danger text-center'>{errorMessage}</p>
                    )}

                    <div className="form-section">
                        <form onSubmit={postData}>

                            <div className="mb-3">
                                <label>Current Password*</label>
                                <input type="password" name='oldPassword'
                                    onChange={getInputData}
                                    className={`form-control ${show && errorMessage ? 'border-danger' : ''}`}
                                    placeholder="******" />
                            </div>

                            <div className="mb-3">
                                <label>New Password*</label>
                                <input type="password" name='password'
                                    onChange={getInputData}
                                    className={`form-control ${show && errorMessage ? 'border-danger' : ''}`}
                                    placeholder="******" />
                            </div>

                            <div className="mb-3">
                                <label>Confirm Password*</label>
                                <input type="password" name='cpassword'
                                    onChange={getInputData}
                                    className={`form-control ${show && errorMessage ? 'border-danger' : ''}`}
                                    placeholder="******" />
                            </div>

                            <button className="btn btn-primary w-100">
                                Update Password
                            </button>

                        </form>
                    </div>
                </div>

                <div className="col-lg-6 text-end">
                    <img src="/images/lock.webp" alt="reset" />
                </div>

            </div>

            <ToastContainer />
        </>
    )
}