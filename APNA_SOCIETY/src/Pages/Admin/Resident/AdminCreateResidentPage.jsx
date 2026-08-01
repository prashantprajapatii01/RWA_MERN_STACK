// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import FormValidators from '../../../Validators/FormValidators'

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// // 🔥 CHANGE
// import { getResident, createResident } from "../../../Redux/ActionCreators/ResidentActionCreators"

// export default function AdminCreateResidentPage() {

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     flatNo: "",
//     block: "",
//     members: 1,
//     status: "Active"
//   })

//   const [errorMessage, setErrorMessage] = useState({
//     name: "Name is required",
//     email: "Email is required",
//     phone: "Phone is required",
//     flatNo: "Flat No is required"
//   })

//   const [show, setShow] = useState(false)

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const ResidentStateData = useSelector(state => state.ResidentStateData)

//   // ✅ INPUT HANDLER
//   function getInputData(e) {
//     const name = e.target.name
//     const value = e.target.value

//     setData(prev => ({
//       ...prev,
//       [name]: value
//     }))

//     setErrorMessage(prev => ({
//       ...prev,
//       [name]: FormValidators(e)
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

//     // 🔥 DUPLICATE CHECK (Flat No unique)
//     const item = ResidentStateData.find(
//       x => x.flatNo === data.flatNo
//     )

//     if (item) {
//       setErrorMessage(prev => ({
//         ...prev,
//         flatNo: "Resident with this Flat No already exists"
//       }))
//       setShow(true)
//       return
//     }

//     dispatch(createResident({
//       ...data,
//       id: Date.now()
//     }))

//     navigate("/admin/residents")
//   }

//   useEffect(() => {
//     dispatch(getResident())
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
//               Create Resident
//               <Link to="/admin/residents">
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

//                 {/* Email */}
//                 <div className="col-md-6 mb-4">
//                   <label>Email*</label>
//                   <input
//                     type="email"
//                     name="email"
//                     onChange={getInputData}
//                     className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="col-md-6 mb-4">
//                   <label>Phone*</label>
//                   <input
//                     type="text"
//                     name="phone"
//                     onChange={getInputData}
//                     className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`}
//                   />
//                 </div>

//                 {/* Flat No */}
//                 <div className="col-md-6 mb-4">
//                   <label>Flat No*</label>
//                   <input
//                     type="text"
//                     name="flatNo"
//                     onChange={getInputData}
//                     className={`form-control ${show && errorMessage.flatNo ? 'border-danger' : ''}`}
//                   />
//                 </div>

//                 {/* Block */}
//                 <div className="col-md-6 mb-4">
//                   <label>Block</label>
//                   <input
//                     type="text"
//                     name="block"
//                     onChange={getInputData}
//                     className="form-control"
//                   />
//                 </div>

//                 {/* Members */}
//                 <div className="col-md-6 mb-4">
//                   <label>No. of Members</label>
//                   <input
//                     type="number"
//                     name="members"
//                     onChange={getInputData}
//                     className="form-control"
//                     min={1}
//                   />
//                 </div>

//                 {/* Status */}
//                 <div className="col-md-6 mb-4">
//                   <label>Status</label>
//                   <select name="status" onChange={getInputData} className='form-select'>
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </select>
//                 </div>

//                 {/* Submit */}
//                 <div className="col-12">
//                   <button className='btn btn-primary w-100 p-3'>
//                     Create Resident
//                   </button>
//                 </div>

//               </div>
//             </form>

//           </div>
//         </div>
//       </div>

//       <div style={{ height: 100 }}></div>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getResident, createResident } from "../../../Redux/ActionCreators/ResidentActionCreators"

export default function AdminCreateResidentPage() {

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    flatNo: "",
    block: "",
    members: 1,
    status: "Active"
  })

  const [errorMessage, setErrorMessage] = useState({
    name: "Name is required",
    email: "Email is required",
    phone: "Phone is required",
    flatNo: "Flat No is required"
  })

  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ResidentStateData = useSelector(state => state.ResidentStateData)

  // 🔥 LOAD DATA
  useEffect(() => {
    dispatch(getResident())
  }, [dispatch])

  // INPUT HANDLER
  function getInputData(e) {
    const { name, value } = e.target

    setData(prev => ({
      ...prev,
      [name]: value
    }))

    setErrorMessage(prev => ({
      ...prev,
      [name]: FormValidators(e)
    }))
  }

  // SUBMIT
  function postData(e) {
    e.preventDefault()

    const error = Object.values(errorMessage).find(x => x !== "")

    if (error) {
      setShow(true)
      return
    }

    const list = Array.isArray(ResidentStateData) ? ResidentStateData : []

    // 🔥 DUPLICATE CHECK (Flat No unique)
    const item = list.find(
      x => x.flatNo?.trim().toLowerCase() === data.flatNo.trim().toLowerCase()
    )

    if (item) {
      setErrorMessage(prev => ({
        ...prev,
        flatNo: "Resident with this Flat No already exists"
      }))
      setShow(true)
      return
    }

    // ✅ FINAL PAYLOAD
    dispatch(createResident({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      flatNo: data.flatNo.trim(),
      block: data.block.trim(),
      members: Number(data.members) || 1,
      status: data.status
    }))

    navigate("/admin/residents")
  }

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">

          <div className="col-md-3">
            <AdminSidebar />
          </div>

          <div className="col-md-9">

            <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
              Create Resident
              <Link to="/admin/residents">
                <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <form onSubmit={postData}>
              <div className="row">

                {/* Name */}
                <div className="col-md-6 mb-4">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
                  />
                </div>

                {/* Email */}
                <div className="col-md-6 mb-4">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`}
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6 mb-4">
                  <label>Phone*</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`}
                  />
                </div>

                {/* Flat No */}
                <div className="col-md-6 mb-4">
                  <label>Flat No*</label>
                  <input
                    type="text"
                    name="flatNo"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.flatNo ? 'border-danger' : ''}`}
                  />
                </div>

                {/* Block */}
                <div className="col-md-6 mb-4">
                  <label>Block</label>
                  <input
                    type="text"
                    name="block"
                    onChange={getInputData}
                    className="form-control"
                  />
                </div>

                {/* Members */}
                <div className="col-md-6 mb-4">
                  <label>No. of Members</label>
                  <input
                    type="number"
                    name="members"
                    min={1}
                    onChange={getInputData}
                    className="form-control"
                  />
                </div>

                {/* Status */}
                <div className="col-md-6 mb-4">
                  <label>Status</label>
                  <select name="status" onChange={getInputData} className='form-select'>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="col-12">
                  <button className='btn btn-primary w-100 p-3'>
                    Create Resident
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