import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constant"
// export default function TestimonialReducer(state = [], action) {
//     switch (action.type) {
//         case CREATE_TESTIMONIAL_RED:
//             return [...state, action.payload]

//         case GET_TESTIMONIAL_RED:
//             return action.payload

//         case UPDATE_TESTIMONIAL_RED:
//             let index = state.findIndex(x => x.id === action.payload.id)
//             state[index] = { ...action.payload }
//             return state

//         case DELETE_TESTIMONIAL_RED:
//             return state.filter(x => x.id !== action.payload.id)

//         default:
//             return state
//     }
// }
export default function TestimonialReducer(state = [], action) {

  switch (action.type) {

    case CREATE_TESTIMONIAL_RED:
      return [action.payload, ...state]

    case GET_TESTIMONIAL_RED:
      return Array.isArray(action.payload) ? action.payload : []

    case UPDATE_TESTIMONIAL_RED:
      return state.map(item =>
        item._id === action.payload._id
          ? action.payload
          : item
      )

    case DELETE_TESTIMONIAL_RED:
      return state.filter(item =>
        item._id !== action.payload._id
      )

    default:
      return state
  }
}