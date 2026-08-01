import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'


import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getEvents, updateEvents } from "../../../Redux/ActionCreators/EventsActionCreators"

export default function AdminUpdateEventsPage() {

  const { id } = useParams()

  const [data, setData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    category: "",
    joinmember: "",
    pic: "",
    status: true
  })

  const [errorMessage, setErrorMessage] = useState({})
  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const EventsStateData = useSelector(state => state.EventsStateData)

  // 🔥 LOAD EVENTS
  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  // 🔥 SET DATA
  useEffect(() => {

    if (!Array.isArray(EventsStateData)) return

    const item = EventsStateData.find(
      x => String(x._id) === String(id)
    )

    if (item) {
      setData({
        name: item.name || "",
        date: item.date || "",
        time: item.time || "",
        location: item.location || "",
        category: item.category || "",
        joinmember: item.joinmember || "",
        pic: item.pic || "",
        status: item.status ?? true
      })
    } else {
      navigate("/admin/events")
    }

  }, [EventsStateData, id, navigate])

  // INPUT HANDLER
  function getInputData(e) {

    const { name } = e.target
    let value = e.target.value

    if (name === "pic") {
      value = e.target.files[0]?.name
        ? "events/" + e.target.files[0].name
        : data.pic   // keep old image
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
      x =>
        String(x._id) !== String(id) &&
        x.name?.trim().toLowerCase() === data.name.trim().toLowerCase()
    )

    if (item) {
      setErrorMessage(prev => ({
        ...prev,
        name: "Event already exists"
      }))
      setShow(true)
      return
    }

    // ✅ FINAL UPDATE
    dispatch(updateEvents({
      _id: id,
      name: data.name.trim(),
      date: data.date,
      time: data.time,
      location: data.location.trim(),
      category: data.category.trim(),
      joinmember: data.joinmember.trim(),
      pic: data.pic,
      status: data.status
    }))

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
              Update Events
              <Link to="/admin/events">
                <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-4">
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Date*</label>
                  <input type="date" name="date" value={data.date} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Time*</label>
                  <input type="time" name="time" value={data.time} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Location*</label>
                  <input type="text" name="location" value={data.location} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Category*</label>
                  <input type="text" name="category" value={data.category} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Join Members*</label>
                  <input type="text" name="joinmember" value={data.joinmember} onChange={getInputData} className="form-control" />
                </div>

                

                <div className="col-md-6 mb-4">
                  <label>Status*</label>
                  <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className="form-select">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="col-12">
                  <button className='btn btn-primary w-100 p-3'>
                    Update Event
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