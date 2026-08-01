
import {
  CREATE_COMPLAINT_RED,
  DELETE_COMPLAINT_RED,
  GET_COMPLAINT_RED,
  UPDATE_COMPLAINT_RED
} from "../Constant"

export default function ComplaintReducer(state = [], action) {
    switch (action.type) {

        case CREATE_COMPLAINT_RED:
            return [...state, action.payload]

        case GET_COMPLAINT_RED:
            return action.payload

        case UPDATE_COMPLAINT_RED:
            return state.map(item =>
                item._id === action.payload._id ? action.payload : item
            )

        case DELETE_COMPLAINT_RED:
            return state.filter(item =>
                item._id !== action.payload._id
            )

        default:
            return state
    }
}