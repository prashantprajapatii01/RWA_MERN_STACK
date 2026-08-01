import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getNotice, deleteNotice } from "../../../Redux/ActionCreators/NoticeActionCreators"

export default function AdminNoticePage() {

    let NoticeStateData = useSelector(state => state.NoticeStateData)
    let dispatch = useDispatch()

    // DELETE
    function deleteRecord(id) {
        if (window.confirm("Are You Sure You Want to Delete That Notice?")) {
            dispatch(deleteNotice({ _id: id }))
        }
    }

    // LOAD DATA ONCE
    useEffect(() => {
        dispatch(getNotice())
    }, [])

    // DATATABLE INIT
    useEffect(() => {
        if (NoticeStateData.length) {

            // 🔥 destroy old table (important)
            if ($.fn.DataTable.isDataTable('#myTable')) {
                $('#myTable').DataTable().destroy()
            }

            // 🔥 re-init
            setTimeout(() => {
                $('#myTable').DataTable()
            }, 300)
        }
    }, [NoticeStateData])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">

                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>

                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
                            Notice Board
                            <Link to="/admin/notice/create">
                                <i className='bi bi-plus text-light fs-1 float-end'></i>
                            </Link>
                        </h6>

                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                           <th>Description</th>
                                        <th>Category</th>
                                       
                                        <th>Date</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {NoticeStateData.map(item => (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>

                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{item.category}</td>
                                            <td>{item.date}</td>

                                            <td>
                                                <span className={`badge ${
                                                    item.priority === "High" ? "bg-danger" :
                                                    item.priority === "Medium" ? "bg-warning" :
                                                    "bg-secondary"
                                                }`}>
                                                    {item.priority}
                                                </span>
                                            </td>

                                            <td>{item.status ? "Active" : "Inactive"}</td>

                                            {/* UPDATE */}
                                            <td>
                                                <Link
                                                    to={`/admin/notice/update/${item._id}`}
                                                    className='btn btn-primary mybackground'
                                                >
                                                    <i className='bi bi-pencil fs-3'></i>
                                                </Link>
                                            </td>

                                            {/* DELETE */}
                                            <td>
                                                {localStorage.getItem("role") === "Admin" &&
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => deleteRecord(item._id)}
                                                    >
                                                        <i className='bi bi-trash fs-3'></i>
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))}
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