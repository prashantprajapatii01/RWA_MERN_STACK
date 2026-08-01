import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getResident } from "../Redux/ActionCreators/ResidentActionCreators"

export default function ResidentDirectory() {

    let ResidentStateData = useSelector(state => state.ResidentStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getResident())
    }, [])

    return (
        <section className="my-5">
            <div className="container">

                <div className="my-3">
                    <h3 className='text-center fw-bold'>Resident Directory</h3>
                    <p className='text-center text-muted'>Verified Members of Society</p>
                </div>

                <div className="row">

                    {
                        ResidentStateData
                            .filter(item => item.verified) // show only verified
                            .map(item => {
                                return (
                                    <div key={item.id} className="col-md-4 mb-4">

                                        <div className="card shadow-sm h-100 border-0">

                                            <div className="card-body">

                                                <h5 className="card-title">{item.name}</h5>

                                                <p className="mb-1"><strong>Flat:</strong> {item.flatNo}</p>
                                                <p className="mb-1"><strong>Block:</strong> {item.block}</p>
                                                <p className="mb-1"><strong>Floor:</strong> {item.floorNo}</p>
                                                <p className="mb-1"><strong>Role:</strong> {item.role}</p>
                                                <p className="mb-1"><strong>Members:</strong> {item.members}</p>

                                                <hr />

                                                <p className="mb-1"><strong>Contact:</strong> {item.contact}</p>
                                                <p className="mb-1"><strong>Email:</strong> {item.email}</p>

                                            </div>

                                        </div>

                                    </div>
                                )
                            })
                    }

                </div>
            </div>
        </section>
    )
}