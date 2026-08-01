
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile({ option }) {

  const [data, setData] = useState({})
  const navigate = useNavigate()

 useEffect(() => {
  let user = JSON.parse(localStorage.getItem("user"))

  if (user) {
    setData(user)
  } else {
    navigate("/login")
  }
}, [option])
  return (
    <div className="container my-4">

      <div className="card shadow-lg border-0 p-4 profile-card">

        <h4 className="text-center mb-4 fw-bold">My Profile</h4>

        <table className='table table-bordered table-striped align-middle'>
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

            {/* 🔥 NEW FIELDS */}

            <tr>
              <th>Flat No</th>
              <td>{data.flatNo || "-"}</td>
            </tr>

            <tr>
              <th>Block</th>
              <td>{data.block || "-"}</td>
            </tr>

            <tr>
              <th>Resident Type</th>
              <td>
                <span className={`badge 
                  ${data.residentType === "Owner" ? "bg-success" : "bg-info text-dark"}`}>
                  {data.residentType || "-"}
                </span>
              </td>
            </tr>

            <tr>
              <th>Role</th>
              <td>
                <span className="badge bg-primary">
                  {data.role}
                </span>
              </td>
            </tr>

          </tbody>
        </table>

      </div>

    </div>
  )
}