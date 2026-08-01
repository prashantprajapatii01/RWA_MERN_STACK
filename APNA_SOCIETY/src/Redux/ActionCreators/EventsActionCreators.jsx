import { CREATE_EVENTS, DELETE_EVENTS, GET_EVENTS, UPDATE_EVENTS } from "../Constant.jsx"

export function createEvents(data) {
    return {
        type: CREATE_EVENTS,
        payload: data
    }
}

export function getEvents() {
    return {
        type: GET_EVENTS
    }
}

export function updateEvents(data) {
    return {
        type: UPDATE_EVENTS,
        payload: data
    }
}

export function deleteEvents(data) {
    return {
        type: DELETE_EVENTS,
        payload: data
    }
}