
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormValidators from '../../Validators/FormValidators'

export default function UpdateProfile({ setOption }) {

  const [data, setData] = useState({})
  const [errorMessage, setErrorMessage] = useState({})
  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  // Load user from localStorage
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      setData(user)
    } else {
      navigate("/login")
    }
  }, [])

  // Input handler
  function getInputData(e) {
    const { name, value } = e.target

    setData({
      ...data,
      [name]: value
    })

    setErrorMessage({
      ...errorMessage,
      [name]: FormValidators(e)
    })
  }

  // Submit
  async function postData(e) {
    e.preventDefault()

    const error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      return
    }

    try {
      let response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${data._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(data)
        }
      )

      let result = await response.json()

      if (response.ok) {
        // update localStorage also
        localStorage.setItem("user", JSON.stringify(result))

        setOption("profile")
      } else {
        setShow(true)
        setErrorMessage({
          general: result.message || "Update failed"
        })
      }

    } catch (error) {
      console.log(error)
      setShow(true)
      setErrorMessage({
        general: "Server error"
      })
    }
  }

  return (
    <div className="container my-4">

      <div className="card shadow-lg p-4 border-0 profile-card">

        <h4 className="text-center mb-4">Update Profile</h4>

        {show && errorMessage.general && (
          <p className="text-danger text-center">{errorMessage.general}</p>
        )}

        <form onSubmit={postData}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Name*</label>
              <input
                type="text"
                name="name"
                value={data.name || ""}
                onChange={getInputData}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Phone*</label>
              <input
                type="text"
                name="phone"
                value={data.phone || ""}
                onChange={getInputData}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Username*</label>
              <input
                type="text"
                name="username"
                value={data.username || ""}
                onChange={getInputData}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={data.email || ""}
                onChange={getInputData}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Flat No*</label>
              <input
                type="text"
                name="flatNo"
                value={data.flatNo || ""}
                onChange={getInputData}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Block*</label>
              <input
                type="text"
                name="block"
                value={data.block || ""}
                onChange={getInputData}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Resident Type*</label>
              <select
                name="residentType"
                value={data.residentType || ""}
                onChange={getInputData}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
              </select>
            </div>

            <div className="col-12 text-center">
              <button className="btn btn-primary w-50 p-3 mt-3">
                Update Profile
              </button>
            </div>

          </div>
        </form>

      </div>

    </div>
  )
}