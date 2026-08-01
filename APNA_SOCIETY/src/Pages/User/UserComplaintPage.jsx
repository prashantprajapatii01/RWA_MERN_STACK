// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import $ from 'jquery'
// import 'datatables.net'
// import 'datatables.net-dt/css/dataTables.dataTables.min.css'

// import { getComplaint, deleteComplaint } from "../../Redux/ActionCreators/ComplaintActionCreators"

// export default function UserComplaintPage() {

//   const dispatch = useDispatch()
//   const ComplaintStateData = useSelector(state => state.ComplaintStateData)

//   const user = JSON.parse(localStorage.getItem("user"))

//     // 🔥 DELETE FUNCTION
//   function deleteRecord(id) {
//     if (window.confirm("Are you sure you want to delete this complaint?")) {
//       dispatch(deleteComplaint({ _id: id }))
//     }
//   }

//   useEffect(() => {
//     dispatch(getComplaint())
//   }, [])

//   useEffect(() => {
//     if (ComplaintStateData.length) {

//       if ($.fn.DataTable.isDataTable('#myTable')) {
//         $('#myTable').DataTable().destroy()
//       }

//       setTimeout(() => {
//         $('#myTable').DataTable()
//       }, 300)
//     }
//   }, [ComplaintStateData])

//   return (
//     <>
//     <div className="container-fluid my-3">
//       <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
//         My Complaints

//         <Link to="/user/complaints/create">
//           <i className='bi bi-plus text-light fs-1 float-end'></i>
//         </Link>
//       </h6>

//       <div className="table-responsive">
//         <table id='myTable' className='table table-bordered'>

//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Payment</th>
//               <th>Edit</th>
//                  <th>Delete</th> {/* 🔥 NEW */}
//             </tr>
//           </thead>

//           <tbody>
//   {Array.isArray(ComplaintStateData) &&
//     ComplaintStateData
//       .filter(x => x.userId?.toString() === user._id)
//       .map(item => {

//         const isPaid = item.paymentStatus === "Paid"

//         return (
//           <tr key={item._id}>
//             <td>{item._id}</td>
//             <td>{item.title}</td>

//             <td>
//               <span className={`badge 
//                 ${item.priority === "High" ? "bg-danger" :
//                   item.priority === "Medium" ? "bg-warning text-dark" :
//                   "bg-success"}`}>
//                 {item.priority}
//               </span>
//             </td>

//             <td>
//               <span className={`badge 
//                 ${item.status === "Resolved" ? "bg-success" :
//                   item.status === "In Progress" ? "bg-warning text-dark" :
//                   "bg-danger"}`}>
//                 {item.status}
//               </span>
//             </td>

//             <td>
//               <span className={`badge 
//                 ${isPaid ? "bg-success" : "bg-danger"}`}>
//                 {isPaid ? "Paid" : "Pending"}
//               </span>
//             </td>

//             <td>
//               <Link
//                 to={`/user/complaints/update/${item._id}`}
//                 className='btn btn-primary mybackground'
//               >
//                 <i className='bi bi-pencil fs-3'></i>
//               </Link>
//             </td>
//                  <td>
//                         <button
//                           className='btn btn-danger'
//                           onClick={() => deleteRecord(item._id)}
//                         >
//                           <i className='bi bi-trash fs-3'></i>
//                         </button>
//                       </td>

//           </tr>
//         )
//       })}
// </tbody>

//         </table>
//       </div>
//     </div>
//       <div style={{ height: 100 }}></div>
//     </>
//   )
// }
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import { getComplaint, deleteComplaint } from "../../Redux/ActionCreators/ComplaintActionCreators"

export default function UserComplaintPage() {

  const dispatch = useDispatch()
  const ComplaintStateData = useSelector(state => state.ComplaintStateData) || []

  const user = JSON.parse(localStorage.getItem("user"))

  // 🔥 DELETE
  function deleteRecord(id) {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      dispatch(deleteComplaint({ _id: id }))
    }
  }

  // LOAD DATA
  useEffect(() => {
    dispatch(getComplaint())
  }, [dispatch])

  // DATATABLE INIT
  useEffect(() => {
    if (Array.isArray(ComplaintStateData) && ComplaintStateData.length) {

      if ($.fn.DataTable.isDataTable('#myTable')) {
        $('#myTable').DataTable().destroy()
      }

      setTimeout(() => {
        $('#myTable').DataTable()
      }, 200)
    }
  }, [ComplaintStateData])

  return (
    <div className="container-fluid my-3">

      <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
        My Complaints
        <Link to="/user/complaints/create">
          <i className='bi bi-plus text-light fs-1 float-end'></i>
        </Link>
      </h6>

      <div className="table-responsive">
        <table id='myTable' className='table table-bordered'>

          {/* 🔥 CLEAN THEAD (NO SPACES / COMMENTS) */}
          <thead>
            <tr>
              <th>ID</th><th>Title</th> <th>Description</th> <th>Priority</th><th>Status</th><th>Payment</th><th>Edit</th><th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(ComplaintStateData) &&
              ComplaintStateData
                .filter(x => x.userId?.toString() === user._id)
                .map(item => {

                  const isPaid = item.paymentStatus === "Paid"

                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.title}</td>
<td>
  {item.description
    ? item.description.length > 40
      ? item.description.slice(0, 40) + "..."
      : item.description
    : "-"
  }
</td>
                      <td>
                        <span className={`badge ${item.priority === "High" ? "bg-danger" :
                            item.priority === "Medium" ? "bg-warning text-dark" :
                              "bg-success"
                          }`}>
                          {item.priority}
                        </span>
                      </td>

                      <td>
                        <span className={`badge ${item.status === "Resolved" ? "bg-success" :
                            item.status === "In Progress" ? "bg-warning text-dark" :
                              "bg-danger"
                          }`}>
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <span className={`badge ${isPaid ? "bg-success" : "bg-danger"}`}>
                          {isPaid ? "Paid" : "Pending"}
                        </span>
                      </td>

                      <td>
                        <Link
                          to={`/user/complaints/update/${item._id}`}
                          className='btn btn-primary mybackground'
                        >
                          <i className='bi bi-pencil fs-3'></i>
                        </Link>
                      </td>

                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={() => deleteRecord(item._id)}
                        >
                          <i className='bi bi-trash fs-3'></i>
                        </button>
                      </td>

                    </tr>
                  )
                })}
          </tbody>

        </table>
      </div>
    </div>
  )
}