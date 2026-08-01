import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from "../Redux/ActionCreators/EventsActionCreators"
import { Link, useNavigate } from 'react-router-dom'

export default function EventBoard() {

  let EventsStateData = useSelector(state => state.EventsStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(getEvents())
  }, [])

  return (
    <section className="my-5">
      <div className="container">

        <div className="text-center mb-4 mybackground p-3 border-radi">
          <h3 className="fw-bold text-light">🎉 Upcoming Events</h3>
          <p className="text-muted">Don’t miss out on society events</p>
        </div>

        <div className="row g-4">

          {
            EventsStateData
              .filter(item => item.status === true || item.status === "Active")
              .map(item => {

                return (
                  <div key={item._id} className="col-md-6 col-lg-4">

                    <div className="card border-0 shadow-sm h-100 p-4 notice-card">

                      {/* Title */}
                      <div className="d-flex justify-content-between align-items-start mb-2">

                        <h5 className="fw-bold mb-0">
                          {item.name}
                        </h5>

                        <span className="badge bg-primary">
                          Event
                        </span>

                      </div>

                      {/* Description */}
                      <p className="text-muted mb-3">
                        {item.category || "General Event"}
                      </p>

                      {/* Info */}
                      <div className="mb-3 small text-muted">

                        <div>
                          <i className="bi bi-clock me-1"></i>
                          {item.time || "Time not set"}
                        </div>

                        <div>
                          <i className="bi bi-geo-alt me-1"></i>
                          {item.location || "Location not set"}
                        </div>

                        <div>
                          <i className="bi bi-calendar-event me-1"></i>
                          {item.date}
                        </div>

                      </div>

                      {/* Footer */}
                      <div className="d-flex justify-content-between align-items-center mt-auto">

                        <span className="badge bg-success">
                          Active
                        </span>

                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate("/join-event", { state: { event: item } })}
                        >
                          Join Event
                        </button>

                      </div>

                      {/* Bottom Accent */}
                      <div
                        className="mt-3 rounded-pill bg-primary"
                        style={{ height: "4px" }}
                      ></div>

                    </div>

                  </div>
                )
              })
          }

        </div>

      </div>
    </section>
  )
}