import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import {
    getUser,
    deleteUser,
    updateUser
} from "../../../Redux/ActionCreators/UserActionCreators"

export default function AdminUserPage() {

    const [data, setData] = useState([])

    const dispatch = useDispatch()

    // ✅ Redux State
    const UserStateData = useSelector(
        state => state.UserStateData
    )



    // =====================================================
    // ✅ GET USERS
    // =====================================================

    useEffect(() => {

        dispatch(getUser())

    }, [dispatch])



    // =====================================================
    // ✅ UPDATE LOCAL DATA
    // =====================================================

    useEffect(() => {

        if (Array.isArray(UserStateData)) {

            setData(UserStateData)
        }

    }, [UserStateData?.length])



    // =====================================================
    // ✅ DATATABLE FIX
    // =====================================================

    useEffect(() => {

        if ($.fn.DataTable.isDataTable('#myTable')) {

            $('#myTable').DataTable().destroy()
        }

        if (data.length > 0) {

            setTimeout(() => {

                $('#myTable').DataTable()

            }, 100)
        }

    }, [data.length])



    // =====================================================
    // ✅ DELETE USER
    // =====================================================

    function deleteRecord(id) {

        if (
            window.confirm(
                "Are you sure you want to delete this user?"
            )
        ) {

            dispatch(deleteUser(id))

            setData(prev =>

                prev.filter(item => item._id !== id)
            )
        }
    }



    // =====================================================
    // ✅ UPDATE STATUS
    // =====================================================

    function updateRecord(id) {

        if (
            window.confirm(
                "Are you sure you want to change status?"
            )
        ) {

            const item = data.find(
                x => x._id === id
            )

            if (!item) return

            const updatedUser = {

                ...item,

                status: !item.status
            }

            dispatch(updateUser(updatedUser))

            setData(prev =>

                prev.map(user =>

                    user._id === id

                        ? updatedUser

                        : user
                )
            )
        }
    }



    return (
        <>
            <div className="container-fluid my-3">

                <div className="row">

                    {/* ================= Sidebar ================= */}

                    <div className="col-md-3">

                        <AdminSidebar />

                    </div>



                    {/* ================= Main Content ================= */}

                    <div className="col-md-9">

                        <h4 className='mybackground text-light text-center p-3 mb-3'>

                            Users

                            <Link to="/admin/user/create">

                                <i className='bi bi-plus text-light float-end'></i>

                            </Link>

                        </h4>



                        <div className="table-responsive">

                            <table
                                id='myTable'
                                className='table table-bordered table-striped'
                            >

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                        <th>Delete</th>

                                    </tr>

                                </thead>



                                <tbody>

                                    {
                                        data.length > 0

                                            ?

                                            data.map(item => (

                                                <tr key={item._id}>

                                                    <td>
                                                        {item._id?.slice(-6)}
                                                    </td>

                                                    <td>
                                                        {item.name}
                                                    </td>

                                                    <td>
                                                        {item.username}
                                                    </td>

                                                    <td>
                                                        {item.email}
                                                    </td>

                                                    <td>
                                                        {item.phone}
                                                    </td>

                                                    <td>

                                                        <span className='badge bg-primary'>

                                                            {item.role}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span
                                                            onClick={() =>
                                                                updateRecord(item._id)
                                                            }
                                                            style={{
                                                                cursor: "pointer"
                                                            }}
                                                            className={`badge ${
                                                                item.status
                                                                    ? "bg-success"
                                                                    : "bg-danger"
                                                            }`}
                                                        >

                                                            {
                                                                item.status
                                                                    ? "Active"
                                                                    : "Inactive"
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {
                                                            item.role === "Super Admin"

                                                                ?

                                                                null

                                                                :

                                                                <Link
                                                                    to={`/admin/user/update/${item._id}`}
                                                                    className='btn btn-primary'
                                                                >

                                                                    <i className='bi bi-pencil'></i>

                                                                </Link>
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            item.role === "Super Admin"

                                                                ?

                                                                null

                                                                :

                                                                <button
                                                                    className='btn btn-danger'
                                                                    onClick={() =>
                                                                        deleteRecord(item._id)
                                                                    }
                                                                >

                                                                    <i className='bi bi-trash'></i>

                                                                </button>
                                                        }

                                                    </td>

                                                </tr>
                                            ))

                                            :

                                            <tr>

                                                <td
                                                    colSpan="9"
                                                    className='text-center'
                                                >

                                                    No Users Found

                                                </td>

                                            </tr>
                                    }

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