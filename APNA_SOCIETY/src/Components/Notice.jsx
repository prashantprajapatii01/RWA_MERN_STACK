import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotice } from "../Redux/ActionCreators/NoticeActionCreators"
import { useNavigate } from 'react-router-dom'

export default function NoticeBoard() {

    let NoticeStateData = useSelector(state => state.NoticeStateData)
    let dispatch = useDispatch()
let navigate = useNavigate()
    useEffect(() => {
        dispatch(getNotice())
    }, [])

    return (
        <section className="my-5">
            <div className="container">

                {/* Header */}
                <div className="text-center mb-5">
                    <h2 className="fw-bold mybackground">📢 Notice Board</h2>
                    <p className="text-muted">Latest updates & announcements</p>
                </div>

                <div className="row g-4">

                    {NoticeStateData.length === 0 ? (
                        <div className="text-center py-5">
                            <h5>No Notices Available</h5>
                            <p className="text-muted">Please check back later</p>
                        </div>
                    ) : (

                        NoticeStateData.map(item => {

                            const isNew =
                                item.date &&
                                new Date(item.date) >
                                new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)

                            const isExpired =
                                item.expiryDate &&
                                new Date(item.expiryDate) < new Date()

                            return (
                                <div key={item._id} className="col-md-6 col-lg-4">

                                    <div className={`card border-0 shadow-sm h-100 p-4 notice-card 
                                        ${isExpired ? "opacity-50" : ""}`}>

                                        {/* Title + badges */}
                                        <div className="d-flex justify-content-between align-items-start mb-2">

                                            <h5 className="fw-bold mb-0">
                                                {item.title}
                                            </h5>

                                            <div>
                                                {isNew && (
                                                    <span className="badge bg-success me-1">
                                                        New
                                                    </span>
                                                )}

                                                <span className={`badge ${item.priority === "High" ? "bg-danger" :
                                                        item.priority === "Medium" ? "bg-warning text-dark" :
                                                            "bg-secondary"
                                                    }`}>
                                                    {item.priority}
                                                </span>
                                            </div>

                                        </div>

                                        {/* Description */}
                                        <p className="text-muted mb-3">
                                            {item.description}
                                        </p>

                                        {/* Info Section */}
                                        <div className="mb-3 small text-muted">

                                            <div>
                                                <i className="bi bi-tag me-1"></i>
                                                {item.category}
                                            </div>

                                            <div>
                                                <i className="bi bi-calendar-event me-1"></i>
                                                {item.date}
                                            </div>

                                            {item.expiryDate && (
                                                <div>
                                                    <i className="bi bi-clock me-1"></i>
                                                    Expires: {item.expiryDate}
                                                </div>
                                            )}

                                        </div>

                                        {/* Footer */}
                                        <div className="d-flex justify-content-between align-items-center mt-auto">

                                            {/* Status */}
                                            <span className={`badge ${item.status ? "bg-success" : "bg-secondary"
                                                }`}>
                                                {item.status ? "Active" : "Inactive"}
                                            </span>

                                        

                                        </div>
                                        
                                        {/* Bottom Accent */}
                                        <div className={`mt-3 rounded-pill ${item.priority === "High" ? "bg-danger" :
                                                item.priority === "Medium" ? "bg-warning" :
                                                    "bg-secondary"
                                            }`} style={{ height: "4px" }}></div>

                                    </div>

                                </div>
                            )
                        })
                    )}

                </div>

            </div>
        </section>
    )
}