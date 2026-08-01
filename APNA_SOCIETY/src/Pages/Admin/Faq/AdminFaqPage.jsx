// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// import { useDispatch, useSelector } from 'react-redux';

// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/dataTables.dataTables.min.css';

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// import { getFaq, deleteFaq } from "../../../Redux/ActionCreators/FaqActionCreators"
// export default function AdminFaqPage() {
//     let [data, setData] = useState([])

//     let FaqStateData = useSelector(state => state.FaqStateData)
//     let dispatch = useDispatch()

//     function deleteRecord(id) {
//         if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
//             dispatch(deleteFaq({ _id: id }))
//             setData(data.filter(x => x._id !== id))
//         }
//     }

//     useEffect(() => {
//         let time = (() => {
//             dispatch(getFaq())
//             if (FaqStateData.length)
//                 setData(FaqStateData)

//             let time = setTimeout(() => {
//                 $('#myTable').DataTable()
//             }, 500)
//             return time
//         })()
//         return () => clearTimeout(time)
//     }, [FaqStateData.length])
//     return (
//         <>
//             <div className="container-fluid my-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <AdminSidebar />
//                     </div>
//                     <div className="col-md-9">
//                         <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Faq
//                             <Link to="/admin/faq/create"><i className='bi bi-plus text-light fs-1 float-end'></i></Link>
//                         </h6>
//                         <div className="table-responsive">
//                             <table id='myTable' className='table table-bordered'>
//                                 <thead>
//                                     <tr>
//                                         <th>ID</th>
//                                         <th>Question</th>
//                                         <th>Answer</th>
//                                         <th>Status</th>
//                                         <th></th>
//                                         <th></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {data.map(item => {
//                                         return <tr key={item._id}>
//                                             <td>{item._id}</td>
//                                             <td>{item.question}</td>
//                                             <td>{item.answer}</td>
//                                             <td>{item.status ? "Active" : "Inactive"}</td>
//                                             <td><Link to={`/admin/faq/update/${item._id}`} className='btn btn-primary mybackground'><i className='bi bi-pencil fs-3'></i></Link></td>
//                                             <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash fs-3'></i></button> : null}</td>
//                                         </tr>
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div style={{ height: 100 }}></div>
//         </>
//     )
// }
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { getFaq, deleteFaq } from "../../../Redux/ActionCreators/FaqActionCreators"

export default function AdminFaqPage() {

  const dispatch = useDispatch()
  const FaqStateData = useSelector(state => state.FaqStateData)

  const [data, setData] = useState([])

  // 🔥 LOAD DATA ONCE
  useEffect(() => {
    dispatch(getFaq())
  }, [dispatch])

  // 🔥 SYNC REDUX → LOCAL STATE + DATATABLE
  useEffect(() => {

    if (!Array.isArray(FaqStateData)) return

    setData(FaqStateData)

    // destroy old table
    if ($.fn.DataTable.isDataTable('#myTable')) {
      $('#myTable').DataTable().destroy()
    }

    // re-init table
    const timer = setTimeout(() => {
      $('#myTable').DataTable()
    }, 200)

    return () => clearTimeout(timer)

  }, [FaqStateData])

  // ❌ DELETE
  function deleteRecord(id) {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      dispatch(deleteFaq({ _id: id }))
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
              FAQ

              <Link to="/admin/faq/create">
                <i className='bi bi-plus text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <div className="table-responsive">
              <table id='myTable' className='table table-bordered'>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map(item => {

                    const isSuperAdmin = localStorage.getItem("role") === "Super Admin"

                    return (
                      <tr key={item._id}>

                        <td>{item._id}</td>
                        <td>{item.question}</td>
                        <td>{item.answer}</td>

                        <td>
                          <span className={`badge ${item.status ? "bg-success" : "bg-secondary"}`}>
                            {item.status ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* EDIT */}
                        <td>
                          <Link
                            to={`/admin/faq/update/${item._id}`}
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