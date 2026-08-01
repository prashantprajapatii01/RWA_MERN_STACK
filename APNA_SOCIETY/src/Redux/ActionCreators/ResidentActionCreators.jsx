import { CREATE_RESIDENT, DELETE_RESIDENT, GET_RESIDENT, UPDATE_RESIDENT } from "../Constant.jsx"

export function createResident(data) {
    return {
        type: CREATE_RESIDENT,
        payload: data
    }
}

export function getResident() {
    return {
        type: GET_RESIDENT
    }
}

export function updateResident(data) {
    return {
        type: UPDATE_RESIDENT,
        payload: data
    }
}

export function deleteResident(data) {
    return {
        type: DELETE_RESIDENT,
        payload: data
    }
}