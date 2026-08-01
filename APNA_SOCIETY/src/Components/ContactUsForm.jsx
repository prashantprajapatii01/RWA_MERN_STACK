// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'

// import FormValidators from '../Validators/FormValidators'

// import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"

// const dataOptions = {
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: ""
// }
// const errorMessageOptions = {
//     name: "Name Field is Mendatory",
//     email: "Email Address Field is Mendatory",
//     phone: "Phone Number Field is Mendatory",
//     subject: "Subject Field is Mendatory",
//     message: "Message Field is Mendatory"
// }
// export default function ContactUsForm() {
//     let [data, setData] = useState(dataOptions)
//     let [errorMessage, setErrorMessage] = useState(errorMessageOptions)
//     let [show, setShow] = useState(false)
//     let [message, setMessage] = useState("")

//     let dispatch = useDispatch()

//     function getInputData(e) {
//         let { name, value } = e.target
//         setData({ ...data, [name]: value })
//         setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
//     }

//     function postData(e) {
//         e.preventDefault()
//         let error = Object.values(errorMessage).find(x => x !== "")
//         if (error)
//             setShow(true)
//         else {
//             dispatch(createContactUs({ ...data, date: new Date(), status: true }))
//             setData(dataOptions)
//             setErrorMessage(errorMessage)
//             setShow(false)
//             setMessage("Thank You! Your Query Has Been Submitted, Our Team Will Contact You Soon!!!")
//         }
//     }
//     return (
//         <div className="question-section login-section " data-aos="fade-left">
//             <div className="">
//                 <h5 className="comment-title text-center">Have Any Question</h5>
//                 <p className="paragraph mb-3 text-center">Fill the form below or write us .We will help you as soon as possible.</p>
//                 {message ? <p className='text-center text-success fs-1'>{message}</p> : null}
//                 <form onSubmit={postData}>
//                     <div className="row">
//                         <div className="col-12 mb-3">
//                             <label>Name*</label>
//                             <input type="text" name="name" onChange={getInputData} value={data.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
//                             {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                             <label>Email*</label>
//                             <input type="email" name="email" onChange={getInputData} value={data.email} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
//                             {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                             <label>Phone*</label>
//                             <input type="text" name="phone" onChange={getInputData} value={data.phone} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
//                             {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
//                         </div>
//                         <div className="col-12 mb-3">
//                             <label>Subject*</label>
//                             <input type="text" name="subject" onChange={getInputData} value={data.subject} className={`form-control ${show && errorMessage.subject ? 'border-danger' : 'myborder'}`} placeholder='Subject' />
//                             {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}
//                         </div>
//                         <div className="col-12 mb-3">
//                             <label>Message*</label>
//                             <textarea name="message" onChange={getInputData} value={data.message} rows={7} className={`form-control ${show && errorMessage.message ? 'border-danger' : 'myborder'}`} placeholder='Message...' ></textarea>
//                             {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
//                         </div>
//                         <div className="col-12 mb-3">
//                             <button type="submit" className='shop-btn w-100'>Submit</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import FormValidators from '../Validators/FormValidators'
import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"

const dataOptions = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
}

const errorMessageOptions = {
  name: "Name Field is Mandatory",
  email: "Email Field is Mandatory",
  phone: "Phone Field is Mandatory",
  subject: "Subject Field is Mandatory",
  message: "Message Field is Mandatory"
}

export default function ContactUsForm() {

  const [data, setData] = useState(dataOptions)
  const [errorMessage, setErrorMessage] = useState(errorMessageOptions)
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

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

  async function postData(e) {
    e.preventDefault()

    const error = Object.values(errorMessage).find(x => x !== "")

    if (error) {
      setShow(true)
      return
    }

    setLoading(true)

    // ✅ CLEAN DATA (trim spaces)
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      status: true
    }

    try {
      await dispatch(createContactUs(payload))

      setData(dataOptions)
      setErrorMessage(errorMessageOptions)
      setShow(false)

      setMessage("✅ Your query submitted successfully!")

    } catch (err) {
      console.log(err)
      setMessage("❌ Something went wrong!")
    }

    setLoading(false)
  }

  return (
    <div className="question-section login-section" data-aos="fade-left">
      <div>

        <h5 className="text-center">Have Any Question</h5>
        <p className="text-center mb-3">
          Fill the form below. We will contact you soon.
        </p>

        {message && (
          <p className='text-center text-success fw-bold'>{message}</p>
        )}

        <form onSubmit={postData}>
          <div className="row">

            {/* NAME */}
            <div className="col-12 mb-3">
              <label>Name*</label>
              <input
                name="name"
                value={data.name}
                onChange={getInputData}
                className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
              />
              {show && errorMessage.name && <p className='text-danger'>{errorMessage.name}</p>}
            </div>

            {/* EMAIL */}
            <div className="col-md-6 mb-3">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={getInputData}
                className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`}
              />
              {show && errorMessage.email && <p className='text-danger'>{errorMessage.email}</p>}
            </div>

            {/* PHONE */}
            <div className="col-md-6 mb-3">
              <label>Phone*</label>
              <input
                name="phone"
                value={data.phone}
                onChange={getInputData}
                className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`}
              />
              {show && errorMessage.phone && <p className='text-danger'>{errorMessage.phone}</p>}
            </div>

            {/* SUBJECT */}
            <div className="col-12 mb-3">
              <label>Subject*</label>
              <input
                name="subject"
                value={data.subject}
                onChange={getInputData}
                className={`form-control ${show && errorMessage.subject ? 'border-danger' : ''}`}
              />
              {show && errorMessage.subject && <p className='text-danger'>{errorMessage.subject}</p>}
            </div>

            {/* MESSAGE */}
            <div className="col-12 mb-3">
              <label>Message*</label>
              <textarea
                name="message"
                value={data.message}
                onChange={getInputData}
                rows={5}
                className={`form-control ${show && errorMessage.message ? 'border-danger' : ''}`}
              />
              {show && errorMessage.message && <p className='text-danger'>{errorMessage.message}</p>}
            </div>

            {/* BUTTON */}
            <div className="col-12">
              <button
                type="submit"
                className='btn btn-primary w-100'
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
