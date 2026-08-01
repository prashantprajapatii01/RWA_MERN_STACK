// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'


// import FormValidators from '../../../Validators/FormValidators'

// import AdminSidebar from '../../../Components/Admin/AdminSidebar'

// import { getFaq, updateFaq } from "../../../Redux/ActionCreators/FaqActionCreators"
// export default function AdminUpdateFaqPage() {
//     let { id } = useParams()
//     let [data, setData] = useState({
//         question: "",
//         answer: "",
//         status: true
//     })
//     let [errorMessage, setErrorMessage] = useState({
//         question: "",
//         answer: ""
//     })
//     let [show, setShow] = useState(false)
//     let navigate = useNavigate()

//     let FaqStateData = useSelector(state => state.FaqStateData)
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
//             let item = FaqStateData.find(x => x.id !== id && (x.question.toLocaleLowerCase() === data.question.toLocaleLowerCase()))
//             if (item) {
//                 setErrorMessage({ ...errorMessage, name: "Faq Record With This Question Already Exist" })
//                 setShow(true)
//                 return
//             }
//             dispatch(updateFaq({ ...data }))
//             navigate("/admin/faq")
//         }
//     }

//     useEffect(() => {
//         (() => {
//             dispatch(getFaq())
//             if (FaqStateData.length) {
//                 let item = FaqStateData.find(x => x.id === id)
//                 if (item)
//                     setData({ ...data, ...item })
//                 else
//                     navigate("/admin/faq")
//             }
//         })()
//     }, [FaqStateData.length])
//     return (
//         <>
//             <div className="container-fluid my-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <AdminSidebar />
//                     </div>
//                     <div className="col-md-9">
//                         <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Update Faq
//                             <Link to="/admin/faq"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link>
//                         </h6>
//                         <form onSubmit={postData}>
//                             <div className="row">
//                                 <div className="col-12 mb-5">
//                                     <label>Question*</label>
//                                     <input type="text" name="question" value={data.question} onChange={getInputData} placeholder='Question' className={`form-control ${show && errorMessage.question ? 'border-danger' : 'myborder'}`} />
//                                     {show && errorMessage.question ? <p className='text-danger'>{errorMessage.question}</p> : null}
//                                 </div>
//                                 <div className="col-12 mb-5">
//                                     <label>Answer*</label>
//                                     <textarea name="answer" placeholder='Answer...' value={data.answer} rows={3} onChange={getInputData} className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'myborder'}`} ></textarea>
//                                     {show && errorMessage.answer ? <p className='text-danger'>{errorMessage.answer}</p> : null}
//                                 </div>
//                                 <div className="col-md-6 mb-5">
//                                     <label>Status*</label>
//                                     <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select myborder'>
//                                         <option value="1">Yes</option>
//                                         <option value="0">No</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-12 mb-5">
//                                     <button className='btn btn-primary btn-lg w-100 mybackground p-3'>Update</button>
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
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getFaq, updateFaq } from "../../../Redux/ActionCreators/FaqActionCreators"

export default function AdminUpdateFaqPage() {

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const FaqStateData = useSelector(state => state.FaqStateData)

  const [data, setData] = useState({
    question: "",
    answer: "",
    status: true
  })

  const [errorMessage, setErrorMessage] = useState({
    question: "",
    answer: ""
  })

  const [show, setShow] = useState(false)

  // 🔥 LOAD DATA ONCE
  useEffect(() => {
    dispatch(getFaq())
  }, [dispatch])

  // 🔥 SET CURRENT FAQ
  useEffect(() => {

    if (!Array.isArray(FaqStateData)) return

    const item = FaqStateData.find(x =>
      String(x._id) === String(id)
    )

    if (item) {
      setData(item)
    } else {
      navigate("/admin/faq")
    }

  }, [FaqStateData, id, navigate])

  // INPUT HANDLER
  function getInputData(e) {
    let { name, value } = e.target

    let finalValue =
      name === "status"
        ? value === "1"
        : value

    setData(prev => ({
      ...prev,
      [name]: finalValue
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

    const list = Array.isArray(FaqStateData) ? FaqStateData : []

    // 🔥 DUPLICATE CHECK (EXCLUDE CURRENT)
    const item = list.find(x =>
      String(x._id) !== String(id) &&
      x.question?.trim().toLowerCase() === data.question.trim().toLowerCase()
    )

    if (item) {
      setErrorMessage(prev => ({
        ...prev,
        question: "FAQ already exists"
      }))
      setShow(true)
      return
    }

    // ✅ FINAL UPDATE
    dispatch(updateFaq({
      _id: id,                     // 🔥 MUST
      question: data.question.trim(),
      answer: data.answer.trim(),
      status: data.status
    }))

    navigate("/admin/faq")
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
              Update FAQ

              <Link to="/admin/faq">
                <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
              </Link>
            </h6>

            <form onSubmit={postData}>
              <div className="row">

                {/* QUESTION */}
                <div className="col-12 mb-5">
                  <label>Question*</label>
                  <input
                    type="text"
                    name="question"
                    value={data.question}
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.question ? 'border-danger' : ''}`}
                  />
                  {show && errorMessage.question && (
                    <p className='text-danger'>{errorMessage.question}</p>
                  )}
                </div>

                {/* ANSWER */}
                <div className="col-12 mb-5">
                  <label>Answer*</label>
                  <textarea
                    name="answer"
                    value={data.answer}
                    rows={3}
                    onChange={getInputData}
                    className={`form-control ${show && errorMessage.answer ? 'border-danger' : ''}`}
                  />
                  {show && errorMessage.answer && (
                    <p className='text-danger'>{errorMessage.answer}</p>
                  )}
                </div>

                {/* STATUS */}
                <div className="col-md-6 mb-5">
                  <label>Status*</label>
                  <select
                    name="status"
                    value={data.status ? "1" : "0"}
                    onChange={getInputData}
                    className='form-select'
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                {/* SUBMIT */}
                <div className="col-12 mb-5">
                  <button className='btn btn-primary w-100 p-3'>
                    Update FAQ
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