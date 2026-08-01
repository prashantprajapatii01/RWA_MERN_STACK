// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"
// export default function AdminContactUsShowPage() {
//     let { id } = useParams()
//     let [data, setData] = useState({})
//     let [flag, setFlag] = useState(false)

//     let ContactUsStateData = useSelector(state => state.ContactUsStateData)
//     let dispatch = useDispatch()

//     let navigate = useNavigate()

//     function deleteRecord() {
//         if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
//             dispatch(deleteContactUs({ id: id }))
//             navigate("/admin/contactus")
//         }
//     }

//     function updateRecord() {
//         if (window.confirm("Are You Sure You Want to Change Status of That Record : ")) {
//             data.status = !data.status
//             dispatch(updateContactUs({ ...data }))
//             setFlag(!flag)
//         }
//     }

//     useEffect(() => {
//         (() => {
//             dispatch(getContactUs())
//             if (ContactUsStateData.length) {
//                 let item = ContactUsStateData.find(x => x.id === id)
//                 setData(item)
//             }
//             else
//                 navigate("/admin/contactus")
//         })()
//     }, [ContactUsStateData.length])
//     return (
//         <>
//             <div className="container-fluid my-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <AdminSidebar />
//                     </div>
//                     <div className="col-md-9">
//                         <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>ContactUs Query</h6>
//                         <div className="table-responsive">
//                             <table className='table table-bordered'>
//                                 <tbody>
//                                     <tr>
//                                         <th>Id</th>
//                                         <td>{data.id}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Name</th>
//                                         <td>{data.name}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Email</th>
//                                         <td>{data.email}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Phone</th>
//                                         <td>{data.phone}</td>
//                                     </tr>

//                                     <tr>
//                                         <th>Subject</th>
//                                         <td>{data.subject}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Message</th>
//                                         <td>{data.message}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Date</th>
//                                         <td>{new Date(data.date).toLocaleString()}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Status</th>
//                                         <td>{data.status ? "Active" : "Inactive"}</td>
//                                     </tr>
//                                     <tr>
//                                         <td colSpan={2}>
//                                             {
//                                                 data.status ?
//                                                     <button onClick={updateRecord} className='btn-lg btn btn-primary mybackground w-100'>Update</button> :
//                                                     <button onClick={deleteRecord} className='btn-lg btn btn-danger w-100'>Delete</button>
//                                             }
//                                         </td>
//                                     </tr>
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
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import {
  getContactUs,
  deleteContactUs,
  updateContactUs
} from "../../../Redux/ActionCreators/ContactUsActionCreators"

export default function AdminContactUsShowPage() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const ContactUsStateData = useSelector(state =>
    Array.isArray(state.ContactUsStateData)
      ? state.ContactUsStateData
      : []
  )

  const [data, setData] = useState(null)

  // 🔥 DELETE FIX
  function deleteRecord() {
    if (window.confirm("Delete this record?")) {
      dispatch(deleteContactUs({ _id: id }))
      navigate("/admin/contactus")
    }
  }

  // 🔥 UPDATE FIX
  function updateRecord() {
    if (window.confirm("Change status?")) {
      dispatch(updateContactUs({
        ...data,
        _id: data._id,
        status: !data.status
      }))
    }
  }

  // 📥 LOAD DATA
  useEffect(() => {
    dispatch(getContactUs())
  }, [dispatch])

  // 🔍 FIND ITEM (FIXED)
  useEffect(() => {
    if (ContactUsStateData.length) {
      const item = ContactUsStateData.find(x => String(x._id) === String(id))

      if (item) {
        setData(item)
      } else {
        navigate("/admin/contactus")
      }
    }
  }, [ContactUsStateData, id, navigate])

  if (!data) return <p className="text-center mt-5">Loading...</p>

  return (
    <div className="container-fluid my-3">
      <div className="row">

        <div className="col-md-3">
          <AdminSidebar />
        </div>

        <div className="col-md-9">

          <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
            Contact Query
          </h6>

          <div className="table-responsive">
            <table className='table table-bordered'>

              <tbody>

                <tr>
                  <th>ID</th>
                  <td>{data._id}</td>
                </tr>

                <tr>
                  <th>Name</th>
                  <td>{data.name}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{data.email}</td>
                </tr>

                <tr>
                  <th>Phone</th>
                  <td>{data.phone}</td>
                </tr>

                <tr>
                  <th>Subject</th>
                  <td>{data.subject}</td>
                </tr>

                <tr>
                  <th>Message</th>
                  <td>{data.message}</td>
                </tr>

                <tr>
                  <th>Date</th>
                  <td>{new Date(data.createdAt).toLocaleString()}</td>
                </tr>

                <tr>
                  <th>Status</th>
                  <td>{data.status ? "Active" : "Inactive"}</td>
                </tr>

                <tr>
                  <td colSpan={2}>

                    {data.status ? (
                      <button
                        onClick={updateRecord}
                        className='btn btn-primary w-100'
                      >
                        Mark Inactive
                      </button>
                    ) : (
                      <button
                        onClick={deleteRecord}
                        className='btn btn-danger w-100'
                      >
                        Delete
                      </button>
                    )}

                  </td>
                </tr>

              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  )
}