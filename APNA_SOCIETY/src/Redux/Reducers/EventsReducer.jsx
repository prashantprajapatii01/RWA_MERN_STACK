import {
  CREATE_EVENTS_RED,
  DELETE_EVENTS_RED,
  GET_EVENTS_RED,
  UPDATE_EVENTS_RED
} from "../Constant"

export default function EventsReducer(state = [], action) {

  switch (action.type) {

    case CREATE_EVENTS_RED:
      return action.payload
        ? [action.payload, ...state]
        : state

    case GET_EVENTS_RED:
      return Array.isArray(action.payload) ? action.payload : []

    case UPDATE_EVENTS_RED:
      return action.payload
        ? state.map(item =>
            item._id === action.payload._id
              ? action.payload
              : item
          )
        : state

    case DELETE_EVENTS_RED:
      return action.payload?._id
        ? state.filter(item => item._id !== action.payload._id)
        : state

    default:
      return state
  }
}