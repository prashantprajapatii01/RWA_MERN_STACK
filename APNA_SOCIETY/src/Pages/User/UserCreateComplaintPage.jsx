import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../Validators/FormValidators'
import { getComplaint, createComplaint } from "../../Redux/ActionCreators/ComplaintActionCreators"

export default function UserCreateComplaintPage() {

  const [data, setData] = useState({
    name: "",
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
    flatNo: "",
    category: "",
    contact: ""
  })

  const [errorMessage, setErrorMessage] = useState({
    name: "Name is required",
    title: "Title is required",
    description: "Description is required"
  })

  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ComplaintStateData = useSelector(state => state.ComplaintStateData)
  const user = JSON.parse(localStorage.getItem("user"))

  function getInputData(e) {
    const { name, value } = e.target

    let updated = { ...data, [name]: value }

    if (name === "status") {
      updated.paymentStatus = value === "Resolved" ? "Paid" : "Pending"
    }

    setData(updated)

    setErrorMessage(prev => ({
      ...prev,
      [name]: FormValidators(e)
    }))
  }

  function postData(e) {
    e.preventDefault()

    const error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      return
    }

    dispatch(createComplaint({
      ...data,
      userId: user._id,
      paymentStatus: "Pending"
    }))

    navigate("/user/complaints")
  }

  useEffect(() => {
    dispatch(getComplaint())
  }, [])

  return (
    <>
    <div className="container-fluid my-3">

      <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
        Create Complaint
        <Link to="/user/complaints">
          <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
        </Link>
      </h6>

      <form onSubmit={postData}>
        <div className="row">

          <div className="col-md-6 mb-4">
            <label>Name*</label>
            <input name="name" onChange={getInputData} className="form-control" />
          </div>

          <div className="col-md-6 mb-4">
            <label>Title*</label>
            <input name="title" onChange={getInputData} className="form-control" />
          </div>

          <div className="col-12 mb-4">
            <label>Description*</label>
            <textarea name="description" onChange={getInputData} className="form-control" />
          </div>

          <div className="col-md-6 mb-4">
            <label>Priority</label>
            <select name="priority" onChange={getInputData} className='form-select'>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="col-md-6 mb-4">
            <label>Status</label>
            <select name="status" onChange={getInputData} className='form-select'>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="col-md-6 mb-4">
            <label>Flat No</label>
            <input name="flatNo" onChange={getInputData} className="form-control" />
          </div>

          <div className="col-md-6 mb-4">
            <label>Category</label>
            <input name="category" onChange={getInputData} className="form-control" />
          </div>

          <div className="col-md-6 mb-4">
            <label>Contact</label>
            <input name="contact" onChange={getInputData} className="form-control" />
          </div>

          <div className="col-12">
            <button className='btn btn-primary w-100 p-3'>
              Create Complaint
            </button>
          </div>

        </div>
      </form>
    </div>
      <div style={{ height: 100 }}></div>
    </>
  )
}