import {
  CREATE_RESIDENT_RED,
  DELETE_RESIDENT_RED,
  GET_RESIDENT_RED,
  UPDATE_RESIDENT_RED
} from "../Constant"

export default function ResidentReducer(state = [], action) {

  switch (action.type) {

    case CREATE_RESIDENT_RED:
      return [action.payload, ...state]

    case GET_RESIDENT_RED:
      return Array.isArray(action.payload) ? action.payload : []

    case UPDATE_RESIDENT_RED:
      return state.map(item =>
        item._id === action.payload._id
          ? action.payload
          : item
      )

    case DELETE_RESIDENT_RED:
      return state.filter(item =>
        item._id !== action.payload._id
      )

    default:
      return state
  }
}