// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import FormValidators from '../../../Validators/FormValidators'

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// import { getFeature, createFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"
// export default function AdminCreateFeaturePage() {
//     let [data, setData] = useState({
//         name: "",
//         icon: "",
//         shortDescription: "",
//         status: true
//     })
//     let [errorMessage, setErrorMessage] = useState({
//         name: "Name Field is Mendatory",
//         icon: "Icon Field is Mendatory",
//         shortDescription: "shortDescription Field is Mendatory"
//     })
//     let [show, setShow] = useState(false)
//     let navigate = useNavigate()

//     let FeatureStateData = useSelector(state => state.FeatureStateData)
//     let dispatch = useDispatch()

//     function getInputData(e) {
//         let { name, value } = e.target

//         setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
//         setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
//     }
//     function postData(e) {
//         e.preventDefault()
//         let error = Object.values(errorMessage).find(x => x !== "")
//         if (error)
//             setShow(true)
//         else {
//             let item = FeatureStateData.find(x => x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
//             if (item) {
//                 setErrorMessage({ ...errorMessage, name: "Feature With This Name Already Exist" })
//                 setShow(true)
//                 return
//             }
//             dispatch(createFeature({ ...data }))
//             navigate("/admin/feature")
//         }
//     }

//     useEffect(() => {
//         (() => {
//             dispatch(getFeature())
//         })()
//     }, [FeatureStateData.length])
//     return (
//         <>
//             <div className="container-fluid my-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <AdminSidebar />
//                     </div>
//                     <div className="col-md-9">
//                         <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Create Feature
//                             <Link to="/admin/feature"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link>
//                         </h6>
//                         <form onSubmit={postData}>
//                             <div className="row">
//                                 <div className="col-12 mb-5">
//                                     <label>Name*</label>
//                                     <input type="text" name="name" onChange={getInputData} placeholder='Feature Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} />
//                                     {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
//                                 </div>
//                                 <div className="col-12 mb-5">
//                                     <label>Short Description*</label>
//                                     <textarea name="shortDescription" placeholder='Short Description...' rows={3} onChange={getInputData} className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'myborder'}`} ></textarea>
//                                     {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
//                                 </div>
//                                 <div className="col-md-6 mb-5">
//                                     <label>Icon*</label>
//                                     <input type="text" name="icon" onChange={getInputData} placeholder="Icon Tag eg. <i className='bi bi-list'></i>" className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'myborder'}`} />
//                                     {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
//                                 </div>
//                                 <div className="col-md-6 mb-5">
//                                     <label>Status*</label>
//                                     <select name="status" onChange={getInputData} className='form-select myborder'>
//                                         <option value="1">Yes</option>
//                                         <option value="0">No</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-12 mb-5">
//                                     <button className='btn btn-primary btn-lg w-100 mybackground p-3'>Create</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <div style={{ height: 100 }}></div>
//         </>
//     )
// }
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getFeature, createFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"

export default function AdminCreateFeaturePage() {

  const [data, setData] = useState({
    name: "",
    icon: "",
    shortDescription: "",
    status: true
  })

  const [errorMessage, setErrorMessage] = useState({
    name: "Name is required",
    icon: "Icon is required",
    shortDescription: "Description is required"
  })

  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const FeatureStateData = useSelector(state => state.FeatureStateData)

  // 🔥 LOAD DATA
  useEffect(() => {
    dispatch(getFeature())
  }, [dispatch])

  // INPUT HANDLER
  function getInputData(e) {

    const { name, value } = e.target

    setData(prev => ({
      ...prev,
      [name]: name === "status" ? (value === "1") : value
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

    const list = Array.isArray(FeatureStateData) ? FeatureStateData : []

    // 🔥 DUPLICATE CHECK
    const item = list.find(
      x => x.name?.trim().toLowerCase() === data.name.trim().toLowerCase()
    )

    if (item) {
      setErrorMessage(prev => ({
        ...prev,
        name: "Feature already exists"
      }))
      setShow(true)
      return
    }

    // ✅ CLEAN DATA
    const payload = {
      name: data.name.trim(),
      icon: data.icon.trim(),
      shortDescription: data.shortDescription.trim(),
      status: data.status
    }

    dispatch(createFeature(payload))

    navigate("/admin/feature")
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
              Create Feature
              <Link to="/admin/feature">
                <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-4">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
                  />
                  {show && errorMessage.name && <p className='text-danger'>{errorMessage.name}</p>}
                </div>

                <div className="col-12 mb-4">
                  <label>Short Description*</label>
                  <textarea
                    name="shortDescription"
                    rows={3}
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : ''}`}
                  />
                  {show && errorMessage.shortDescription && <p className='text-danger'>{errorMessage.shortDescription}</p>}
                </div>

                <div className="col-md-6 mb-4">
                  <label>Icon*</label>
                  <input
                    type="text"
                    name="icon"
                    onChange={getInputData}
                    placeholder="<i className='bi bi-house'></i>"
                    className={`form-control ${show && errorMessage.icon ? 'border-danger' : ''}`}
                  />
                  {show && errorMessage.icon && <p className='text-danger'>{errorMessage.icon}</p>}
                </div>

                <div className="col-md-6 mb-4">
                  <label>Status*</label>
                  <select name="status" onChange={getInputData} className='form-select'>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="col-12">
                  <button className='btn btn-primary w-100 p-3'>
                    Create Feature
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