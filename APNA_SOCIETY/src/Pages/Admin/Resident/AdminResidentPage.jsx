// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import $ from 'jquery'
// import 'datatables.net'
// import 'datatables.net-dt/css/dataTables.dataTables.min.css'

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// // 🔥 CHANGE: import resident actions
// import { getResident, deleteResident } from "../../../Redux/ActionCreators/ResidentActionCreators"

// export default function AdminResidentPage() {

//   const [data, setData] = useState([])

//   // 🔥 CHANGE: resident state
//   const ResidentStateData = useSelector(state => state.ResidentStateData)
//   const dispatch = useDispatch()

//   function deleteRecord(id) {
//     if (window.confirm("Are You Sure You Want to Delete This Resident?")) {
//       dispatch(deleteResident({ id }))
//       setData(prev => prev.filter(x => x._id !== id))
//     }
//   }

//   useEffect(() => {
//     dispatch(getResident())
//   }, [])

//   useEffect(() => {
//     setData(ResidentStateData)

//     if ($.fn.DataTable.isDataTable('#myTable')) {
//       $('#myTable').DataTable().destroy()
//     }

//     setTimeout(() => {
//       $('#myTable').DataTable()
//     }, 300)

//   }, [ResidentStateData])

//   return (
//     <>
//       <div className="container-fluid my-3">
//         <div className="row">

//           <div className="col-md-3">
//             <AdminSidebar />
//           </div>

//           <div className="col-md-9">

            
//             <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
//               Resident Management

//               <Link to="/admin/residents/create">
//                 <i className='bi bi-plus text-light fs-1 float-end'></i>
//               </Link>
//             </h6>

//             <div className="table-responsive">
//               <table id='myTable' className='table table-bordered'>

//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Flat No</th>
//                     <th>Block</th>
//                     <th>Members</th>
//                     <th>Status</th>
//                     <th>Edit</th>
//                     <th>Delete</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {data.map(item => (
//                     <tr key={item._id}>

//                       <td>{item._id}</td>
//                       <td>{item.name}</td>
//                       <td>{item.email}</td>
//                       <td>{item.phone}</td>
//                       <td>{item.flatNo}</td>
//                       <td>{item.block || "-"}</td>
//                       <td>{item.members || 1}</td>

//                       {/* STATUS */}
//                       <td>
//                         <span className={`badge 
//                           ${item.status === "Active" ? "bg-success" : "bg-danger"}`}>
//                           {item.status || "Inactive"}
//                         </span>
//                       </td>

//                       {/* EDIT */}
//                       <td>
//                         <Link to={`/admin/residents/update/${item._id}`} className='btn btn-primary'>
//                           <i className='bi bi-pencil fs-3'></i>
//                         </Link>
//                       </td>

//                       {/* DELETE */}
//                       <td>
//                         {["Admin", "Super Admin"].includes(localStorage.getItem("role")) && (
//                           <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}>
//                             <i className='bi bi-trash fs-3'></i>
//                           </button>
//                         )}
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             </div>
//           </div>

//         </div>
//       </div>

//       <div style={{ height: 100 }}></div>
//     </>
//   )
// }
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { getResident, deleteResident } from "../../../Redux/ActionCreators/ResidentActionCreators"

export default function AdminResidentPage() {

  const dispatch = useDispatch()
  const ResidentStateData = useSelector(state => state.ResidentStateData)

  const [data, setData] = useState([])

  // 🔥 LOAD DATA ONCE
  useEffect(() => {
    dispatch(getResident())
  }, [dispatch])

  // 🔥 SYNC REDUX → LOCAL + DATATABLE
  useEffect(() => {

    if (!Array.isArray(ResidentStateData)) return

    setData(ResidentStateData)

    // destroy old table
    if ($.fn.DataTable.isDataTable('#myTable')) {
      $('#myTable').DataTable().destroy()
    }

    // re-init
    const timer = setTimeout(() => {
      $('#myTable').DataTable()
    }, 200)

    return () => clearTimeout(timer)

  }, [ResidentStateData])

  // ❌ DELETE (FIXED)
  function deleteRecord(id) {
    if (window.confirm("Are you sure you want to delete this resident?")) {
      dispatch(deleteResident({ _id: id }))   // ✅ FIX
    }
  }

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">

          {/* SIDEBAR */}
          <div className="col-md-3">
            <AdminSidebar />
          </div>

          {/* MAIN */}
          <div className="col-md-9">

            <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
              Resident Management

              <Link to="/admin/residents/create">
                <i className='bi bi-plus text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <div className="table-responsive">
              <table id='myTable' className='table table-bordered'>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Flat No</th>
                    <th>Block</th>
                    <th>Members</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map(item => {

                    const isAdmin = ["Admin", "Super Admin"].includes(localStorage.getItem("role"))

                    return (
                      <tr key={item._id}>

                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.flatNo}</td>
                        <td>{item.block || "-"}</td>
                        <td>{item.members || 1}</td>

                        {/* STATUS */}
                        <td>
                          <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-danger"}`}>
                            {item.status || "Inactive"}
                          </span>
                        </td>

                        {/* EDIT */}
                        <td>
                          <Link
                            to={`/admin/residents/update/${item._id}`}
                            className='btn btn-primary'
                          >
                            <i className='bi bi-pencil fs-3'></i>
                          </Link>
                        </td>

                        {/* DELETE */}
                        <td>
                          {isAdmin && (
                            <button
                              className='btn btn-danger'
                              onClick={() => deleteRecord(item._id)}
                            >
                              <i className='bi bi-trash fs-3'></i>
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