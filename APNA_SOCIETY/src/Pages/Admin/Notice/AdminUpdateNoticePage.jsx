import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'
import ImageValidators from '../../../Validators/ImageValidators'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getNotice, updateNotice } from "../../../Redux/ActionCreators/NoticeActionCreators"

export default function AdminUpdateNoticePage() {

    let { id } = useParams()

    let [data, setData] = useState({
        title: "",
        description: "",
        category: "",
        date: "",
        expiryDate: "",
        priority: "Low",
        attachment: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        title: "",
        description: ""
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let NoticeStateData = useSelector(state => state.NoticeStateData)
    let dispatch = useDispatch()

    // INPUT HANDLER
    function getInputData(e) {
        let name = e.target.name

        let value = name === "attachment"
            ? "notice/" + e.target.files[0].name
            : e.target.value

        setData({
            ...data,
            [name]: name === "status" ? (value === "1" ? true : false) : value
        })

        setErrorMessage({
            ...errorMessage,
            [name]: name === "attachment" ? ImageValidators(e) : FormValidators(e)
        })
    }

    // SUBMIT
    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")

        if (error) {
            setShow(true)
        } else {

            // ✅ Duplicate check
            let item = NoticeStateData.find(
                x => x._id !== id &&
                x.title.toLowerCase() === data.title.toLowerCase()
            )

            if (item) {
                setErrorMessage({
                    ...errorMessage,
                    title: "Notice with this title already exists"
                })
                setShow(true)
                return
            }

            // ✅ FIXED: send _id
            dispatch(updateNotice({ ...data, _id: id }))

            navigate("/admin/notice")
        }
    }

    // LOAD DATA FIRST TIME
    useEffect(() => {
        dispatch(getNotice())
    }, [])

    // SET DATA AFTER FETCH
    useEffect(() => {
        if (NoticeStateData.length) {

            let item = NoticeStateData.find(x => x._id === id)

            if (item) {
                setData(item)
            } else {
                navigate("/admin/notice")
            }
        }
    }, [NoticeStateData, id])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">

                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>

                    <div className="col-md-9">

                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>
                            Update Notice
                            <Link to="/admin/notice">
                                <i className='bi bi-arrow-left text-light fs-1 float-end'></i>
                            </Link>
                        </h6>

                        <form onSubmit={postData}>
                            <div className="row">

                                {/* Title */}
                                <div className="col-12 mb-4">
                                    <label>Title*</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.title ? 'border-danger' : 'myborder'}`}
                                    />
                                    {show && errorMessage.title && <p className='text-danger'>{errorMessage.title}</p>}
                                </div>

                                {/* Description */}
                                <div className="col-12 mb-4">
                                    <label>Description*</label>
                                    <textarea
                                        name="description"
                                        value={data.description}
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.description ? 'border-danger' : 'myborder'}`}
                                    ></textarea>
                                    {show && errorMessage.description && <p className='text-danger'>{errorMessage.description}</p>}
                                </div>

                                {/* Category */}
                                <div className="col-md-6 mb-4">
                                    <label>Category*</label>
                                    <select
                                        name="category"
                                        value={data.category}
                                        onChange={getInputData}
                                        className="form-select myborder"
                                    >
                                        <option value="">Select Category</option>
                                        <option>Maintenance</option>
                                        <option>Event</option>
                                        <option>Alert</option>
                                        <option>General</option>
                                    </select>
                                </div>

                                {/* Priority */}
                                <div className="col-md-6 mb-4">
                                    <label>Priority*</label>
                                    <select
                                        name="priority"
                                        value={data.priority}
                                        onChange={getInputData}
                                        className="form-select myborder"
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>

                                {/* Date */}
                                <div className="col-md-6 mb-4">
                                    <label>Date*</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        onChange={getInputData}
                                        className="form-control myborder"
                                    />
                                </div>

                                {/* Expiry */}
                                <div className="col-md-6 mb-4">
                                    <label>Expiry Date*</label>
                                    <input
                                        type="date"
                                        name="expiryDate"
                                        value={data.expiryDate}
                                        onChange={getInputData}
                                        className="form-control myborder"
                                    />
                                </div>

                            

                                {/* Status */}
                                <div className="col-md-6 mb-4">
                                    <label>Status*</label>
                                    <select
                                        name="status"
                                        value={data.status ? "1" : "0"}
                                        onChange={getInputData}
                                        className="form-select myborder"
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                {/* Submit */}
                                <div className="col-12 mb-5">
                                    <button className='btn btn-primary btn-lg w-100 mybackground p-3'>
                                        Update Notice
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