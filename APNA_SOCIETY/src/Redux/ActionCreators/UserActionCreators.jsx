import {
    CREATE_USER,
    DELETE_USER,
    GET_USER,
    UPDATE_USER
} from "../Constant.jsx"

// ✅ Create User
export function createUser(data) {

    return {
        type: CREATE_USER,
        payload: data
    }
}

// ✅ Get All Users
export function getUser() {

    return {
        type: GET_USER
    }
}

// ✅ Update User
export function updateUser(data) {

    return {
        type: UPDATE_USER,
        payload: data
    }
}

// ✅ Delete User
export function deleteUser(id) {

    return {
        type: DELETE_USER,
        payload: {
            _id: id
        }
    }
}