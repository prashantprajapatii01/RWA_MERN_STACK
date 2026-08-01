
import { CREATE_COMPLAINT, DELETE_COMPLAINT, GET_COMPLAINT, UPDATE_COMPLAINT } from "../Constant.jsx"

export function createComplaint(data) {
    return {
        type: CREATE_COMPLAINT,
        payload: data
    }
}

export function getComplaint() {
    return {
        type: GET_COMPLAINT
    }
}

export function updateComplaint(data) {
    return {
        type: UPDATE_COMPLAINT,
        payload: data
    }
}

export function deleteComplaint(data) {
    return {
        type: DELETE_COMPLAINT,
        payload: data
    }
}