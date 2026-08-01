import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../Validators/FormValidators'
import { getComplaint, updateComplaint } from "../../Redux/ActionCreators/ComplaintActionCreators"

export default function UserUpdateComplaintPage() {

  const { id } = useParams()

  const [data, setData] = useState({
    _id: "",
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
    name: "",
    title: "",
    description: ""
  })

  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ComplaintStateData = useSelector(state => state.ComplaintStateData)
  const user = JSON.parse(localStorage.getItem("user"))

  // INPUT
  function getInputData(e) {
    const { name, value } = e.target

    setData(prev => ({
      ...prev,
      [name]: value
    }))

    setErrorMessage(prev => ({
      ...prev,
      [name]: FormValidators(e)
    }))
  }

  // SUBMIT
  function postData(e) {
    e.preventDefault()

    const error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      return
    }

    dispatch(updateComplaint(data))
    navigate("/user/complaints")
  }

  // LOAD
  useEffect(() => {
    dispatch(getComplaint())
  }, [])

  useEffect(() => {
    if (ComplaintStateData.length) {

      const item = ComplaintStateData.find(x => x._id === id)

      if (!item || item.userId !== user._id) {
        navigate("/user/complaints")
        return
      }

      setData(prev => ({ ...prev, ...item }))
    }
  }, [ComplaintStateData])

  return (
    <>
    <div className="container my-4">

      <h3 className="mybackground text-light text-center p-3 mb-4">
        Update Complaint
        <Link to="/user/complaints">
          <i className='bi bi-arrow-left text-light float-end'></i>
        </Link>
      </h3>

      <form onSubmit={postData}>
        <div className="row">

          <div className="col-md-6 mb-4">
            <label>Name*</label>
            <input
              name="name"
              value={data.name}
              onChange={getInputData}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-4">
            <label>Title*</label>
            <input
              name="title"
              value={data.title}
              onChange={getInputData}
              className="form-control"
            />
          </div>

          <div className="col-12 mb-4">
            <label>Description*</label>
            <textarea
              name="description"
              value={data.description}
              onChange={getInputData}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-4">
            <label>Priority</label>
            <select
              name="priority"
              value={data.priority}
              onChange={getInputData}
              className="form-select"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="col-md-6 mb-4">
            <label>Status</label>
            <select
              name="status"
              value={data.status}
              onChange={getInputData}
              className="form-select"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="col-md-6 mb-4">
            <label>Flat No</label>
            <input
              name="flatNo"
              value={data.flatNo}
              onChange={getInputData}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-4">
            <label>Category</label>
            <input
              name="category"
              value={data.category}
              onChange={getInputData}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-4">
            <label>Contact</label>
            <input
              name="contact"
              value={data.contact}
              onChange={getInputData}
              className="form-control"
            />
          </div>

          <div className="col-12">
            <button className='btn btn-primary w-100 p-3'>
              Update Complaint
            </button>
          </div>

        </div>
      </form>

    </div>
      <div style={{ height: 100 }}></div>
      </>
  )
}