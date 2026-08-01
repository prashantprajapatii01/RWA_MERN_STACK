
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import FormValidators from '../../../Validators/FormValidators'
// import ImageValidators from '../../../Validators/ImageValidators'

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// import { getComplaint, createComplaint } from "../../../Redux/ActionCreators/ComplaintActionCreators"

// export default function AdminCreateComplaintPage() {

//   const [data, setData] = useState({
//     name: "",
//     title: "",
//     description: "",
//     priority: "Low",
  
//     status: "Pending",
//     flatNo: "",
//     category: "",
//     contact: "",
//     paymentStatus: "Pending",
//     paymentAmount: 0
//   })

//   const [errorMessage, setErrorMessage] = useState({
//     name: "Name is required",
//     title: "Title is required",
//     description: "Description is required",

//   })

//   const [show, setShow] = useState(false)

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const ComplaintStateData = useSelector(state => state.ComplaintStateData)

//   // 🔥 ✅ INPUT HANDLER (WITH AUTO LOGIC)
//   function getInputData(e) {
//     const name = e.target.name
//     const value =
//       name === "image"
//         ? "complaints/" + e.target.files[0].name
//         : e.target.value

//     let updated = {
//       ...data,
//       [name]: value
//     }

//     // 🔥 STATUS → PAYMENT
//     if (name === "status") {
//       if (value === "Resolved") {
//         updated.paymentStatus = "Paid"
//       } else {
//         updated.paymentStatus = "Pending"
//       }
//     }

//     // 🔥 PAYMENT → STATUS
//     if (name === "paymentStatus") {
//       if (value === "Paid") {
//         updated.status = "Resolved"
//       } else {
//         updated.status = "Pending"
//       }
//     }

//     setData(updated)

//     setErrorMessage(prev => ({
//       ...prev,
//       [name]: name === "image"
//         ? ImageValidators(e)
//         : FormValidators(e)
//     }))
//   }

//   // ✅ SUBMIT
//   function postData(e) {
//     e.preventDefault()

//     const error = Object.values(errorMessage).find(x => x !== "")

//     if (error) {
//       setShow(true)
//       return
//     }

//     // duplicate check
//     const item = ComplaintStateData.find(
//       x => x.title.toLowerCase() === data.title.toLowerCase()
//     )

//     if (item) {
//       setErrorMessage(prev => ({
//         ...prev,
//         title: "Complaint with this title already exists"
//       }))
//       setShow(true)
//       return
//     }

//     // 🔥 FINAL DATA
//     dispatch(createComplaint({
//       ...data,
     
//       paymentStatus: "Pending", // default
//       status: "Pending"
//     }))

//     navigate("/admin/complaints")
//   }

//   useEffect(() => {
//     dispatch(getComplaint())
//   }, [])

//   return (
//     <>
//       <div className="container-fluid my-3">
//         <div className="row">

//           <div className="col-md-3">
//             <AdminSidebar />
//           </div>

//           <div className="col-md-9">

//             <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
//               Create Complaint
//               <Link to="/admin/complaints">
//                 <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
//               </Link>
//             </h6>

//             <form onSubmit={postData}>
//               <div className="row">

//                 {/* Name */}
//                 <div className="col-md-6 mb-4">
//                   <label>Name*</label>
//                   <input
//                     type="text"
//                     name="name"
//                     onChange={getInputData}
//                     className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
//                   />
//                 </div>

//                 {/* Title */}
//                 <div className="col-md-6 mb-4">
//                   <label>Title*</label>
//                   <input
//                     type="text"
//                     name="title"
//                     onChange={getInputData}
//                     className={`form-control ${show && errorMessage.title ? 'border-danger' : ''}`}
//                   />
//                 </div>

//                 {/* Description */}
//                 <div className="col-12 mb-4">
//                   <label>Description*</label>
//                   <textarea
//                     name="description"
//                     onChange={getInputData}
//                     className={`form-control ${show && errorMessage.description ? 'border-danger' : ''}`}
//                   />
//                 </div>

//                 {/* Priority */}
//                 <div className="col-md-6 mb-4">
//                   <label>Priority</label>
//                   <select name="priority" onChange={getInputData} className='form-select'>
//                     <option>Low</option>
//                     <option>Medium</option>
//                     <option>High</option>
//                   </select>
//                 </div>

//                 {/* Status */}
//                 <div className="col-md-6 mb-4">
//                   <label>Status</label>
//                   <select name="status" onChange={getInputData} className='form-select'>
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Resolved">Resolved</option>
//                   </select>
//                 </div>

//                 {/* Payment Status */}
//                 <div className="col-md-6 mb-4">
//                   <label>Payment Status</label>
//                   <select name="paymentStatus" onChange={getInputData} className='form-select'>
//                     <option value="Pending">Pending</option>
//                     <option value="Paid">Paid</option>
//                   </select>
//                 </div>

//                 {/* Payment Amount */}
//                 <div className="col-md-6 mb-4">
//                   <label>Payment Amount (₹)</label>
//                   <input
//                     type="number"
//                     name="paymentAmount"
//                     onChange={getInputData}
//                     className="form-control"
//                   />
//                 </div>

//                 {/* Flat No */}
//                 <div className="col-md-6 mb-4">
//                   <label>Flat No</label>
//                   <input type="text" name="flatNo" onChange={getInputData} className="form-control" />
//                 </div>

//                 {/* Category */}
//                 <div className="col-md-6 mb-4">
//                   <label>Category</label>
//                   <input type="text" name="category" onChange={getInputData} className="form-control" />
//                 </div>

//                 {/* Contact */}
//                 <div className="col-md-6 mb-4">
//                   <label>Contact</label>
//                   <input type="text" name="contact" onChange={getInputData} className="form-control" />
//                 </div>

              
//                 {/* Submit */}
//                 <div className="col-12">
//                   <button className='btn btn-primary w-100 p-3'>
//                     Create Complaint
//                   </button>
//                 </div>

//               </div>
//             </form>

//           </div>
//         </div>
//       </div>
//         <div style={{ height: 100 }}></div>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getComplaint, createComplaint } from "../../../Redux/ActionCreators/ComplaintActionCreators"

export default function AdminCreateComplaintPage() {

  const [data, setData] = useState({
    name: "",
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
    flatNo: "",
    category: "",
    contact: "",
    paymentStatus: "Pending",
    paymentAmount: 0
  })

  const [errorMessage, setErrorMessage] = useState({
    name: "Name is required",
    title: "Title is required",
    description: "Description is required"
  })

  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ComplaintStateData = useSelector(state => state.ComplaintStateData)

  // 🔥 INPUT HANDLER
  function getInputData(e) {
    const { name, value } = e.target

    let updated = { ...data, [name]: value }

    // STATUS → PAYMENT
    if (name === "status") {
      updated.paymentStatus = value === "Resolved" ? "Paid" : "Pending"
    }

    // PAYMENT → STATUS
    if (name === "paymentStatus") {
      updated.status = value === "Paid" ? "Resolved" : "Pending"
    }

    setData(updated)

    setErrorMessage(prev => ({
      ...prev,
      [name]: FormValidators(e)
    }))
  }

  // 🔥 SUBMIT
  function postData(e) {
    e.preventDefault()

    const error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      return
    }

    // SAFE duplicate check
    const item = ComplaintStateData.find(
      x => x.title?.toLowerCase() === data.title.toLowerCase()
    )

    if (item) {
      setErrorMessage(prev => ({
        ...prev,
        title: "Complaint with this title already exists"
      }))
      setShow(true)
      return
    }

    dispatch(createComplaint(data))
    navigate("/admin/complaints")
  }

  useEffect(() => {
    dispatch(getComplaint())
  }, [dispatch])

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">

          <div className="col-md-3">
            <AdminSidebar />
          </div>

          <div className="col-md-9">

            <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
              Create Complaint
              <Link to="/admin/complaints">
                <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <form onSubmit={postData}>
              <div className="row">

                {/* Name */}
                <div className="col-md-6 mb-4">
                  <label>Name*</label>
                  <input
                    name="name"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
                  />
                  {show && errorMessage.name && <p className="text-danger">{errorMessage.name}</p>}
                </div>

                {/* Title */}
                <div className="col-md-6 mb-4">
                  <label>Title*</label>
                  <input
                    name="title"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.title ? 'border-danger' : ''}`}
                  />
                  {show && errorMessage.title && <p className="text-danger">{errorMessage.title}</p>}
                </div>

                {/* Description */}
                <div className="col-12 mb-4">
                  <label>Description*</label>
                  <textarea
                    name="description"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.description ? 'border-danger' : ''}`}
                  />
                  {show && errorMessage.description && <p className="text-danger">{errorMessage.description}</p>}
                </div>

                {/* Priority */}
                <div className="col-md-6 mb-4">
                  <label>Priority</label>
                  <select name="priority" onChange={getInputData} className="form-select">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                {/* Status */}
                <div className="col-md-6 mb-4">
                  <label>Status</label>
                  <select name="status" onChange={getInputData} className="form-select">
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>

                {/* Payment Status */}
                <div className="col-md-6 mb-4">
                  <label>Payment Status</label>
                  <select name="paymentStatus" onChange={getInputData} className="form-select">
                    <option>Pending</option>
                    <option>Paid</option>
                  </select>
                </div>

                {/* Payment Amount */}
                <div className="col-md-6 mb-4">
                  <label>Payment Amount</label>
                  <input type="number" name="paymentAmount" onChange={getInputData} className="form-control" />
                </div>

                {/* Flat No */}
                <div className="col-md-6 mb-4">
                  <label>Flat No</label>
                  <input name="flatNo" onChange={getInputData} className="form-control" />
                </div>

                {/* Category */}
                <div className="col-md-6 mb-4">
                  <label>Category</label>
                  <input name="category" onChange={getInputData} className="form-control" />
                </div>

                {/* Contact */}
                <div className="col-md-6 mb-4">
                  <label>Contact</label>
                  <input name="contact" onChange={getInputData} className="form-control" />
                </div>

                {/* Submit */}
                <div className="col-12">
                  <button className='btn btn-primary w-100 p-3'>
                    Create Complaint
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>

      <div style={{ height: 100 }}></div>
    </>
  )
}