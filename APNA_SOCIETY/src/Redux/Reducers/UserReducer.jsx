
import {
    CREATE_USER_RED,
    DELETE_USER_RED,
    GET_USER_RED,
    UPDATE_USER_RED
} from "../Constant"

export default function UserReducer(
    state = [],
    action
) {

    switch (action.type) {

        // ✅ Create User
        case CREATE_USER_RED:

            return [
                action.payload,
                ...state
            ]


        // ✅ Get Users
        case GET_USER_RED:

            return Array.isArray(action.payload)
                ? action.payload
                : []


        // ✅ Update User
        case UPDATE_USER_RED:

            return state.map(item =>

                item._id === action.payload._id

                    ? {
                        ...item,
                        ...action.payload
                    }

                    : item
            )


        // ✅ Delete User
        case DELETE_USER_RED:

            return state.filter(item =>

                item._id !== action.payload._id
            )


        default:

            return state
    }
}