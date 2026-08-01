import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Breadcrum from '../../Components/Breadcrum'

export default function JoinEvent() {

  const location = useLocation()
  const navigate = useNavigate()

  const event = location.state?.event

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    members: 1
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
async function handleSubmit(e) {
  e.preventDefault()

  if (!event) {
    alert("Event data missing ❌")
    return
  }

  const payload = {
    ...formData,
    eventId: event._id,
    eventName: event.name,
    date: new Date()
  }

  try {
    let res = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/eventJoin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    let result = await res.json()

    if (res.ok) {
      alert("🎉 Successfully Joined Event!")

      // 🔥 reset form
      setFormData({
        name: "",
        phone: "",
        members: 1
      })

      navigate("/")
    } else {
      alert(result.message || "Error occurred ❌")
    }

  } catch (err) {
    console.log(err)
    alert("Server error ❌")
  }
}

  return (
    <>
      <Breadcrum title="Join Event" />

      <div className="container my-5">

        <div className="card p-4 shadow-lg border-0">

          {/* EVENT INFO */}
          {event ? (
            <div className="mb-3 p-3 mybackground rounded text-light">
              <h5>{event.name}</h5>
              <p className="mb-1">{event.category}</p>
              <small>{event.date}</small>
            </div>
          ) : (
            <p className="text-danger">Event not found</p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>No. of Members</label>
              <input
                type="number"
                name="members"
                className="form-control"
                min="1"
                value={formData.members}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success mybackground w-100">
              Confirm Join
            </button>

          </form>

        </div>

      </div>

      <div style={{ height: 100 }}></div>
    </>
  )
}