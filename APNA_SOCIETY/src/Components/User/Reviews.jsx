import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"
import { Link } from 'react-router-dom'
export default function Reviews() {
    let [reviews, setReviews] = useState([])

    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    function getStar(star) {
        if (star === 5)
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i></>
        else if (star === 4)
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i></>
        else if (star === 3)
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></>
        else if (star === 2)
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></>
        else
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></>
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                setReviews(TestimonialStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [TestimonialStateData.length])
    return (
        <div className="top-selling-section">
            <div className="row g-5">
                {
                    reviews.map(item => {
                        return <div className="col-md-6" key={item.id}>
                            <div className="card p-3">
                                <h5 className='fs-5'>{new Date(item.date).toDateString()}</h5>
                                <Link to={`/product/${item.product}`} className='fs-3'>{item.pname}({getStar(item.star)})</Link>
                                <p>{item.message}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
