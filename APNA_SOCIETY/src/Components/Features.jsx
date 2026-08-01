// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"
// export default function Features() {
//     let FeatureStateData = useSelector(state => state.FeatureStateData)
//     let dispatch = useDispatch()

//     useEffect(() => {
//         (() => dispatch(getFeature()))()
//     }, [FeatureStateData.length])
//     return (
//         <>
//             <section className="about-service product ">
//                 <div className="container">
//                     <div className="about-service-section">
//                         <div className="row">
//                             {
//                                 FeatureStateData?.filter(x => x.status)?.map(item => {
//                                     return <div key={item.id} className='col-lg-3 col-md-4 col-sm-6'>
//                                         <div className="about-wrapper m-auto">
//                                             <div className="mybackground px-5 py-4" style={{ borderRadius: "50%" }}>
//                                                 <span className='text-light' style={{ fontSize: 60 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
//                                             </div>
//                                             <div className="wrapper-info">
//                                                 <h5 className="wrapper-details about-details">{item.name}</h5>
//                                                 <p className=''>{item.shortDescription}</p>
//                                             </div>
//                                         </div>
//                                         <div className="seperator">
//                                         </div>
//                                     </div>
//                                 })
//                             }
//                         </div>
//                     </div>
//                 </div>

//             </section>
//         </>
//     )
// }
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"

export default function Features() {

  const dispatch = useDispatch()

  const FeatureStateData = useSelector(state =>
    Array.isArray(state.FeatureStateData) ? state.FeatureStateData : []
  )

  // 🔥 LOAD ONCE
  useEffect(() => {
    dispatch(getFeature())
  }, [dispatch])

  return (
    <section className="py-5">
      <div className="container">

        <div className="row g-4 justify-content-center">

          {FeatureStateData
            .filter(x => x.status)
            .map(item => (

              <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">

                <div className="text-center p-4 h-100 shadow-sm rounded bg-white">

                  {/* ICON */}
                  <div
                    className="mx-auto d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: "#cf0cc2"
                    }}
                  >
                    <span
                      className="text-light"
                      style={{ fontSize: 40 }}
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                  </div>

                  {/* TITLE */}
                  <h5 className="fw-bold">{item.name}</h5>

                  {/* DESCRIPTION */}
                  <p className="text-muted small">
                    {item.shortDescription}
                  </p>

                </div>

              </div>
            ))
          }

        </div>

      </div>
    </section>
  )
}