import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    let [data, setData] = useState({
        username: "",
        password: "",
    })
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function postData(e) {
        e.preventDefault()

        try {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/auth/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            let result = await response.json()

            if (response.ok) {

                // 🔐 Save token + user
                localStorage.setItem("token", result.token)
                localStorage.setItem("user", JSON.stringify(result.user))

                // (optional - your old style)
                localStorage.setItem("login", true)
                localStorage.setItem("name", result.user.name)
                localStorage.setItem("username", result.user.username)
                localStorage.setItem("userid", result.user._id)
                localStorage.setItem("role", result.user.role)

                // 🚀 Redirect based on role
                if (["Super Admin", "Admin"].includes(result.user.role)) {
                    navigate("/admin")
                } else {
                    navigate("/profile")
                }

            } else {
                setErrorMessage(result.message)
            }

        } catch (error) {
            console.log(error)
            setErrorMessage("Server error, please try again")
        }
    }

    return (
        <>
            <section className="login footer-padding">
                <div className="container p-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-10 m-auto bg-light p-5 rounded my-5">
                            <h5 className="text-center mb-3">Login To Your Account</h5>

                            <form onSubmit={postData}>
                                <div className="row">

                                    <div className="col-12 mb-3">
                                        <label>User Name*</label>
                                        <input
                                            type="text"
                                            name="username"
                                            onChange={getInputData}
                                            className={`form-control ${errorMessage ? 'border-danger' : 'myborder'}`}
                                            placeholder='User Name'
                                        />
                                        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label>Password*</label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={getInputData}
                                            className={`form-control ${errorMessage ? 'border-danger' : 'myborder'}`}
                                            placeholder='Enter Password'
                                        />
                                    </div>

                                </div>

                                <div className="col-12 text-center">
                                    <button type='submit' className="btn btn-primary btn-lg rounded-pill p-3 my-3 w-50 border-0">
                                        Login
                                    </button>
                                </div>
                            </form>

                            <div className='d-flex justify-content-between'>
                                <span>Forget Password ? <Link to="/login">Reset</Link></span>
                                <span>Don't have an account ? <Link to="/signup">Create</Link></span>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}