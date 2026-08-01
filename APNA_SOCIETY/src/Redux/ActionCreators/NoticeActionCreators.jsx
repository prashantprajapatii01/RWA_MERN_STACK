import { CREATE_NOTICE, DELETE_NOTICE, GET_NOTICE, UPDATE_NOTICE } from "../Constant.jsx"

export function createNotice(data) {
    return {
        type: CREATE_NOTICE,
        payload: data
    }
}

export function getNotice() {
    return {
        type: GET_NOTICE
    }
}

export function updateNotice(data) {
    return {
        type: UPDATE_NOTICE,
        payload: data
    }
}

export function deleteNotice(data) {
    return {
        type: DELETE_NOTICE,
        payload: data
    }
}