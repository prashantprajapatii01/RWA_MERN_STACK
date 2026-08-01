

// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import $ from 'jquery'
// import 'datatables.net'
// import 'datatables.net-dt/css/dataTables.dataTables.min.css'

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// import { getComplaint, deleteComplaint } from "../../../Redux/ActionCreators/ComplaintActionCreators"

// export default function AdminComplaintPage() {

//   // const [data, setData] = useState([])

//   const ComplaintStateData = useSelector(state => state.ComplaintStateData)
//   const dispatch = useDispatch()

//   function deleteRecord(id) {
//   if (window.confirm("Are You Sure You Want to Delete This Complaint?")) {

//     dispatch(deleteComplaint({ _id: id }))   // ✅ FIX

//   }}
   
//  // setData(prev => prev.filter(x => x._id !== id)) // ✅ FIX
// const data = useSelector(state => state.ComplaintStateData) 

//   useEffect(() => {
//     dispatch(getComplaint())
//   }, [])

//   useEffect(() => {
//     setData(ComplaintStateData)

//     if ($.fn.DataTable.isDataTable('#myTable')) {
//       $('#myTable').DataTable().destroy()
//     }

//     setTimeout(() => {
//       $('#myTable').DataTable()
//     }, 300)

//   }, [ComplaintStateData])

//   return (
//     <>
//       <div className="container-fluid my-3">
//         <div className="row">

//           <div className="col-md-3">
//             <AdminSidebar />
//           </div>

//           <div className="col-md-9">
//             <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
//               Complaints Management

//               <Link to="/admin/complaints/create">
//                 <i className='bi bi-plus text-light fs-1 float-end'></i>
//               </Link>
//             </h6>

//             <div className="table-responsive">
//               <table id='myTable' className='table table-bordered'>

//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Title</th>
//                     <th>User</th>
//                     <th>Priority</th>
//                     <th>Flat No</th>
//                     <th>Category</th>
//                     <th>Contact</th>
//                     <th>Status</th>
//                     <th>Payment</th> {/* ✅ NEW */}
//                     <th>Edit</th>
//                     <th>Delete</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {data.map(item => {

//                     const isPaid = item.paymentStatus === "Paid"

//                     return (
//                       <tr key={item._id}>

//                         <td>{item._id}</td>
//                         <td>{item.title}</td>
//                         <td>{item.name || "User"}</td>

//                         <td>
//                           <span className={`badge 
//                             ${item.priority === "High" ? "bg-danger" :
//                             item.priority === "Medium" ? "bg-warning text-dark" :
//                             "bg-success"}`}>
//                             {item.priority}
//                           </span>
//                         </td>

//                         <td>{item.flatNo || "-"}</td>
//                         <td>{item.category || "-"}</td>
//                         <td>{item.contact || "-"}</td>

//                         {/* STATUS */}
//                         <td>
//                           <span className={`badge 
//                             ${item.status === "Resolved" ? "bg-success" :
//                             item.status === "In Progress" ? "bg-warning text-dark" :
//                             "bg-danger"}`}>
//                             {item.status}
//                           </span>
//                         </td>

//                         {/* 🔥 PAYMENT */}
//                         <td>
//                           <span className={`badge 
//                             ${isPaid ? "bg-success" : "bg-danger"}`}>
//                             {isPaid ? "Paid" : "Unpaid"}
//                           </span>
//                         </td>

                        

//                         <td>
//                           <Link to={`/admin/complaints/update/${item._id}`} className='btn btn-primary'>
//                             <i className='bi bi-pencil fs-3'></i>
//                           </Link>
//                         </td>

//                         <td>
//                           {["Admin", "Super Admin"].includes(localStorage.getItem("role")) && (
//                             <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}>
//                               <i className='bi bi-trash fs-3'></i>
//                             </button>
//                           )}
//                         </td>

//                       </tr>
//                     )
//                   })}
//                 </tbody>

//               </table>
//             </div>
//           </div>

//         </div>
//       </div>
//         <div style={{ height: 100 }}></div>
//     </>
//   )
// }
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net'
// import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";

import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import JSZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

window.JSZip = JSZip;
pdfMake.vfs = pdfFonts.vfs;
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { getComplaint, deleteComplaint } from "../../../Redux/ActionCreators/ComplaintActionCreators"

export default function AdminComplaintPage() {

  const ComplaintStateData = useSelector(state => state.ComplaintStateData)
  const dispatch = useDispatch()

  // DELETE
  function deleteRecord(id) {
    if (window.confirm("Are You Sure You Want to Delete This Complaint?")) {
      dispatch(deleteComplaint({ _id: id }))
    }
  }

  // LOAD DATA
  useEffect(() => {
    dispatch(getComplaint())
  }, [])

  // 🔥 DATATABLE (like notice page)
  // useEffect(() => {
  //   if (ComplaintStateData.length) {

  //     if ($.fn.DataTable.isDataTable('#myTable')) {
  //       $('#myTable').DataTable().destroy()
  //     }

  //     setTimeout(() => {
  //       $('#myTable').DataTable()
  //     }, 300)
  //   }
  // }, [ComplaintStateData])
useEffect(() => {
  if (ComplaintStateData.length) {

    if ($.fn.DataTable.isDataTable("#myTable")) {
      $("#myTable").DataTable().destroy();
    }

    setTimeout(() => {
      $("#myTable").DataTable({
        destroy: true,
        responsive: true,
        dom: "Bfrtip",

        buttons: [
          {
            extend: "copy",
            title: "Complaints Report"
          },
          {
            extend: "csv",
            title: "Complaints Report"
          },
          {
            extend: "excel",
            title: "Complaints Report"
          },
          {
            extend: "pdf",
            title: "Complaints Report",
            orientation: "landscape",
            pageSize: "A4"
          },
          {
            extend: "print",
            title: "Complaints Report"
          }
        ]
      });
    }, 300);
  }
}, [ComplaintStateData]);
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">

          <div className="col-md-3">
            <AdminSidebar />
          </div>

          <div className="col-md-9">
            <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
              Complaints Management

              <Link to="/admin/complaints/create">
                <i className='bi bi-plus text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <div className="table-responsive">
              <table id='myTable' className='table table-bordered'>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>User</th>
                    <th>Priority</th>
                    <th>Flat No</th>
                    <th>Category</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {ComplaintStateData.map(item => {

                    const isPaid = item.paymentStatus === "Paid"

                    return (
                      <tr key={item._id}>

                        <td>{item._id}</td>
                        <td>{item.title}</td>
                        <td>{item.name || "User"}</td>

                        <td>
                          <span className={`badge 
                            ${item.priority === "High" ? "bg-danger" :
                              item.priority === "Medium" ? "bg-warning text-dark" :
                              "bg-success"}`}>
                            {item.priority}
                          </span>
                        </td>

                        <td>{item.flatNo || "-"}</td>
                        <td>{item.category || "-"}</td>
                        <td>{item.contact || "-"}</td>

                        <td>
                          <span className={`badge 
                            ${item.status === "Resolved" ? "bg-success" :
                              item.status === "In Progress" ? "bg-warning text-dark" :
                              "bg-danger"}`}>
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <span className={`badge 
                            ${isPaid ? "bg-success" : "bg-danger"}`}>
                            {isPaid ? "Paid" : "Unpaid"}
                          </span>
                        </td>

                        {/* UPDATE */}
                        <td>
                          <Link
                            to={`/admin/complaints/update/${item._id}`}
                            className='btn btn-primary mybackground'
                          >
                            <i className='bi bi-pencil fs-3'></i>
                          </Link>
                        </td>

                        {/* DELETE */}
                        <td>
                          {["Admin", "Super Admin"].includes(localStorage.getItem("role")) && (
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