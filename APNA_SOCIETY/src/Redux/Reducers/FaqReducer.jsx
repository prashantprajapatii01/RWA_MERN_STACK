import {
  CREATE_FAQ_RED,
  DELETE_FAQ_RED,
  GET_FAQ_RED,
  UPDATE_FAQ_RED
} from "../Constant"

export default function FaqReducer(state = [], action) {

  switch (action.type) {

    case CREATE_FAQ_RED:
      return [action.payload, ...state]   // 🔥 newest first

    case GET_FAQ_RED:
      return Array.isArray(action.payload) ? action.payload : []

    case UPDATE_FAQ_RED:
      return state.map(item =>
        item._id === action.payload._id
          ? action.payload
          : item
      )

    case DELETE_FAQ_RED:
      return state.filter(item =>
        item._id !== action.payload._id
      )

    default:
      return state
  }
}