import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { getEvents, deleteEvents } from "../../../Redux/ActionCreators/EventsActionCreators"

export default function AdminMainEventsPage() {

  const dispatch = useDispatch()

  const data = useSelector(state =>
    Array.isArray(state.EventsStateData) ? state.EventsStateData : []
  )

  // 🔥 LOAD DATA
  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  // 🔥 DELETE
  function deleteRecord(id) {
    if (window.confirm("Are You Sure You Want to Delete This Event?")) {
      dispatch(deleteEvents({ _id: id }))   // ✅ FIXED
    }
  }

  // 🔥 DATATABLE FIX
  useEffect(() => {

    if (!data.length) return

    if ($.fn.DataTable.isDataTable('#myTable')) {
      $('#myTable').DataTable().destroy()
    }

    setTimeout(() => {
      $('#myTable').DataTable()
    }, 200)

  }, [data])

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">

          <div className="col-md-3">
            <AdminSidebar />
          </div>

          <div className="col-md-9">

            <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
              Events

              <Link to="/admin/events/create">
                <i className='bi bi-plus text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <div className="table-responsive">
              <table id='myTable' className='table table-bordered'>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map(item => {

                    return (
                      <tr key={item._id}>

                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.location}</td>
                        <td>{item.category}</td>

                        {/* STATUS */}
                        <td>
                          <span className={`badge ${
                            item.status ? "bg-success" : "bg-danger"
                          }`}>
                            {item.status ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* EDIT */}
                        <td>
                          <Link
                            to={`/admin/events/update/${item._id}`}
                            className='btn btn-primary'
                          >
                            <i className='bi bi-pencil'></i>
                          </Link>
                        </td>

                        {/* DELETE */}
                        <td>
                          {["Admin", "Super Admin"].includes(localStorage.getItem("role")) && (
                            <button
                              className='btn btn-danger'
                              onClick={() => deleteRecord(item._id)}
                            >
                              <i className='bi bi-trash'></i>
                            </button>
                          )}
                        </td>

                      </tr>
                    )
                  })}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>

      <div style={{ height: 100 }}></div>
    </>
  )
}