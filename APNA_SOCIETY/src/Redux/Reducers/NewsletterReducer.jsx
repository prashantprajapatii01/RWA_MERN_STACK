import {
  CREATE_NEWSLETTER_RED,
  DELETE_NEWSLETTER_RED,
  GET_NEWSLETTER_RED,
  UPDATE_NEWSLETTER_RED
} from "../Constant"

export default function NewsletterReducer(state = [], action) {

  switch (action.type) {

    case CREATE_NEWSLETTER_RED:
      return action.payload
        ? [action.payload, ...state]
        : state

    case GET_NEWSLETTER_RED:
      return Array.isArray(action.payload)
        ? action.payload
        : []

    case UPDATE_NEWSLETTER_RED:
      return action.payload
        ? state.map(item =>
            item._id === action.payload._id
              ? action.payload
              : item
          )
        : state

    case DELETE_NEWSLETTER_RED:
      return action.payload?._id
        ? state.filter(item => item._id !== action.payload._id)
        : state

    default:
      return state
  }
}