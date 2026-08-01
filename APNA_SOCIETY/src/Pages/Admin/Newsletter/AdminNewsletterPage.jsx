import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { getNewsletter, deleteNewsletter, updateNewsletter } from "../../../Redux/ActionCreators/NewsletterActionCreators"

export default function AdminNewsletterPage() {

    const dispatch = useDispatch()

    const data = useSelector(state =>
        Array.isArray(state.NewsletterStateData) ? state.NewsletterStateData : []
    )

    useEffect(() => {
        dispatch(getNewsletter())
    }, [dispatch])

    function deleteRecord(id) {
        if (window.confirm("Delete this record?")) {
            dispatch(deleteNewsletter({ _id: id }))   // ✅ FIX
        }
    }

    function updateRecord(item) {
        if (window.confirm("Change status?")) {
            dispatch(updateNewsletter({
                ...item,
                _id: item._id,
                status: !item.status
            }))
        }
    }

    // DATATABLE
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
        <div className="container-fluid my-3">
            <div className="row">

                <div className="col-md-3">
                    <AdminSidebar />
                </div>

                <div className="col-md-9">

                    <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
                        Newsletter
                    </h6>

                    <table id='myTable' className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>

                                    <td>{item._id}</td>
                                    <td>{item.email}</td>

                                    <td
                                        style={{ cursor: "pointer" }}
                                        onClick={() => updateRecord(item)}
                                    >
                                        {item.status ? "Active" : "Inactive"}
                                    </td>

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
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    )
}