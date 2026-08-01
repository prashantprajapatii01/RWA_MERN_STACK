// // import { CREATE_FEATURE_RED, DELETE_FEATURE_RED, GET_FEATURE_RED, UPDATE_FEATURE_RED } from "../Constant"
// // export default function FeatureReducer(state = [], action) {
// //     switch (action.type) {
// //         case CREATE_FEATURE_RED:
// //             return [...state, action.payload]

// //         case GET_FEATURE_RED:
// //             return action.payload

// //         case UPDATE_FEATURE_RED:
// //             let index = state.findIndex(x => x.id === action.payload.id)
// //             state[index] = { ...action.payload }
// //             return state

// //         case DELETE_FEATURE_RED:
// //             return state.filter(x => x.id !== action.payload.id)

// //         default:
// //             return state
// //     }
// // }
// import {
//   CREATE_FEATURE_RED,
//   DELETE_FEATURE_RED,
//   GET_FEATURE_RED,
//   UPDATE_FEATURE_RED
// } from "../Constant"

// export default function FeatureReducer(state = [], action) {

//   switch (action.type) {

//     case CREATE_FEATURE_RED:
//       return [action.payload, ...state]

//     case GET_FEATURE_RED:
//       return Array.isArray(action.payload) ? action.payload : []

//     case UPDATE_FEATURE_RED:
//       return state.map(item =>
//         item._id === action.payload._id
//           ? action.payload
//           : item
//       )

//     case DELETE_FEATURE_RED:
//       return state.filter(item =>
//         item._id !== action.payload._id
//       )

//     default:
//       return state
//   }
// }

import {
  CREATE_FEATURE_RED,
  DELETE_FEATURE_RED,
  GET_FEATURE_RED,
  UPDATE_FEATURE_RED
} from "../Constant"

export default function FeatureReducer(state = [], action) {

  switch (action.type) {

    case CREATE_FEATURE_RED:
      return action.payload
        ? [action.payload, ...state]
        : state

    case GET_FEATURE_RED:
      return Array.isArray(action.payload)
        ? action.payload
        : []

    case UPDATE_FEATURE_RED:
      return action.payload
        ? state.map(item =>
            item._id === action.payload._id
              ? action.payload
              : item
          )
        : state

    case DELETE_FEATURE_RED:
      return action.payload?._id
        ? state.filter(item => item._id !== action.payload._id)
        : state

    default:
      return state
  }
}