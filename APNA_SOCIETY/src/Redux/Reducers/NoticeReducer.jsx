import {
  CREATE_NOTICE_RED,
  DELETE_NOTICE_RED,
  GET_NOTICE_RED,
  UPDATE_NOTICE_RED
} from "../Constant"

export default function NoticeReducer(state = [], action) {
    switch (action.type) {

        case CREATE_NOTICE_RED:
            return [...state, action.payload]

        case GET_NOTICE_RED:
            return action.payload

        case UPDATE_NOTICE_RED:
            return state.map(item =>
                item._id === action.payload._id ? action.payload : item
            )

        case DELETE_NOTICE_RED:
            return state.filter(item =>
                item._id !== action.payload._id
            )

        default:
            return state
    }
}