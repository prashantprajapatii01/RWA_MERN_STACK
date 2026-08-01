import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'


import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getEvents, createEvents } from "../../../Redux/ActionCreators/EventsActionCreators"

export default function AdminCreateEventsPage() {

  const [data, setData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    category: "",
    joinmember: "",

    status: true
  })

  const [errorMessage, setErrorMessage] = useState({
    name: "Name is required",
   
    date: "Date is required",
    time: "Time is required",
    location: "Location is required",
    category: "Category is required",
    joinmember: "Join Members required"
  })

  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const EventsStateData = useSelector(state => state.EventsStateData)

  // 🔥 LOAD EVENTS
  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  // INPUT HANDLER
  function getInputData(e) {

    const { name } = e.target
    let value = e.target.value

    if (name === "pic") {
      value = e.target.files[0]?.name
        ? "events/" + e.target.files[0].name
        : ""
    }

    setData(prev => ({
      ...prev,
      [name]: name === "status" ? (value === "1" ? true : false) : value
    }))

    setErrorMessage(prev => ({
      ...prev,
      [name]: name === "pic"
        ? ImageValidators(e)
        : FormValidators(e)
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

    const list = Array.isArray(EventsStateData) ? EventsStateData : []

    // 🔥 DUPLICATE CHECK
    const item = list.find(
      x => x.name?.trim().toLowerCase() === data.name.trim().toLowerCase()
    )

    if (item) {
      setErrorMessage(prev => ({
        ...prev,
        name: "Event already exists"
      }))
      setShow(true)
      return
    }

    // ✅ FINAL CLEAN DATA
    const payload = {
      name: data.name.trim(),
      date: data.date,
      time: data.time,
      location: data.location.trim(),
      category: data.category.trim(),
      joinmember: data.joinmember.trim(),
     
      status: data.status
    }

    dispatch(createEvents(payload))

    navigate("/admin/events")
  }

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">

          <div className="col-md-3">
            <AdminSidebar />
          </div>

          <div className="col-md-9">

            <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
              Create Events

              <Link to="/admin/events">
                <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <form onSubmit={postData}>
              <div className="row">

                {/* NAME */}
                <div className="col-12 mb-4">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
                  />
                </div>

                {/* DATE */}
                <div className="col-md-6 mb-4">
                  <label>Date*</label>
                  <input type="date" name="date" onChange={getInputData} className="form-control" />
                </div>

                {/* TIME */}
                <div className="col-md-6 mb-4">
                  <label>Time*</label>
                  <input type="time" name="time" onChange={getInputData} className="form-control" />
                </div>

                {/* LOCATION */}
                <div className="col-md-6 mb-4">
                  <label>Location*</label>
                  <input type="text" name="location" onChange={getInputData} className="form-control" />
                </div>

                {/* CATEGORY */}
                <div className="col-md-6 mb-4">
                  <label>Category*</label>
                  <input type="text" name="category" onChange={getInputData} className="form-control" />
                </div>

                {/* MEMBERS */}
                <div className="col-md-6 mb-4">
                  <label>Join Members*</label>
                  <input type="text" name="joinmember" onChange={getInputData} className="form-control" />
                </div>


                {/* STATUS */}
                <div className="col-md-6 mb-4">
                  <label>Status*</label>
                  <select name="status" onChange={getInputData} className='form-select'>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                {/* SUBMIT */}
                <div className="col-12">
                  <button className='btn btn-primary w-100 p-3'>
                    Create Event
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>

      <div style={{ height: 100 }}></div>
    </>
  )
}