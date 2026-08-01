import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaint } from "../Redux/ActionCreators/ComplaintActionCreators"
import { Link } from 'react-router-dom'

export default function ComplaintPreview() {

    const dispatch = useDispatch()

    // ✅ FIXED selector (no || [])
    const ComplaintStateData = useSelector(state => state.ComplaintStateData)
    const loginData = useSelector(state => state.LoginStateData)

    useEffect(() => {
        dispatch(getComplaint())
    }, [dispatch])

    // 🔥 OPTIMIZED DATA (memoized)
    const filteredData = useMemo(() => {

        if (!Array.isArray(ComplaintStateData)) return []

        let data = [...ComplaintStateData]

        // 👤 user → only own
        if (loginData?.role === "user") {
            data = data.filter(item => item.userId?.toString() === loginData?.id)
        }

        // 🔥 sort latest first
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        // 🔥 show only top 5
        return data.slice(0, 5)

    }, [ComplaintStateData, loginData])

    return (
        <section className="complaint my-5">
            <div className="container">

                <h4 className="text-center mb-4 mybackground text-light p-3">
                    Recent Complaints
                </h4>

                <div className="row">

                    {filteredData.length > 0 ? (

                        filteredData.map(item => {

                            const statusColor =
                                item.status === "Resolved" ? "bg-success" :
                                item.status === "In Progress" ? "bg-warning text-dark" :
                                "bg-danger"

                            return (
                                <div key={item._id} className="col-md-6 col-lg-4 mb-3">

                                    <div className="card shadow-sm h-100 border-0">

                                        <div className="card-body">

                                            {/* TITLE */}
                                            <h6 className="fw-bold mb-2">
                                                {item.title}
                                            </h6>

                                            {/* STATUS */}
                                            <span className={`badge ${statusColor} mb-2`}>
                                                {item.status}
                                            </span>

                                            {/* DETAILS */}
                                            <p className="small text-muted mb-1">
                                                <b>Flat:</b> {item.flatNo || "-"}
                                            </p>
                                            <p className="small text-muted mb-1">
                                                <b>Description:</b> {item.description || "-"}
                                            </p>

                                            <p className="small text-muted mb-1">
                                                <b>Category:</b> {item.category || "-"}
                                            </p>

                                            <p className="small text-muted mb-2">
                                                <b>Contact:</b> {item.contact || "-"}
                                            </p>

                                            {/* VIEW BUTTON */}
                                            <Link
                                                to={`/user/complaints/update/${item._id}`}
                                                className="btn btn-sm btn-primary w-100"
                                            >
                                                View Details
                                            </Link>

                                        </div>

                                    </div>

                                </div>
                            )
                        })

                    ) : (
                        <p className="text-center">No Complaints Found</p>
                    )}

                </div>

                {/* 🔥 VIEW ALL BUTTON */}
                <div className="text-center mt-3">
                    <Link to="/user/complaints" className="btn btn-outline-primary">
                        View All Complaints
                    </Link>
                </div>

            </div>
        </section>
    )
}