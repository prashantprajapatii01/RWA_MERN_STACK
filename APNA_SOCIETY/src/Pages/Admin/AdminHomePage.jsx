
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../Components/Admin/AdminSidebar'

export default function AdminHomePage() {

    const [data, setData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"))

        // 🔐 Check login
        if (!user) {
            navigate("/login")
            return
        }

        // 🔐 Check role
        if (!["Super Admin", "Admin"].includes(user.role)) {
            navigate("/login")
            return
        }

        // ✅ Set data
        setData(user)

    }, [])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">

                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>

                    <div className="col-md-9">

                        <h6 className='mybackground text-light text-center p-2 fs-1'>
                            Admin Profile
                        </h6>

                        <table className='table table-bordered table-striped'>
                            <tbody>

                                <tr>
                                    <th>Name</th>
                                    <td>{data.name || "-"}</td>
                                </tr>

                                <tr>
                                    <th>User Name</th>
                                    <td>{data.username || "-"}</td>
                                </tr>

                                <tr>
                                    <th>Email</th>
                                    <td>{data.email || "-"}</td>
                                </tr>

                                <tr>
                                    <th>Phone</th>
                                    <td>{data.phone || "-"}</td>
                                </tr>

                                <tr>
                                    <th>Flat No</th>
                                    <td>{data.flatNo || "-"}</td>
                                </tr>

                                <tr>
                                    <th>Block</th>
                                    <td>{data.block || "-"}</td>
                                </tr>

                                <tr>
                                    <th>Role</th>
                                    <td>
                                        <span className={`badge 
                                            ${data.role === "Super Admin" ? "bg-danger" : "bg-primary"}`}>
                                            {data.role}
                                        </span>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            <div style={{ height: 100 }}></div>
        </>
    )
}