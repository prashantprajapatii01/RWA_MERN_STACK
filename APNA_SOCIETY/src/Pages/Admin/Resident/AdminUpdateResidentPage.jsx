// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import FormValidators from '../../../Validators/FormValidators'

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// // 🔥 CHANGE
// import { getResident, updateResident } from "../../../Redux/ActionCreators/ResidentActionCreators"

// export default function AdminUpdateResidentPage() {

//   const { id } = useParams()

//   const [data, setData] = useState({
//     id: "",
//     name: "",
//     email: "",
//     phone: "",
//     flatNo: "",
//     block: "",
//     members: 1,
//     status: "Active"
//   })

//   const [errorMessage, setErrorMessage] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     flatNo: ""
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

//     // 🔥 DUPLICATE CHECK (Flat No unique except current)
//     const item = ResidentStateData.find(
//       x => x._id != id && x.flatNo === data.flatNo
//     )

//     if (item) {
//       setErrorMessage(prev => ({
//         ...prev,
//         flatNo: "Flat No already assigned to another resident"
//       }))
//       setShow(true)
//       return
//     }

//     dispatch(updateResident(data))
//     navigate("/admin/residents")
//   }

//   // ✅ LOAD DATA
//   useEffect(() => {
//     dispatch(getResident())
//   }, [])

//   useEffect(() => {
//     if (ResidentStateData.length) {
//       const item = ResidentStateData.find(x => x.id == id)

//       if (item) {
//         setData(prev => ({ ...prev, ...item }))
//       } else {
//         navigate("/admin/residents")
//       }
//     }
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
//               Update Resident
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
//                     value={data.name}
//                     onChange={getInputData}
//                     className="form-control"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="col-md-6 mb-4">
//                   <label>Email*</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     onChange={getInputData}
//                     className="form-control"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="col-md-6 mb-4">
//                   <label>Phone*</label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={data.phone}
//                     onChange={getInputData}
//                     className="form-control"
//                   />
//                 </div>

//                 {/* Flat No */}
//                 <div className="col-md-6 mb-4">
//                   <label>Flat No*</label>
//                   <input
//                     type="text"
//                     name="flatNo"
//                     value={data.flatNo}
//                     onChange={getInputData}
//                     className="form-control"
//                   />
//                 </div>

//                 {/* Block */}
//                 <div className="col-md-6 mb-4">
//                   <label>Block</label>
//                   <input
//                     type="text"
//                     name="block"
//                     value={data.block}
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
//                     value={data.members}
//                     onChange={getInputData}
//                     className="form-control"
//                     min={1}
//                   />
//                 </div>

//                 {/* Status */}
//                 <div className="col-md-6 mb-4">
//                   <label>Status</label>
//                   <select
//                     name="status"
//                     value={data.status}
//                     onChange={getInputData}
//                     className='form-select'
//                   >
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </select>
//                 </div>

//                 {/* Submit */}
//                 <div className="col-12">
//                   <button className='btn btn-primary w-100 p-3'>
//                     Update Resident
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
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getResident, updateResident } from "../../../Redux/ActionCreators/ResidentActionCreators"

export default function AdminUpdateResidentPage() {

  const { id } = useParams()

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
    name: "",
    email: "",
    phone: "",
    flatNo: ""
  })

  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ResidentStateData = useSelector(state => state.ResidentStateData)

  // 🔥 LOAD DATA
  useEffect(() => {
    dispatch(getResident())
  }, [dispatch])

  // 🔥 SET DATA
  useEffect(() => {
    if (!Array.isArray(ResidentStateData)) return

    const item = ResidentStateData.find(
      x => String(x._id) === String(id)
    )

    if (item) {
      setData({
        name: item.name || "",
        email: item.email || "",
        phone: item.phone || "",
        flatNo: item.flatNo || "",
        block: item.block || "",
        members: item.members || 1,
        status: item.status || "Active"
      })
    } else {
      navigate("/admin/residents")
    }

  }, [ResidentStateData, id, navigate])

  // INPUT
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

    // 🔥 DUPLICATE CHECK
    const item = list.find(
      x =>
        String(x._id) !== String(id) &&
        x.flatNo?.trim().toLowerCase() === data.flatNo.trim().toLowerCase()
    )

    if (item) {
      setErrorMessage(prev => ({
        ...prev,
        flatNo: "Flat already assigned"
      }))
      setShow(true)
      return
    }

    // ✅ FINAL UPDATE
    dispatch(updateResident({
      ...data,
      _id: id   // 🔥 MOST IMPORTANT
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
              Update Resident
              <Link to="/admin/residents">
                <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <form onSubmit={postData}>
              <div className="row">

                <div className="col-md-6 mb-4">
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Email*</label>
                  <input type="email" name="email" value={data.email} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Phone*</label>
                  <input type="text" name="phone" value={data.phone} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Flat No*</label>
                  <input type="text" name="flatNo" value={data.flatNo} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Block</label>
                  <input type="text" name="block" value={data.block} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>No. of Members</label>
                  <input type="number" name="members" value={data.members} min={1} onChange={getInputData} className="form-control" />
                </div>

                <div className="col-md-6 mb-4">
                  <label>Status</label>
                  <select name="status" value={data.status} onChange={getInputData} className='form-select'>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="col-12">
                  <button className='btn btn-primary w-100 p-3'>
                    Update Resident
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